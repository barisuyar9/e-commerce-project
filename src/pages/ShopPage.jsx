import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import Breadcrumb from "../components/shop-page/Breadcrumb";
import ShopImageGallery from "../components/shop-page/ShopImageGallery";
import { fetchProducts } from "../store/thunks/productThunks";
import ProductCard from "../components/shop-page/ProductCard";
import Pagination from "../components/shop-page/Pagination";
import Brands from "../components/Brands";

export default function ShopPage() {
  const dispatch = useDispatch();
  const { categoryId } = useParams(); 

  const [page, setPage] = useState(1);
  const limit = 12;
  const offset = (page - 1) * limit;

  const [selectedCategory, setSelectedCategory] = useState(categoryId || "");

  const { productList, total, fetchState } = useSelector((s) => s.product);

  useEffect(() => {
    if (categoryId) setSelectedCategory(String(categoryId));
  }, [categoryId]);

  useEffect(() => {
    const opts = { limit, offset };
    if (selectedCategory) opts.category_id = selectedCategory;
    dispatch(fetchProducts(opts));
  }, [dispatch, limit, offset, selectedCategory]);

  const isLoading = fetchState === "FETCHING";
  const isError = fetchState === "FAILED";
  const totalPages = Math.ceil((total || 0) / limit);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Try again later.</p>;
  }

  return (
    <main className="w-[90vw] max-w-[1200px] mx-auto py-10">
      <Breadcrumb current="Shop" />
      <ShopImageGallery />
      <ProductCard
        products={productList}
        selectedCategory={selectedCategory}
        onCategoryChange={(val) => {
          setSelectedCategory(val);
          setPage(1); 
        }}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <Brands/>

    </main>
  );
}