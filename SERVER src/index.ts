import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth"
import verifyRoutes from "./routes/verify"
import { PrismaClient } from "@prisma/client"

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/verify", verifyRoutes)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
