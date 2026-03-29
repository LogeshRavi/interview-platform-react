import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../services/api";
import { auth } from "../firebase";

export default function MyInterviews() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyInterviews();
  }, []);

  // ✅ Fetch user interviews
  const fetchMyInterviews = async () => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const res = await axios.get(
        `${API_URL}/interviews/user/${user.email}`
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete interview
  const handleDelete = async (id) => {
    const user = auth.currentUser;

    if (!user) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/interviews/${id}`, {
        data: { email: user.email },
      });

      // 🔄 Refresh list
      fetchMyInterviews();
    } catch (err) {
      console.error(err);
    }
  };

  // ⏳ Loading state
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Interviews</h1>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No interviews found 😅
        </p>
      ) : (
        data.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 mb-4 rounded-xl shadow border"
          >
            <h2 className="font-semibold text-lg">{item.company}</h2>

            <p className="text-sm text-gray-500">
              {item.role} • {item.experience} • {item.difficulty}
            </p>

            <p className="mt-2 text-gray-700 whitespace-pre-line">
              {item.questions}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Posted by {item.createdBy?.name || item.createdBy?.email}
            </p>

            {/* 🔴 Delete Button */}
            <button
              onClick={() => handleDelete(item._id)}
              className="mt-3 text-red-500 text-sm hover:underline"
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}