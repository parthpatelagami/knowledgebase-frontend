// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

// ** Custom component Imports
import { showNotifications } from "@components/Notifications";

// ** Actions
import { checkCategory } from "../../../redux/action";
import { getAllCategory } from "../store/action";

export const categoryDataSlice = createSlice({
  name: "category",
  initialState: {
    isDuplicate: false,
    categoryDataTable: [],
    isCategoryDataLoading: false,
    totalCategoryDataCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkCategory.fulfilled, (state, action) => {
        state.isDuplicate = action.payload;
      })
      .addCase(checkCategory.rejected, (state, action) => {
        state.isDuplicate = false;
        console.log(
          "An error occured while checking Category :",
          action.payload
        );
        showNotifications({
          type: "error",
          title: "Oops! Something went wrong!",
          message: "We cannot check Category, please contact support team..",
        });
      })
      // ** FOR FETCHING LIST OF SCORE CARD DATA
      .addCase(getAllCategory.pending, (state) => {
        state.isCategoryDataLoading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.isCategoryDataLoading = false;
        state.categoryDataTable = action.payload;
        state.totalCategoryDataCount = action.payload.total_count;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isCategoryDataLoading = false;
        state.categoryDataTable = [];
        state.totalCategoryDataCount = 0;
        console.log(
          "An error occured while fetching Category data: ",
          action.payload
        );
        showNotifications({
          type: "error",
          title: "Oops! Something went wrong!",
          message: "Please contact support team.",
        });
      });
  },
});

export default categoryDataSlice.reducer;
