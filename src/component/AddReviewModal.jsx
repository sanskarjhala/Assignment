import { useState } from "react";
import Star from "./Star";
import { RxCross1 } from "react-icons/rx";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Satisfied", "Excellent"];

export default function AddReviewModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    review: "",
    rating: 4,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 text-xl font-light"
        >
          <RxCross1 className="text-black" />
        </button>

        <form onSubmit={handleSubmit} className="pt-16 px-8 pb-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Add Review
          </h2>

          <div className="space-y-2">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Review title"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Enter your Review
              </label>
              <textarea
                name="review"
                value={form.review}
                onChange={handleChange}
                placeholder="Write your experience..."
                rows={4}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5"
              />
            </div>

            <div>
              <p className="text-lg  text-gray-900 mb-2">Rating</p>
              <div className="flex items-center gap-4">
                <Star
                  rating={form.rating}
                  onChange={(r) => setForm({ ...form, rating: r })}
                  size="lg"
                />
                <span className="text-gray-500 text-sm">
                  {RATING_LABELS[form.rating]}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-purple-600 cursor-pointer text-white font-semibold py-3 rounded-xl"
          >
            Save Review
          </button>
        </form>
      </div>
    </div>
  );
}
