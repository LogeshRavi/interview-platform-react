import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../services/api";
import { Helmet } from "react-helmet";
import { auth } from "../firebase";

export default function CompanyPage() {
  const { company } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    document.title = `${company} Interview Questions`;
  }, [company]);

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

    fetchData(); // refresh
  } catch (err) {
    console.error(err);
  }
};

  const fetchData = async () => {
    const res = await axios.get(`${API_URL}/interviews/company/${company}`);
    setData(res.data);
  };

  return (
    <div>
      {/* ✅ SEO Meta (TOP) */}
      <Helmet>
        <title>{company} Interview Questions</title>
        <meta
          name="description"
          content={`Latest ${company} interview questions for frontend, backend and fullstack roles in India.`}
        />
      </Helmet>

      {/* ✅ Heading */}
      <h1 className="text-2xl font-bold mb-2 capitalize">
        {company} Interview Questions
      </h1>

      {/* ✅ Description */}
      <p className="text-gray-600 mb-4">
        Latest {company} interview questions for frontend, backend and fullstack
        roles in India.
      </p>

      {/* ✅ List */}

      {data?.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6 border"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-blue-600">
              {item.company}
            </h2>

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
          <p className="mt-4 text-gray-700 leading-relaxed">
            {item.questions?.split("🚀")[0]}
          </p>

          {/* INTERVIEW PROCESS */}
          {item.questions?.includes("🚀") && (
            <div className="mt-4">
              <p className="font-semibold text-gray-800 mb-2">
                🚀 Interview Process:
              </p>

              <div className="space-y-1 text-sm text-gray-700">
                {item.questions
                  .split("👉")
                  .slice(1, 5)
                  .map((r, i) => (
                    <p key={i}>👉 {r.trim()}</p>
                  ))}
              </div>
            </div>
          )}

          {/* QUESTIONS */}
          <div className="mt-5">
            <p className="font-semibold text-gray-800 mb-2">📌 Questions:</p>

            <div className="space-y-2 text-sm text-gray-700">
              {item.questions
                ?.split("-")
                .slice(1)
                .map((q, i) => (
                  <p key={i}>• {q.trim()}</p>
                ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-5 text-xs text-gray-500 flex justify-between">
            <span>
              👤 {item.createdBy?.name || item.createdBy?.email || "Unknown"}
            </span>

            {item.result && (
              <span className="text-green-600 font-medium">{item.result}</span>
            )}
            <button
              onClick={() => handleUpvote(item._id)}
              className="text-sm flex items-center gap-1 text-gray-600 hover:text-blue-600"
            >
              👍 {item.upvotes || 0}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
