import { Router } from "express"
import multer from "multer"
import { PrismaClient } from "@prisma/client"
import scoring from "../services/scoring"
import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"

const upload = multer({ dest: "uploads/" })
const prisma = new PrismaClient()
const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"

function auth(req, res, next) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ error: "no auth" })
  const token = header.replace("Bearer ", "")
  try {
    const payload: any = jwt.verify(token, JWT_SECRET)
    ;(req as any).userId = payload.userId
    next()
  } catch (err) {
    return res.status(401).json({ error: "invalid token" })
  }
}

router.post("/upload", auth, upload.fields([{ name: "selfie" }, { name: "id" }]), async (req, res) => {
  const userId = (req as any).userId
  const files = (req as any).files
  if (!files || (!files.selfie && !files.id)) {
    return res.status(400).json({ error: "no files" })
  }

  // store minimal meta
  const record = await prisma.verification.create({
    data: {
      userId,
      type: "document",
      status: "pending",
      meta: JSON.stringify({
        selfie: files.selfie ? files.selfie[0].filename : null,
        id: files.id ? files.id[0].filename : null
      })
    }
  })

  // placeholder: run basic checks, update score
  const user = await prisma.user.findUnique({ where: { id: userId } })
  const nextScore = scoring(user, { doc: !!files.id, selfie: !!files.selfie })
  await prisma.user.update({ where: { id: userId }, data: { trustScore: nextScore } })
  await prisma.verification.update({ where: { id: record.id }, data: { status: "complete" } })

  return res.json({ status: "ok", trustScore: nextScore })
})

router.get("/me", auth, async (req, res) => {
  const userId = (req as any).userId
  const user = await prisma.user.findUnique({ where: { id: userId } })
  return res.json({ user })
})

export default router
