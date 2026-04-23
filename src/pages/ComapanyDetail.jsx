import { useEffect, useState } from "react";
import axios from "axios";
import Star from "../component/Star";
import AddReviewModal from "../component/AddReviewModal";
import toast from "react-hot-toast";

function getAvgRating(reviews) {
  if (!reviews.length) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

function ReviewItem({ review }) {
  const createdDate = new Date(review.createdAt);

  const date = createdDate.toLocaleDateString();

  return (
    <div className="py-5 border-b border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={`https://i.pravatar.cc/40?u=${review.userName}`}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {review.userName}
            </p>
            <p className="text-gray-800 text-xs">{date}</p>
          </div>
        </div>
        <Star rating={review.rating} size="sm" />
      </div>

      <p className="text-gray-600 text-sm mt-3">{review.comment}</p>
    </div>
  );
}

export default function CompanyDetail({ companyId, onBack }) {
  const [company, setCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sort, setSort] = useState("Date");

  const getCompany = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/company/${companyId}`,
      );
      setCompany(response.data.company);
    } catch (error) {
      console.log("Error fetching company:", error);
    }
  };

  useEffect(() => {
    getCompany();
  }, [companyId]);

  if (!company) {
    return <p className="p-6">Loading...</p>;
  }
  const avg = getAvgRating(company.reviews);

  // Like we hav to sort for rating and not rating than date
  const sorted = [...company.reviews].sort((a, b) => {
    if (sort === "Rating") return b.rating - a.rating;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleSaveReview = async (form) => {
    const toastId = "saveReview";
    try {
      toast.loading("Loading...", { id: toastId });
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${companyId}/reviews`,
        {
          userName: form.name,
          subject: form.subject,
          rating: form.rating,
          comment: form.review,
        },
      );
      setShowModal(false);
      toast.success("Review Added", { id: toastId });
      getCompany();
    } catch (error) {
      console.log("Error adding review:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-purple-600 text-sm font-medium mb-4"
      >
        Back to Companies
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-2">
        <div className="flex items-start gap-5">
          <div className="flex-1">
            <h2 className="font-bold text-gray-900 text-xl">{company.name}</h2>

            <p className="text-gray-500 text-sm mt-1">{company.location}</p>

            <div className="flex items-center gap-2 mt-3">
              <span className="font-bold text-gray-800">{avg.toFixed(1)}</span>
              <Star rating={Math.round(avg)} size="md" />
              {company.reviews.length > 0 && (
                <span className="text-gray-500 text-sm">
                  {company.reviews.length} Reviews
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <span className="text-gray-400 text-xs">
              Founded on {company.foundedOn}
            </span>

            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-lg text-sm"
            >
              + Add Review
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">
            Result Found: {company.reviews.length}
          </p>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Sort by:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 text-sm bg-white"
            >
              <option>Date</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="text-center">
            <p>No reviews</p>
          </div>
        ) : (
          sorted.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))
        )}
      </div>

      {showModal && (
        <AddReviewModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveReview}
        />
      )}
    </div>
  );
}
