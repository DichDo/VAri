import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = Router()
const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: "missing fields" })
  }
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, password: hashed, name }
  })
  const token = jwt.sign({ userId: user.id }, JWT_SECRET)
  return res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: "missing fields" })
  }
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: "invalid credentials" })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(401).json({ error: "invalid credentials" })
  const token = jwt.sign({ userId: user.id }, JWT_SECRET)
  return res.json({ token, user: { id: user.id, email: user.email, name: user.name, trustScore: user.trustScore } })
})

export default router
