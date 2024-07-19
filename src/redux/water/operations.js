import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../API/axiosInstance';

export const getDayWater = createAsyncThunk(
  'water/DayWater',
  async (date, thunkAPI) => {
    try {
      const response = await instance.get(`api/water/day/1704844800000`);
      console.log(response.data);
      return response.data.WaterData;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addWater = createAsyncThunk(
  'water/addWater',
  async (newNote, thunkAPI) => {
    try {
      const response = await instance.post('api/water', newNote);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkAPI) => {
    try {
      const response = await instance.delete(`api/water/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const editWater = createAsyncThunk(
  'water/editWater',
  async ({ id, newNote }, thunkAPI) => {
    console.log(id);
    console.log(newNote);
    try {
      const response = await instance.put(`api/water/:${id}`, newNote);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export default { deleteWater, getDayWater, addWater };
