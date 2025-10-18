export default function scoring(user, flags) {
  // simple scoring model
  let score = 0
  if (user?.email) score += 20
  if (flags.doc) score += 40
  if (flags.selfie) score += 40
  if (score > 100) score = 100
  return score
}
