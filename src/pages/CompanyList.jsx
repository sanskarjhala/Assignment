import { useState, useEffect } from "react";
import CompanyCard from "../component/CompanyCArd";
import AddCompanyModel from "../component/AddCompanyModel";
import axios from "axios";

export default function CompanyList({ onSelectCompany }) {
  const [companies, setCompanies] = useState([]);
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("Name");
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCompanies = async () => {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        city,
        sort,
      });

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/company?${query.toString()}`,
      );

      setCompanies(response?.data.companies);
      setTotalPages(response?.data.totalPages);
    } catch (error) {
      console.log("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page, city, sort]);

  const handleAddCompany = async (form) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/company`,
        {
          name: form.name,
          location: form.location,
          city: form.city,
          foundedOn: form.foundedOn,
        },
      );

      setShowModal(false);
      fetchCompanies();
    } catch (error) {
      console.log("Error adding company:", error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-end gap-4 mb-6">
        <div className="flex-1 max-w-sm">
          <label className="block text-sm text-gray-600 mb-1">
            Select City
          </label>
          <input
            value={city}
            onChange={(e) => {
              setCity(e.target.value.trim());
              setPage(1);
            }}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
          />
        </div>

        <div className="ml-auto flex items-end gap-2">
          <label className="text-sm text-gray-600">Sort:</label>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white"
          >
            <option>Name</option>
            <option>Rating</option>
          </select>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm"
        >
          + Add Company
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Result Found: {companies.length}
      </p>

      <div className="space-y-4">
        {companies.map((company) => (
          <CompanyCard
            key={company._id}
            company={company}
            onClick={onSelectCompany}
          />
        ))}

        {companies.length === 0 && (
          <div className="text-center py-16 text-black">
            <p>No companies found.</p>
          </div>
        )}
      </div>

      {companies.length !== 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {showModal && (
        <AddCompanyModel
          onClose={() => setShowModal(false)}
          onSave={handleAddCompany}
        />
      )}
    </div>
  );
}
