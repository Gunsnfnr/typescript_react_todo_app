import { ThunkAction } from 'redux-thunk';
// import { Action } from 'redux';
import { Dispatch } from 'redux';
import locStorSlice from './locStorSlice';
// import { ThunkDispatch } from '@reduxjs/toolkit';

declare module 'redux' {
    export interface Dispatch {
        <T extends ThunkAction<any, any, any, any>>(action: T): T extends ThunkAction<infer K, any, any, any> ? K : never;
    }
}



// Dispatch<Action>
export const localStorageActionCreator = (nameOfUser: string) => (dispatch: Dispatch) => {
  // export const localStorageActionCreator = (nameOfUser: string) => (dispatch: ThunkDispatch<any, any, any>) => {
  interface Itodo {
  id: string;
  nameOfUser: string;
  title: string;
  done: boolean;
}

dispatch(locStorSlice.actions.dataStart());

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
