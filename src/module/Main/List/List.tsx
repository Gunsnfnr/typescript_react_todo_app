import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactNode, useEffect, useState, useRef } from 'react';
import { localStorageActionCreator } from '../../../store/locStorAction';
import { useAppDispatch, useAppSelector } from '../../../hooks';

interface IListProps {
  nameOfUser: string,
}

export const List: React.FC<IListProps> = (props: IListProps) => {
  let [taskname, setTaskname] = useState<string>('');
  const submitButton = useRef<HTMLButtonElement>(null);
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
      const taskId: string = Math.random().toString(16).substring(2, 10);
      const todo: Itodo = {
        id: taskId,
        nameOfUser: props.nameOfUser,
        title: taskname,
        done: false,
      }
      localStorage.setItem(`task.${props.nameOfUser}.${taskId}`, JSON.stringify(todo));
      setTaskname('');
      dispatch(localStorageActionCreator(props.nameOfUser));
    }
  };

const clearInput = ():void => {
  setTaskname('');
};

useEffect(() => {
  if (taskname === '' && submitButton.current !== null) {
    submitButton?.current.setAttribute('disabled', '');
  } else if (submitButton.current !== null) {
    submitButton?.current.removeAttribute('disabled');
  }
}, [taskname]);

const thisUserTodofromstate: Itodo[] = useAppSelector(state => state.locStor.thisUserTodo);

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

useEffect(() => {
  dispatch(localStorageActionCreator(props.nameOfUser));
}, [dispatch, props.nameOfUser]);

const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
  if (event.target instanceof HTMLElement) {
    const closest: HTMLTableRowElement | null = event.target.closest("tr");
    if (closest !== null) {
      const taskId: string | null = closest.getAttribute('data-id');
      localStorage.removeItem(`task.${props.nameOfUser}.${taskId}`);
      dispatch(localStorageActionCreator(props.nameOfUser));
    }
  }
};

const handleComplete = (event: React.MouseEvent<HTMLElement>) => {
  if (event.target instanceof HTMLElement) {
    const closest: HTMLTableRowElement | null = event.target.closest("tr");
    if (closest !== null) {
      const taskId: string | null = closest.getAttribute('data-id');
      const currentTask = localStorage.getItem(`task.${props.nameOfUser}.${taskId}`);
      if (typeof currentTask === 'string') {
        const currentTaskObj:Itodo = JSON.parse(currentTask);        
        currentTaskObj.done = true;
      localStorage.setItem(`task.${props.nameOfUser}.${taskId}`, JSON.stringify(currentTaskObj));
      }
      dispatch(localStorageActionCreator(props.nameOfUser));
    }
  }
};

const handleLogout = ():void => {
  window.location.reload();
}

return (
  <>
  <div className="app-container vh-100 w-100 d-flex align-items-center justify-content-center flex-column">
    <h3 className='mb-3'>Todo App</h3>
    <div className='d-flex mb-3'><h4 className='me-5 mb-0'>User: {props.nameOfUser}</h4>
    <button type="reset" className="btn btn-light"
    onClick={handleLogout}>
      Logout
    </button>

      </div>
  <form className="d-flex align-items-center mb-3" onSubmit={handleSubmit}>
    <label className="form-group me-3 mb-0">
      <input type="text"
        className="form-control"
        placeholder="Add task"
        value={taskname}
        onChange={handleChange}
      />
    </label>
    <button type="submit" className="btn btn-primary me-3" ref={submitButton}>
      Save
    </button>
    <button type="reset" className="btn btn-warning"
    onClick={clearInput}>
      Clear
    </button>
  </form>
  <div className="p-2 table-wrapper">
    <table className="table table-hover table-bordered">
      {thisUserTodofromstate.length !== 0 && <thead>
        <tr>
          <th className='text-center'>№</th>
          <th className='text-center'>Task</th>
          <th className='text-center'>Status</th>
          <th className='text-center'>Actions</th>
        </tr>
      </thead>}
      <tbody>
        {
          thisUserTodofromstate.map(function(item: Itodo, i: number): ReactNode
            {
              return thisUserTodofromstate[i] && <tr className={
                `${item.done ? 'table-success' : 'table-light'}`
              } key={item.id} 
              data-id={item.id}>
              <td>{i+1}</td>
              <td className={`${item.done ? 'text-decoration-line-through' : 'task'}`}>
                {item.title}
              </td>
              {item.done ?
              <td>Completed</td> :
              <td>In progress</td>}
              <td>
                <button className="btn btn-danger me-3" onClick={handleDelete}>
                  Delete
                </button>
                <button className="btn btn-success" onClick={handleComplete} disabled={item.done ? true : false}>
                  Complete
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