
// import { ThunkDispatch } from '@reduxjs/toolkit';
import locStorSlice from './locStorSlice';
import { Dispatch } from "redux";

// Dispatch<Action>
export const localStorageActionCreator = (nameOfUser: string) => (dispatch: Dispatch<any>) => {
  // export const localStorageActionCreator = (nameOfUser: string) => (dispatch: ThunkDispatch<any, any, any>) => {
  interface Itodo {
  id: string;
  nameOfUser: string;
  title: string;
  done: boolean;
}
  const thisUserTodo: Itodo[] = [];


  for (let i:number = 0; i < localStorage.length; i++) {
    let key: string | null = localStorage.key(i);
    if (key && key.includes(nameOfUser) && key.includes('task')) {
      const currValue = localStorage.getItem(key);
      if (typeof currValue === 'string') {
        thisUserTodo.push(JSON.parse(currValue));
      }
    }
  }

  dispatch(locStorSlice.actions.updatedData(thisUserTodo));

};
