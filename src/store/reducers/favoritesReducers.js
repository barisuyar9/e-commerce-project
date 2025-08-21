import { FAV_ADD, FAV_REMOVE, FAV_TOGGLE, FAV_CLEAR } from "../actionTypes";


const load = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch {
    return [];
  }
};
const save = (items) =>
  localStorage.setItem("favorites", JSON.stringify(items));

const initialState = { items: load() }; 

export default function favorites(state = initialState, action) {
  switch (action.type) {
    case FAV_ADD: {
      const p = action.payload;
      if (state.items.some((x) => x.id === p.id)) return state;
      const items = [...state.items, p];
      save(items);
      return { ...state, items };
    }
    case FAV_REMOVE: {
      const id = action.payload;
      const items = state.items.filter((x) => x.id !== id);
      save(items);
      return { ...state, items };
    }
    case FAV_TOGGLE: {
      const p = action.payload;
      const exists = state.items.some((x) => x.id === p.id);
      const items = exists
        ? state.items.filter((x) => x.id !== p.id)
        : [...state.items, p];
      save(items);
      return { ...state, items };
    }
    case FAV_CLEAR: {
      save([]);
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}