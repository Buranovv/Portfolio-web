import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../server";
import { LIMIT } from "../../constants";

const initialState = {
  portfolios: [],
  total: 0,
  loading: false,
  isModalLoading: false,
  photoData: null,
  photoLoad: false,
};

export const getPortfolios = createAsyncThunk(
  "portfolios/fetching",
  async ({ search, page }) => {
    const { data } = await request.get("portfolios", {
      params: { search, page, limit: LIMIT },
    });
    return data;
  }
);

export const addPortfolio = createAsyncThunk(
  "portfolio/add",
  async ({ values }) => {
    await request.post("portfolios", values);
  }
);

export const deletePortfolio = createAsyncThunk(
  "portfolio/delete",
  async (id) => {
    await request.delete(`portfolios/${id}`);
  }
);

export const getPortfolio = createAsyncThunk("portfolio/get", async (id) => {
  const { data } = await request.get(`portfolios/${id}`);
  return data;
});

export const editPortfolio = createAsyncThunk(
  "portfolio/edit",
  async ({ id, values }) => {
    const { data } = await request.put(`portfolios/${id}`, values);
    return data;
  }
);

export const uploadPhoto = createAsyncThunk("portfolio/photo", async (file) => {
  let formData = new FormData();
  formData.append("file", file);
  const { data } = await request.post("upload", formData);
  return data;
});

const portfolioSlice = createSlice({
  initialState,
  name: "portfolio",
  reducers: {
    resetPhoto(state) {
      state.photoData = null;
    },
    setPhoto(state, { payload }) {
      state.photoData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolios.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPortfolios.fulfilled,
        (state, { payload: { data, pagination } }) => {
          let newData = data.map((el) => ({ ...el, key: el._id }));
          state.portfolios = newData;
          state.total = pagination.total;
          state.loading = false;
        }
      )
      .addCase(getPortfolios.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addPortfolio.pending, (state) => {
        state.isModalLoading = true;
      })
      .addCase(addPortfolio.fulfilled, (state) => {
        state.isModalLoading = false;
      })
      .addCase(addPortfolio.rejected, (state) => {
        state.isModalLoading = false;
      })
      .addCase(uploadPhoto.pending, (state) => {
        state.photoLoad = true;
      })
      .addCase(uploadPhoto.fulfilled, (state, { payload }) => {
        state.photoData = payload;
        state.photoLoad = false;
      })
      .addCase(uploadPhoto.rejected, (state) => {
        state.photoLoad = false;
      });
  },
});

const { resetPhoto, setPhoto } = portfolioSlice.actions;

const { name: portfolioName, reducer: portfolioReducer } = portfolioSlice;

export { portfolioReducer as default, portfolioName, resetPhoto, setPhoto };
