import Star from "./Star";

export default function CompanyCard({ company, onClick }) {
  function getAvgRating(reviews) {
    if (!reviews.length) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }
  const avg = getAvgRating(company.reviews);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-5 hover:shadow-md transition-shadow">
      <div className="max-w-14">LOGO</div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-base">
          {company.name}
        </h3>
        <p className="text-gray-500 text-xs flex items-center gap-1">
          {company.location}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-gray-800 text-sm">
            {avg.toFixed(1)}
          </span>
          <Star rating={Math.round(avg)} size="sm" />
          {company.reviews.length > 0 && (
            <span className="text-gray-500 text-xs">
              {company.reviews.length} Reviews
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <span className="text-gray-400 text-xs">
          {`Founded on ${company?.foundedOn}`}
        </span>
        <button
          onClick={() => onClick(company)}
          className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
        >
          Detail Review
        </button>
      </div>
    </div>
  );
}
