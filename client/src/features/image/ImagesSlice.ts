import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ImagesState} from './type';
import * as api from './api';

const initialState: ImagesState = {images: [], error: ''};

export const imagesInit = createAsyncThunk('images/init', () =>
  api.imagesInitFetch()
);

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(imagesInit.fulfilled, (state, action) => {
        state.images = action.payload;
      })
      .addCase(imagesInit.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default imagesSlice.reducer;
