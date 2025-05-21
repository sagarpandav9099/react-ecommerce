import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        dob: user.dob || "",
        email: user.email || "",
        address: user.address || "",
        country: user.country || "",
        state: user.state || "",
        city: user.city || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ ...user, ...formData });
    navigate("/profile/view");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg   max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "first_name",
          "last_name",
          "email",
          "dob",
          "address",
          "country",
          "state",
          "city",
        ].map((field) => (
          <div key={field}>
            <label className="block capitalize">
              {field.replace("_", " ")}:
            </label>
            <input
              type={field === "dob" ? "date" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
