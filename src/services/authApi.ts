interface LoginResponse {
  token: string;
  id: string;
  name: string;
  email: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simulate success login
  if (email === 'test@example.com' && password === '123456') {
    return {
      token: 'mock-jwt-token',
      id: '12345',
      name: 'John Doe',
      email,
    };
  } else {
    throw new Error('Invalid email or password');
  }
};
