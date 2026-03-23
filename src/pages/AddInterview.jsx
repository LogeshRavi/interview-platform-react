import { useState } from "react";
import axios from "axios";
import API_URL from "../services/api";
import { auth } from "../firebase";

export default function AddInterview() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    experience: "",
    questions: "",
    difficulty: "Easy",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const user = auth.currentUser;

  const data = {
    ...formData,
    createdBy: {
    name: user.displayName,
    email: user.email,
  }
  };

  await axios.post(`${API_URL}/interviews`, data);
  alert("Saved Succesfully")
};

return (
  <div className="max-w-xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Add Interview</h1>

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="company"
        placeholder="Company"
        className="border p-2 rounded"
        onChange={handleChange}
      />

      <input
        name="role"
        placeholder="Role"
        className="border p-2 rounded"
        onChange={handleChange}
      />

      <input
        name="experience"
        placeholder="Experience (2 years)"
        className="border p-2 rounded"
        onChange={handleChange}
      />

      <textarea
        name="questions"
        placeholder="Questions asked..."
        className="border p-2 rounded"
        onChange={handleChange}
      />

      <select
        name="difficulty"
        className="border p-2 rounded"
        onChange={handleChange}
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <button className="bg-green-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  </div>
);
}
