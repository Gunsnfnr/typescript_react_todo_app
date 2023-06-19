import {PayloadAction, createSlice} from '@reduxjs/toolkit';
// import {createSlice} from '@reduxjs/toolkit';

interface Itodo {
  id: string;
  nameOfUser: string;
  title: string;
  done: boolean;
}

interface IInitialState {
  thisUserTodo: Itodo[];
}

const initialState: IInitialState = {
  thisUserTodo: [],
};

export const locStorSlice = createSlice({
  name: 'locStor',
  initialState,
  reducers: {
    dataStart: (state: IInitialState) => {
      state.thisUserTodo = [];
    },
    // updatedData: (state: IInitialState, action) => {
      updatedData: (state: IInitialState, action: PayloadAction<Itodo[]>) => {
      state.thisUserTodo = action.payload;
    },
  },
});

export default locStorSlice;
