interface LoginResponse {
  token: string;
  id: string;
  name: string;
  email: string;
}

interface VerificationStatus {
  verified: boolean;
  score: number;
}

// Mock database
const usersDB = [
  { id: '12345', email: 'test@example.com', password: '123456', name: 'John Doe' },
];

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  await new Promise((res) => setTimeout(res, 500)); // simulate network delay

  const user = usersDB.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');

  return {
    token: 'mock-jwt-token-' + user.id,
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const fetchVerificationStatus = async (userId: string, token?: string): Promise<VerificationStatus> => {
  await new Promise((res) => setTimeout(res, 500));

  if (!token || !token.includes(userId)) throw new Error('Invalid or missing token');

  // Simulate random verification score
  return {
    verified: Math.random() > 0.3,
    score: Math.floor(Math.random() * 101),
  };
};
