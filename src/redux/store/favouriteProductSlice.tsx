import { createSlice } from '@reduxjs/toolkit';
import { IItem } from '../../utils/models';

export const favouriteProductSlice = createSlice({
  name: 'favouriteProduct',
  initialState: {
    favouriteProducts: [] as IItem[],
  },

  reducers: {
    setAddFavorite: (state, action) => {
      if (action.payload) {
        state.favouriteProducts = [...state.favouriteProducts, action.payload];
      }
    },

    setRemoveFavorite: (state, action) => {
      if (action.payload) {
        state.favouriteProducts = state.favouriteProducts.filter(
          (favouriteUser) => favouriteUser.id !== action.payload.id
        );
      }
    },
  },
});

export const { setAddFavorite, setRemoveFavorite } =
  favouriteProductSlice.actions;
export default favouriteProductSlice.reducer;
