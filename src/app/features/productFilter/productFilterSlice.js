import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  category: [],
  subcategory: [],
  brand: [],
  featured: false,
};

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    activateFilter: {
      reducer: (state, action) => {
        const { filterType, filterName } = action.payload;
        if (!state[filterType].includes(filterName)) {
          state[filterType].push(filterName);
        }
      },
      prepare: (filterType, filterName) => {
        return {
          payload: {
            filterType,
            filterName,
          },
        };
      },
    },

    deactivateFilter: {
      reducer: (state, action) => {
        const { filterType, filterName } = action.payload;
        state[filterType] = state[filterType].filter(
          (item) => item !== filterName
        );
      },
      prepare: (filterType, filterName) => {
        return {
          payload: {
            filterType,
            filterName,
          },
        };
      },
    },

    toggleFeaturedFilter: (state) => {
      state.featured = !state.featured;
    },

    updateSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const {
  activateFilter,
  deactivateFilter,
  toggleFeaturedFilter,
  updateSearchQuery,
} = productFilterSlice.actions;

export default productFilterSlice.reducer;
