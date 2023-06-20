import { useState } from 'react';
import { EnterName } from './EnterName/EnterName';
import { List } from './List/List';



export const Main:React.FC = () => {
  const [value, setValue] = useState<boolean>(false);
  const [nameOfUser, setNameOfUser] = useState<string>('');

  const updateData = (showform: boolean, userName: string):string => {
    setValue(showform);
    setNameOfUser(userName);
    return userName;
  };

  return (
    <>
      {!value && <EnterName updateData = {updateData} />}
      {value && <List nameOfUser = {nameOfUser}/>}
    </>
  )
}