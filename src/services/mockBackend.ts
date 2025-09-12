type LoginResponse = { user: { id: string; name: string; email: string }; token: string }

const users = [
  { id: "1", email: "test@test.com", password: "1234", name: "Test User" },
]

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  await new Promise((r) => setTimeout(r, 400))
  const found = users.find((u) => u.email === email && u.password === password)
  if (!found) throw new Error("Invalid credentials")
  return {
    user: { id: found.id, name: found.name, email: found.email },
    token: "mock-jwt-token-" + found.id,
  }
}

export async function fetchVerificationStatus(userId: string, token?: string) {
  await new Promise((r) => setTimeout(r, 300))
  if (!token || !token.includes(userId)) throw new Error("Invalid token")
  return { verified: Math.random() > 0.3, score: Math.floor(Math.random() * 101) }
}