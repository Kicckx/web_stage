import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
  });
  const [previewPhoto, setPreviewPhoto] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
    setForm({
      email: storedUser.email || "",
      firstname: storedUser.firstname || "",
      lastname: storedUser.lastname || "",
    });
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, photo: file });
    setPreviewPhoto(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Non autorisé");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors de la mise à jour");
      } else {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Profil mis à jour avec succès !");
      }
    } catch (error) {
      alert("Erreur serveur");
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Profil utilisateur</h2>

      <div style={{ marginBottom: 20 }}>
        <img
          src={
            previewPhoto ||
            (user.photo && typeof user.photo === "string" ? user.photo : null) ||
            "https://via.placeholder.com/150?text=No+Photo"
          }
          alt="Photo de profil"
          style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover" }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email :</label><br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Prénom :</label><br />
          <input
            type="text"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Nom :</label><br />
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Changer la photo :</label><br />
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Sauvegarder
        </button>
      </form>

      <button
        onClick={handleLogout}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: "#f44336",
          color: "white",
          border: "none"
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default Profile;
