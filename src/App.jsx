import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [todoData, setTodosData] = useState([]);
  const [addTodo, setaddTodo] = useState('');
  const [update, setUpdate] = useState(false);
  const [id, setID] = useState(null);
  const fetchData = async () => {
    const data = await fetch('https://dummyjson.com/todos').then((res) =>
      res.json()
    );
    console.log(data);
    setTodosData(data.todos);
  };
  const addNewTodo = () => {
    setTodosData([
      ...todoData,
      { id: 31, todo: addTodo, completed: false, userId: 333 },
    ]);
    setaddTodo('');
  };
  const deleteTodo = (id) => {
    let temptodo = [...todoData];
    const deleteTodoData = temptodo.filter((t) => t.id !== id);
    setTodosData(deleteTodoData);
  };
  const checkData = (id) => {
    let temptodo = [...todoData];
    temptodo.forEach((t) => {
      if (t.id === id) {
        t.completed = !t.completed;
      }
    });
    setTodosData(temptodo);
  };
  console.log(todoData);
  const updateData = (id) => {
    setUpdate(!update);
    setID(id);
  };
  const onUpdateChange = (id, e) => {
    let temptodo = [...todoData];
    temptodo.forEach((t) => {
      if (t.id === id) {
        t.todo = e.target.value;
      }
    });
    setTodosData(temptodo);
  };
  const saveData = () => {
    setID(null);
    setUpdate(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="add-todo">
        <input
          type="text"
          value={addTodo}
          onChange={(e) => setaddTodo(e.target.value)}
        />
        <button onClick={addNewTodo}>Add</button>
      </div>
      <ul>
        {todoData.map((t) => (
          <li key={t.id}>
            {t.id === id ? (
              <input
                type="text"
                onChange={(e) => onUpdateChange(t.id, e)}
                value={t.todo}
              />
            ) : (
              t.todo
            )}
            <button onClick={() => deleteTodo(t.id)}>Delete</button>
            {update ? (
              <button onClick={() => saveData(t.id)}>Save</button>
            ) : (
              <button onClick={() => updateData(t.id)}>Update</button>
            )}
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => checkData(t.id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
