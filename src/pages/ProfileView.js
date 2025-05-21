// pages/ProfileView.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProfileView = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="space-y-2">
        {[
          { label: "Username", value: user.username },
          { label: "First Name", value: user.first_name },
          { label: "Last Name", value: user.last_name },
          { label: "Email", value: user.email },
          { label: "Date of Birth", value: user.dob },
          { label: "Address", value: user.address },
          { label: "Country", value: user.country },
          { label: "State", value: user.state },
          { label: "City", value: user.city },
        ].map(({ label, value }) => (
          <div key={label}>
            <strong>{label}:</strong> {value || "-"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileView;
