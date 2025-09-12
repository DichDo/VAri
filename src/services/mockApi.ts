interface VerificationStatus {
  verified: boolean;
  score: number;
}

export const fetchVerificationStatus = async (userexport const fetchVerificationStatus = async (userId: string): Promise<VerificationStatus> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://api.yourdomain.com/verify/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch verification status');
  return await response.json();
};
Id: string): Promise<VerificationStatus> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return mock data
  return {
    verified: Math.random() > 0.3, // random true/false
    score: Math.floor(Math.random() * 101), // 0-100
  };
};
