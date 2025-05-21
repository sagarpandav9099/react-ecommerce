const API = "http://localhost:8000/api/users";

export const registerUser = async (user) => {
  const res = await fetch(`${API}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return await res.json();
};

export const fetchProfile = async (token) => {
  const res = await fetch(`${API}/profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const updatePassword = async (data, token) => {
  const res = await fetch(`${API}/change-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const forgotPassword = async (email) => {
  const res = await fetch(`${API}/forgot-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await res.json();
};

export const resetPassword = async (data) => {
  const res = await fetch(`${API}/reset-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
