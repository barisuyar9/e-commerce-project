import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";

export default function ProductCard({
  products,
  selectedCategory,
  onCategoryChange,
}) {
  const slugify = (s = "") =>
    (s || "")
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const trToAscii = (s = "") =>
    s.replace(
      /[ıİşŞğĞçÇöÖüÜ]/g,
      (ch) =>
        ({
          ı: "i",
          İ: "i",
          ş: "s",
          Ş: "s",
          ğ: "g",
          Ğ: "g",
          ç: "c",
          Ç: "c",
          ö: "o",
          Ö: "o",
          ü: "u",
          Ü: "u",
        }[ch])
    );
  const keyFromCode = (code = "") => {
    const part = code.split(":")[1] || "";
    return trToAscii(part)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  };
  const codeMap = {
    tisort: { label: "T-Shirt" },
    ayakkabi: { label: "Shoes" },
    ceket: { label: "Jacket" },
    elbise: { label: "Dress" },
    etek: { label: "Skirt" },
    gomlek: { label: "Shirt" },
    kazak: { label: "Sweater" },
    pantalon: { label: "Pants" },
  };

  const categories = useSelector((s) => s.category.items || []);

  const [viewType, setViewType] = useState("grid");
  const [sortOrder, setSortOrder] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [internalCategory, setInternalCategory] = useState("");
  const categoryValue = selectedCategory ?? internalCategory;
  const setCategory = onCategoryChange ?? setInternalCategory;

  const filteredProducts = (products || [])
    .filter((product) => {
      const priceCheck =
        (!minPrice || product.price >= parseFloat(minPrice)) &&
        (!maxPrice || product.price <= parseFloat(maxPrice));
      const categoryCheck =
        !categoryValue || product.category_id === parseInt(categoryValue);
      return priceCheck && categoryCheck;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const buildProductUrl = (p) => {
    const cat = categories.find((c) => c.id === p.category_id);
    if (!cat) return `/product/${p.id}`;
    const genderPath = cat.gender === "k" ? "women" : "men";
    const categorySlug = slugify(cat.title);
    const productSlug = slugify(p.name);
    return `/shop/${genderPath}/${categorySlug}/${cat.id}/${productSlug}/${p.id}`;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Views:</span>
          <button
            onClick={() => setViewType("grid")}
            className={`border px-3 py-1 rounded ${
              viewType === "grid"
                ? "bg-gray-100 text-black font-bold"
                : "text-gray-500"
            }`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`border px-3 py-1 rounded ${
              viewType === "list"
                ? "bg-gray-100 text-black font-bold"
                : "text-gray-500"
            }`}
          >
            <List size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700"
          >
            <option value="">Sort By</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className="bg-[#23A6F0] text-white text-sm px-4 py-2 rounded hover:bg-[#2497da] transition"
          >
            Filter
          </button>
        </div>
      </div>

      {filterOpen && (
        <div className="w-full mb-6 rounded-xl border border-[#E6E6E6] bg-white shadow-sm p-4 md:p-5 font-[Montserrat]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Min Price */}
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wide text-[#737373]">
                Min Price
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border border-[#E6E6E6] rounded-md px-3 py-2 text-sm text-[#252B42]
                           focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/40 focus:border-[#23A6F0] transition"
                placeholder="0"
              />
            </div>

            {/* Max Price */}
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wide text-[#737373]">
                Max Price
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border border-[#E6E6E6] rounded-md px-3 py-2 text-sm text-[#252B42]
                           focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/40 focus:border-[#23A6F0] transition"
                placeholder="9999"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wide text-[#737373]">
                Category
              </label>
              <select
                value={categoryValue}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-[#E6E6E6] rounded-md px-3 py-2 text-sm text-[#252B42] bg-white
                           focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/40 focus:border-[#23A6F0] transition"
              >
                <option value="">All</option>
                {categories.map((c) => {
                  const key = keyFromCode(c.code);
                  const label = codeMap[key]?.label ?? c.title;
                  return (
                    <option key={c.id} value={String(c.id)}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${
          viewType === "list"
            ? "flex flex-col gap-5"
            : "flex flex-wrap justify-center gap-x-5 gap-y-6"
        }`}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`${
              viewType === "list"
                ? "w-full flex gap-4 p-4 border border-[#cecdcd] rounded items-center cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition"
                : "w-full sm:w-[47%] md:w-[30%] lg:w-[22%] flex justify-center cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition"
            }`}
          >
            {viewType === "list" ? (
              <Link
                to={buildProductUrl(product)}
                className="flex gap-4 items-center"
              >
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="flex flex-col justify-between gap-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-sm text-[#BDBDBD] font-bold">
                    ${product.price.toFixed(2)}{" "}
                    <span className="text-sm text-[#23856D] font-bold">
                      ${(product.price - 10).toFixed(2)}
                    </span>
                  </p>
                </div>
              </Link>
            ) : (
              <Link
                to={buildProductUrl(product)}
                className="flex flex-col items-center justify-start text-center gap-2 font-[Montserrat] w-full max-w-[240px] h-[520px] overflow-hidden"
              >
                <img
                  src={product.images?.[0]?.url}
                  className="w-full h-[320px] object-cover object-center"
                  alt={product.name}
                />
                <h5 className="text-[#252B42] font-bold">{product.name}</h5>
                <p className="text-[#737373] font-bold text-sm line-clamp-2">
                  {product.description}
                </p>
                <p className="text-[#BDBDBD] font-bold text-sm">
                  ${product.price.toFixed(2)}
                  <span className="text-[#23856D]">
                    {" "}
                    ${(product.price - 10).toFixed(2)}
                  </span>
                </p>
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}