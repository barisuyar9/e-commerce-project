import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_DECREASE_ITEM,
  CART_TOGGLE_CHECKED,
  CART_CLEAR,
} from "../actionTypes";


const initialState = {
  items: [],
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const p = action.payload;
      const exist = state.items.find((x) => x.product.id === p.id);
      if (exist) {
        
        return {
          ...state,
          items: state.items.map((x) =>
            x.product.id === p.id ? { ...x, count: x.count + 1 } : x
          ),
        };
      }
      
      return {
        ...state,
        items: [...state.items, { product: p, count: 1, checked: true }],
      };
    }

    case CART_DECREASE_ITEM: {
      const id = action.payload;
      return {
        ...state,
        items: state.items
          .map((x) => (x.product.id === id ? { ...x, count: x.count - 1 } : x))
          .filter((x) => x.count > 0),
      };
    }

    case CART_REMOVE_ITEM: {
      const id = action.payload;
      return {
        ...state,
        items: state.items.filter((x) => x.product.id !== id),
      };
    }

    case CART_TOGGLE_CHECKED: {
      const id = action.payload;
      return {
        ...state,
        items: state.items.map((x) =>
          x.product.id === id ? { ...x, checked: !x.checked } : x
        ),
      };
    }

    case CART_CLEAR:
      return { ...state, items: [] };

    default:
      return state;
  }
}