const { CgNpm } = require("react-icons/cg");

fetch("http://127.0.0.1:8000/api/users/register/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "sagar123",
    email: "sagar@example.com",
    password: "testpassword",
    role: "customer",
  }),
})
  .then((res) => {
    if (!res.ok) {
      return res.json().then((err) => {
        console.error("API ERROR:", err);
      });
    }
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.error("Fetch failed:", err));
