import { useState } from 'react';

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
      localStorage.setItem(`user.${name}`, name);
      setShowform(false);
      updateData.updateData(showform, name);
    }
  }

  return (
    showform ?
    <div className="vh-100 w-100 d-flex align-items-center justify-content-center flex-column">
      <h2 className='mb-3'>Enter your name</h2>
      <form onSubmit={handleSubmit} className='d-flex align-items-center mb-3'>
        <input type='text'
        className='form-control me-3'
        value={name}
        onChange={handleChange}/>
        <button type='submit' className='btn btn-primary me-3'>Enter</button>
      </form>
    </div> :
    <div></div>
  )
}