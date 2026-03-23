import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../services/api";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInterviews();
  }, [search]);

  const fetchInterviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/interviews?company=${search}`);
      setInterviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddClick = () => {
    if (!auth.currentUser) {
      navigate("/login?redirect=/add");
    } else {
      navigate("/add");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Interview Experiences</h1>

      <div className="bg-white p-3 rounded-xl shadow mb-4 flex gap-2">
        <input
          className="flex-1 border p-2 rounded focus:outline-none"
          placeholder="Search company (e.g. Zoho)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 rounded">Search</button>
      </div>

      <button
        onClick={handleAddClick}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        + Add Interview
      </button>

      {interviews.map((item, index) => (
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4 border hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <Link to={`/interview/${item.company}`}>
              <h2 className="text-lg font-semibold text-blue-600">
                {item.company}
              </h2>
            </Link>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {item.difficulty}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {item.role} • {item.experience}
          </p>

          <p className="mt-3 text-gray-700 leading-relaxed">{item.questions}</p>

          <p className="text-xs text-gray-400 mt-3">
            Posted by {item.createdBy}
          </p>
        </div>
      ))}

      {interviews.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No interviews found 😅
        </p>
      )}
    </div>
  );
}
