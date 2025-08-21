import axiosInstance from "../../api/axiosInstance";
import { clearCart } from "../actions/cartActions";
import { clearOrder } from "../actions/orderActions"; 

export const placeOrder = (cvv) => async (dispatch, getState) => {
  const state = getState();

  
  const addressId = state.address?.shippingId;
  if (!addressId) throw new Error("Please select a shipping address.");

  const selectedCardId = state.card?.selectedId;
  const card = state.card?.items?.find((c) => c.id === selectedCardId);
  if (!card) throw new Error("Please select a card.");

 
  const selected = (state.cart?.items || []).filter((x) => x.checked);
  if (selected.length === 0) throw new Error("No selected items in cart.");


  const payload = {
    address_id: addressId,
    order_date: new Date().toISOString(),
    card_no: String(card.card_no).replace(/\s+/g, ""),
    card_name: card.name_on_card,
    card_expire_month: Number(card.expire_month),
    card_expire_year: Number(card.expire_year),
    card_ccv: Number(cvv),

    price:
      Number(state.order?.summary?.total) ||
      selected.reduce(
        (sum, x) => sum + Number(x.product.price || 0) * x.count,
        0
      ),
    products: selected.map((x) => ({
      product_id: x.product.id,
      count: x.count,
      detail: "", 
    })),
  };


  await axiosInstance.post("/order", payload);


  dispatch(clearCart());
  if (clearOrder) dispatch(clearOrder());
  return true;
};