import { FaStar, FaRegStar } from "react-icons/fa";

export default function Star({ rating, onChange, size = "md" }) {
  const sizes = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= rating;

        return (
          <span
            key={star}
            className={`${sizes[size]} ${
              onChange ? "cursor-pointer" : ""
            }`}
            onClick={() => onChange && onChange(star)}
          >
            {isFilled ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar className="text-gray-300" />
            )}
          </span>
        );
      })}
    </div>
  );
}
