// utils/auth.js

const USERS_KEY = "app_users";
const SESSION_KEY = "logged_in_user";

// Helper: Get all users
function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

// Get currently logged in user
export function getLoggedInUser() {
  const username = localStorage.getItem(SESSION_KEY);
  return username ? { username } : null;
}

// Register new user
export function registerUser(username, password) {
  const users = getUsers();
  if (users.find((u) => u.username === username)) {
    return { success: false, message: "Username already exists" };
  }
  users.push({ username, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
}

// Login user
export function loginUser(username, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem(SESSION_KEY, username);
    return { success: true };
  }
  return { success: false, message: "Invalid username or password" };
}

// Logout user
export function logoutUser() {
  localStorage.removeItem("user");
}

export function updateUserProfile(profile) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updatedUsers = users.map((u) =>
    u.username === profile.username ? profile : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("user", JSON.stringify(profile));
}
