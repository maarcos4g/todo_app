import { useState } from 'react';

import './App.scss'

export function App() {
  const [todoText, setTodoText] = useState('');

  return (
    <div className="container">
      <strong>Qual tarefa quer registrar?</strong>
      <form className="form-primary">
        <input
          type="text"
          placeholder="Descreva sua tarefa"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />

        <button type="submit">+</button>
      </form>

      {
        todoText
      }
    </div>
  )
}
