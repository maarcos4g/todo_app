import { FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

import {
  saveTodosInLocalStorage,
  getTodosInLocalStorage
} from './services/storage';

import trashIcon from './assets/trash.svg'

import './App.scss'

type TodoDataType = {
  id: string;
  content: string;
}

export function App() {
  const [todoText, setTodoText] = useState('');
  const [data, setData] = useState<TodoDataType>();

  const [myTodos, setMyTodos] = useState<TodoDataType[]>([]);

  function handleNewTodo(event: FormEvent) {
    event.preventDefault();

    if (todoText.trim() === "") {
      return;
    }

    try {
      setData({
        id: uuidv4(),
        content: todoText,
      });

      saveTodosInLocalStorage('@todoData', data as TodoDataType);

      setTodoText('');
    } catch (error) {
      alert("Oops... algo deu errado!");
    }

  }

  useEffect(() => {
    async function getTodosSaves() {
      const response: TodoDataType[] = await getTodosInLocalStorage('@todoData');

      if (response.length > 0) {
        setMyTodos(response);
      }
    }

    getTodosSaves();
  }, [])

  return (
    <div className="container">
      <strong>Qual tarefa quer registrar?</strong>
      <form
        className="form-primary"
        onSubmit={handleNewTodo}
      >
        <input
          type="text"
          placeholder="Descreva sua tarefa"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />

        <button type="submit">+</button>
      </form>

      <div className='containerList'>
        <strong>Minhas tarefas de hoje</strong>

        <hr />

        {
          myTodos.map(item => {
            return (
              <div className="itemTodo" key={item?.id}>
                <span>{item?.content}</span>
                <button>
                  <img src={trashIcon} alt="Apagar tarefa" />
                </button>
              </div>
            );
          })
        }

      </div>
    </div>
  )
}
