import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavorite } from "../../store/actions/favActions";

export default function FavoritesDropdown({ onClose }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.favorites?.items || []);

  return (
    <div className="absolute right-0 top-12 mt-2 w-80 font-[Montserrat] bg-white shadow-lg border border-[#E6E6E6] rounded p-3 z-50">
      <div className="font-bold mb-2">My Favorites ({items.length})</div>

      <div className="max-h-64 overflow-auto space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">No favorites yet</p>
        ) : (
          items.map((p) => (
            <div key={p.id} className="flex gap-3 items-center">
              <img
                src={p.images?.[0]?.url}
                alt={p.name}
                className="w-14 h-14 object-cover rounded"
              />
              <div className="flex-1">
                <div className="text-sm font-semibold line-clamp-1">
                  {p.name}
                </div>
                <div className="text-xs text-gray-500">
                  ${Number(p.price).toFixed(2)}
                </div>
              </div>
              <button
                className="px-2 py-1 border rounded font-bold cursor-pointer"
                title="Remove"
                onClick={() => dispatch(removeFavorite(p.id))}
              >
                x
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 flex justify-between items-center">
        <Link
          to="/maintenance"
          className="text-[#23A6F0] font-bold"
          onClick={onClose}
        >
          Go to Favorites
        </Link>
        <button
          onClick={onClose}
          className="bg-[#23A6F0] text-white px-3 py-1 rounded font-bold cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}