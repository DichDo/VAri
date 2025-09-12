export const login = async (email: string, password: string) => {
  const res = await fetch('https://api.yourdomain.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');

export const validateToken = async () => {
  const token = getToken();
  if (!token) return false;

  try {
    const res = await fetch('https://api.yourdomain.com/validate-token', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.valid;
  } catch {
    return false;
  }
};
