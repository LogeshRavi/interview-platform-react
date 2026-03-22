import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {

    const API_URL = "https://interview-platform-nodejs.onrender.com";

  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInterviews();
  }, [search]);

const fetchInterviews = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/interviews?company=${search}`
    );
    setInterviews(res.data);
  } catch (err) {
    console.error(err);
  }
};


return (
  <div className="max-w-3xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Interview Experiences</h1>

    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="Search by company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={fetchInterviews}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Search
      </button>
    </div>

    <Link to="/add">
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        + Add Interview
      </button>
    </Link>

    {interviews.map((item, index) => (
      <div
        key={index}
        className="p-4 border rounded-xl shadow-sm mb-4 bg-white"
      >
        <h2 className="text-lg font-semibold">{item.company}</h2>
        <p className="text-sm text-gray-500">
          {item.role} • {item.experience}
        </p>

        <p className="mt-2">
          <span className="font-medium">Difficulty:</span>{" "}
          <span className="text-blue-600">{item.difficulty}</span>
        </p>

        <p className="mt-2 text-gray-700">{item.questions}</p>
      </div>
    ))}
  </div>
)
}