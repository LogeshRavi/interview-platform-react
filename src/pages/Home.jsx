import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../services/api";
import { auth } from "../firebase";

export default function Home() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchInterviews();
  }, [search, page]);

  const fetchInterviews = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/interviews?page=${page}&limit=5&search=${search}`,
      );
      setInterviews(res.data.data);
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

  const handleUpvote = async (id) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        navigate("/login");
        return;
      }

      await axios.post(`${API_URL}/interviews/upvote/${id}`, {
        userId: user.uid || user.email,
      });

      fetchInterviews(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 text-center">
        Interview Experiences
      </h1>

      {/* Search */}
      <div className="bg-white p-3 rounded-xl shadow mb-4 flex gap-2">
        <input
          className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search company (e.g. Zoho)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
          Search
        </button>
      </div>

      {/* Add Button */}
      <button
        onClick={handleAddClick}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        + Add Interview
      </button>

      {/* Cards */}
      {interviews?.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-2xl shadow-sm p-5 mb-5 border hover:shadow-md transition"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <Link to={`/interview/${item.company}`}>
              <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                {item.company}
              </h2>
            </Link>

            <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {item.difficulty}
            </span>
          </div>

          {/* ROLE */}
          <p className="text-sm text-gray-500 mt-1">
            {item.role} • {item.experience} yrs
          </p>

          {/* META */}
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            {item.date && <p>📅 {item.date}</p>}
            <p>👨‍💻 {item.role}</p>
            <p>📊 {item.experience} years</p>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-3 text-gray-700 text-sm leading-relaxed line-clamp-2">
            {item.questions}
          </p>

          {/* PROCESS PREVIEW */}
          <div className="mt-3 text-sm text-gray-700">
            <p className="font-medium">🚀 Interview Process:</p>
            <ul className="mt-1 space-y-1">
              {item.questions
                ?.split("👉")
                .slice(1, 3) // only first 2 rounds preview
                .map((r, i) => (
                  <li key={i}>👉 {r.trim()}</li>
                ))}
            </ul>
          </div>

          {/* FOOTER */}
          <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
              <span>
                👤 {item.createdBy?.name || item.createdBy?.email || "Unknown"}
              </span>

              <button
                onClick={() => handleUpvote(item._id)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
              >
                👍 {item.upvotes || 0}
              </button>
            </div>

            {/* RIGHT SIDE */}
            <Link
              to={`/interview/${item.company}`}
              className="text-blue-500 font-medium hover:underline"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Prev
        </button>

        <span className="px-4 py-2">Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Empty State */}
      {interviews.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No interviews found 😅
        </p>
      )}
    </div>
  );
}
