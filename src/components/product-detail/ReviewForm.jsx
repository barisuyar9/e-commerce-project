import { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewForm({ productName }) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      rating,
      review,
      name,
      email,
    };
    console.log("Submitted review:", formData);
    //axios.post("/reviews", formData)
  };

  return (
    <section className="max-w-2xl mx-auto my-10">
      <h2 className="text-xl font-semibold mb-4">
        Be the first to review "{productName}"
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <span className="font-medium">Your Rating</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoveredStar(i + 1)}
                onMouseLeave={() => setHoveredStar(null)}
                className={`w-6 h-6 cursor-pointer ${
                  (hoveredStar || rating) > i
                    ? "fill-[#F3CD03] text-[#F3CD03]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <textarea
          placeholder="Your Review *"
          className="border p-3 rounded w-full"
          rows="5"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Name *"
            className="border p-3 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email *"
            className="border p-3 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <label className="flex gap-2 items-center">
          <input type="checkbox" />
          <span className="text-sm text-gray-500">
            Save my name, email, and website in this browser for the next time I
            comment.
          </span>
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-5 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Submit
        </button>
      </form>
    </section>
  );
}