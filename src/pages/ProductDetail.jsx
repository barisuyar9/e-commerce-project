import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchProductById } from "../store/thunks/productThunks";
import Brands from "../components/Brands";
import FavProducts from "../components/home-components/FavProducts";
import ProductFooter from "../components/product-detail/ProductFooter";
import ProductInfo from "../components/product-detail/ProductInfo";
export default function ProductDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();
  const product = useSelector((s) => s.product.productDetail);
  const fetchState = useSelector((s) => s.product.productDetailFetchState);
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);
  const isLoading = fetchState === "FETCHING";
  const isError = fetchState === "FAILED";
  const safeBack = () => {
    if (history.length > 1) history.goBack();
    else history.push("/shop");
  };
  if (isLoading) {
    return (
      <main className="w-full flex justify-center py-20">
        <CircularProgress />
      </main>
    );
  }
  if (isError || !product) {
    return (
      <main className="w-[90vw] max-w-[1200px] mx-auto py-10">
        <button
          onClick={safeBack}
          className="mb-6 text-[#23A6F0] font-bold hover:underline cursor-porinter"
        >
          ← Back
        </button>
        <p className="text-center text-red-500">Product not found.</p>
      </main>
    );
  }
  return (
    <main className="w-[90vw] max-w-[1200px] mx-auto py-10">
      <button
        onClick={safeBack}
        className="mb-6 text-[#23A6F0] font-bold hover:underline cursor-pointer"
      >
        ← Back
      </button>
      <ProductInfo product={product} />
      <ProductFooter product={product} />
      <FavProducts />
      <Brands />
    </main>
  );
}






