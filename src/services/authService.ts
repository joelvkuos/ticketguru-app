const API_URL = "/api";

interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

interface User {
  username: string;
  role: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data: LoginResponse = await response.json();
  
  // Tallenna token, username ja role localStorageen
  localStorage.setItem('token', data.token);
  localStorage.setItem('username', data.username);
  localStorage.setItem('role', data.role);

  return data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
};

export const getCurrentUser = (): User | null => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  if (!username || !role) {
    return null;
  }

  return { username, role };
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const isAdmin = (): boolean => {
  const role = localStorage.getItem('role');
  return role === 'ADMIN';
};

export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};
