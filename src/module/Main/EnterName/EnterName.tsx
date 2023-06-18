import { useState } from 'react';
import style from './EnterName.module.css';

interface IEnterNameProps {
  updateData: (showform: boolean, userName: string) => void;
}

export const EnterName: React.FC<IEnterNameProps> = (updateData) => {
  const [name, setName] = useState<string>('');
  const [showform, setShowform] = useState(true);

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      setName(e.target.value);
    }
  }

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (name !== '') {
      console.log(name);
      localStorage.setItem(`user.${name}`, name);
      setShowform(false);
      updateData.updateData(showform, name);
    }
  }

  return (
    showform ?
    <div className="vh-100 w-100 d-flex align-items-center justify-content-center flex-column">
      <div>Enter your name</div>
      <form className={style.form} onSubmit={handleSubmit}>
        <input type='text'
        className={style.name}
        value={name}
        onChange={handleChange}/>
        <button type='submit'>Enter</button>
      </form>
    </div> :
    <div></div>
  )
}