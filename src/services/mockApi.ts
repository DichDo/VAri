interface VerificationStatus {
  verified: boolean;
  score: number;
}

export const fetchVerificationStatus = async (userId: string): Promise<VerificationStatus> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return mock data
  return {
    verified: Math.random() > 0.3, // random true/false
    score: Math.floor(Math.random() * 101), // 0-100
  };
};
