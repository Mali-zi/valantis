import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../utils/const';

export const favouriteUserSlice = createSlice({
  name: 'favouriteUsers',
  initialState: {
    favouriteUsers: [] as IUser[],
  },

  reducers: {
    setAddFavorite: (state, action) => {
      if (action.payload) {
        state.favouriteUsers = [...state.favouriteUsers, action.payload];
      }
    },

    setRemoveFavorite: (state, action) => {
      if (action.payload) {
        state.favouriteUsers = state.favouriteUsers.filter(
          (favouriteUser) => favouriteUser.id !== action.payload.id
        );
      }
    },
  },
});

export const { setAddFavorite, setRemoveFavorite } = favouriteUserSlice.actions;
export default favouriteUserSlice.reducer;
