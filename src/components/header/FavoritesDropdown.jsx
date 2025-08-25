import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavorite } from "../../store/actions/favActions";

export default function FavoritesDropdown({ onClose }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.favorites?.items || []);

  return (
    <div className="absolute right-0 top-12 mt-2 w-80 sm:w-96 font-[Montserrat] bg-white shadow-2xl border border-gray-100 rounded-xl p-4 z-50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div className="font-bold text-lg text-gray-800">
          My Favorites ({items.length})
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close favorites"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Favorites Items */}
      <div className="max-h-64 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 font-medium">No favorites yet</p>
            <p className="text-xs text-gray-400 mt-1">Start adding products to your favorites</p>
          </div>
        ) : (
          items.map((p) => (
            <div key={p.id} className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <img
                src={p.images?.[0]?.url}
                alt={p.name}
                className="w-16 h-16 object-cover rounded-lg shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                  {p.name}
                </div>
                <div className="text-sm font-bold text-blue-600 mt-1">
                  ${Number(p.price).toFixed(2)}
                </div>
              </div>
              <button
                className="w-8 h-8 flex items-center justify-center border border-red-300 rounded-lg hover:bg-red-50 hover:border-red-400 transition-all duration-200 text-red-500 hover:text-red-600"
                title="Remove from favorites"
                onClick={() => dispatch(removeFavorite(p.id))}
                aria-label="Remove from favorites"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            to="/maintenance"
            className="flex-1 text-center py-2 px-4 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
            onClick={onClose}
          >
            View All Favorites
          </Link>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}