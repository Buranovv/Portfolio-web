import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../server";
import { LIMIT } from "../../constants";

const initialState = {
  skills: [],
  total: 0,
  loading: false,
  isModalLoading: false,
};

export const getSkills = createAsyncThunk(
  "skills/fetching",
  async ({ search, page }) => {
    const { data } = await request.get("skills", {
      params: { search, page, limit: LIMIT },
    });
    return data;
  }
);

export const addSkill = createAsyncThunk("skill/add", async ({ values }) => {
  await request.post("skills", values);
});

export const deleteSkill = createAsyncThunk("skill/delete", async (id) => {
  await request.delete(`skills/${id}`);
});

export const getSkill = createAsyncThunk("skill/get", async (id) => {
  const { data } = await request.get(`skills/${id}`);
  return data;
});

export const editSkill = createAsyncThunk(
  "skill/edit",
  async ({ id, values }) => {
    await request.put(`skills/${id}`, values);
  }
);

const skillSlice = createSlice({
  initialState,
  name: "skill",
  reducers: {},
  extraReducers: {
    [getSkills.pending]: (state) => {
      state.loading = true;
    },
    [getSkills.fulfilled]: (state, { payload: { data, pagination } }) => {
      let newData = data.map((el) => ({ ...el, key: el._id }));
      state.skills = newData;
      state.total = pagination.total;
      state.loading = false;
    },
    [getSkills.rejected]: (state) => {
      state.loading = false;
    },
    [addSkill.pending]: (state) => {
      state.isModalLoading = true;
    },
    [addSkill.fulfilled]: (state) => {
      state.isModalLoading = false;
    },
    [addSkill.rejected]: (state) => {
      state.isModalLoading = false;
    },
  },
});

const { name: skillName, reducer: skillReducer } = skillSlice;

export { skillReducer as default, skillName };
