import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

export default function AddCompanyModel({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    foundedOn: "",
    city: "",
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
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-800 text-xl"
        >
          <RxCross1 className="text-black" />
        </button>
        <form onSubmit={handleSubmit} className="pt-16 px-8 pb-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Add Company
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Company name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Company Name..."
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter Company location..."
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Founded on
              </label>
              <input
                name="foundedOn"
                type="date"
                value={form.foundedOn}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city..."
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-purple-600  text-white font-semibold py-3 rounded-xl"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
