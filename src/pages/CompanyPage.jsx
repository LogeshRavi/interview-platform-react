import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../services/api";
import { Helmet } from "react-helmet";

export default function CompanyPage() {
  const { company } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    document.title = `${company} Interview Questions`;
  }, [company]);

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
      Latest {company} interview questions for frontend, backend and fullstack roles in India.
    </p>

    {/* ✅ List */}
    {data.map((item, index) => (
      <div key={index} className="bg-white p-4 mb-4 rounded-xl shadow border">
        <h2 className="font-semibold">{item.role}</h2>
        <p className="text-sm text-gray-500">
          {item.experience} • {item.difficulty}
        </p>

        <p className="mt-2 text-gray-700">{item.questions}</p>

        <p className="text-xs text-gray-400 mt-2">
          Posted by {item.createdBy?.name || item.createdBy?.email || "Unknown"}
        </p>
      </div>
    ))}

  </div>
);
}