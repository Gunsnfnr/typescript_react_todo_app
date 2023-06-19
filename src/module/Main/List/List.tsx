// import style from './List.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactNode, useEffect, useState } from 'react';
import { localStorageActionCreator } from '../../../store/locStorAction';
import { useAppDispatch, useAppSelector } from '../../../hooks';

interface IListProps {
  nameOfUser: string,
}
export const List: React.FC<IListProps> = (props: IListProps) => {
  let [taskname, setTaskname] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      setTaskname(e.target.value);
    }
  }

  interface Itodo {
    id: string;
    nameOfUser: string;
    title: string;
    done: boolean;
  }

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (taskname !== '') {
      console.log(taskname);
      const taskId: string = Math.random().toString(16).substring(2, 10);
      console.log('taskId: ', taskId);
      const todo: Itodo = {
        id: taskId,
        nameOfUser: props.nameOfUser,
        title: taskname,
        done: false,
      }
      localStorage.setItem(`task.${props.nameOfUser}.${taskId}`, JSON.stringify(todo));
      setTaskname('');
    }
  };

const clearInput = ():void => {
  setTaskname('');
};

useEffect(() => {
  const btn = document.getElementById('submit') as HTMLButtonElement | null;
  if (taskname === '') {
    btn?.setAttribute('disabled', '');
  } else {
  btn?.removeAttribute('disabled');
  }
}, [taskname]);

const thisUserTodofromstate: Itodo[] = useAppSelector(state => state.locStor.thisUserTodo);
console.log('thisUserTodofromstate: ', thisUserTodofromstate);
//get data from localStorage
const thisUserTodo: Itodo[] = [];

for (let i:number = 0; i < localStorage.length; i++) {
  let key: string | null = localStorage.key(i);
  if (key && key.includes(props.nameOfUser) && key.includes('task')) {
    const currValue = localStorage.getItem(key);
    if (typeof currValue === 'string') {
      thisUserTodo.push(JSON.parse(currValue));
    }
  }
}

dispatch(localStorageActionCreator(props.nameOfUser));

const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
  if (event.target instanceof HTMLElement) {    
    const closest: HTMLTableRowElement | null = event.target.closest("tr");
    if (closest !== null) {
      const taskId: string | null = closest.getAttribute('data-id');
      localStorage.removeItem(`task.${props.nameOfUser}.${taskId}`);
    }   
  }
};

return (
  <>
  <div className="app-container vh-100 w-100 d-flex align-items-center justify-content-center flex-column">
      <h3>Todo App</h3>
  <form className="d-flex align-items-center mb-3" onSubmit={handleSubmit}>
    <label className="form-group me-3 mb-0">
      <input type="text"
        className="form-control"
        placeholder="Введите задачу"
        value={taskname}
        onChange={handleChange}
      />
    </label>
    <button type="submit" className="btn btn-primary me-3" id="submit">
      Сохранить
    </button>
    <button type="reset" className="btn btn-warning"
    onClick={clearInput}>
      Очистить
    </button>
  </form>
  <div className="p-2 table-wrapper">
    <table className="table table-hover table-bordered">
      <thead>
        <tr>
          <th className='text-center'>№</th>
          <th className='text-center'>Задача</th>
          <th className='text-center'>Статус</th>
          <th className='text-center'>Действия</th>
        </tr>
      </thead>
      <tbody>
        {
          thisUserTodo.map(function(item: Itodo, i: number): ReactNode
            {
              return thisUserTodo && <tr className="table-light" key={item.id} 
              data-id={item.id}>
              <td>{i+1}</td>
              <td className="task">
                {item.title}
              </td>
              <td>В процессе</td>
              <td>
                <button className="btn btn-danger me-3" onClick={handleDelete}>
                  Удалить
                </button>
                <button className="btn btn-success">
                  Завершить
                </button>
              </td>
            </tr>
            }
          )
        }
      </tbody>
    </table>
  </div>
  </div>
  </>
)
}