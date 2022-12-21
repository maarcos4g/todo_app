import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { useEffect, useState } from 'react';

import { Button } from './components/Button';
import { TodoItem } from './components/TodoItem';

import * as Dialog from '@radix-ui/react-dialog';

import { api, TodoReponse } from './lib/api';

import styles from './styles/App.module.scss'
import { Modal } from './components/Modal';

export function App() {
  const actualDate = format(new Date(), "d 'de' MMMM',' yyyy", {
    locale: ptBR,
  })

  const [todoData, setTodoData] = useState<TodoReponse[]>()
  const [todoDataCompleted, setTodoDataCompleted] = useState<TodoReponse[]>()

  async function fetchTodoData() {
    try {
      const response = await api.get("/todos/incomplete");
      setTodoData(response.data.todos);
    } catch (error) {
      alert(error)
    }
  }

  async function fetchTodosCompleted() {
    try {
      const response = await api.get("/todos/completed");
      setTodoDataCompleted(response.data.todos);
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchTodoData();
    fetchTodosCompleted()
  }, [])

  return (
    <div>
      <header className={styles.header}>
        <h1>Home | Todo List</h1>
        <span>{actualDate}</span>
      </header>

      <main className={styles.container}>
        <div className={styles.todos}>
          <span>Minhas tarefas</span>

          {todoData ? todoData.map(item => {
            return <TodoItem
              key={item.id}
              title={item.title}
              category={item.category}
              isFinished={item.isFinished}
              id={item.id}
            />
          }) : <p style={{ padding: 10 }}>Sem tarefas cadastradas</p>}
        </div>

        <div className={styles.todosCompleted}>
          <span>Minhas tarefas completas</span>

          {todoDataCompleted?.length ? todoDataCompleted.map(item => {
            return <TodoItem
              key={item.id}
              title={item.title}
              category={item.category}
              isFinished={item.isFinished}
              id={item.id}
            />
          }) : <p style={{ padding: 10 }}>Sem tarefas completas</p>}
        </div>
      </main>

      <footer className={styles.footer}>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button position label='Adicionar nova tarefa' />
          </Dialog.Trigger>

          <Modal />
        </Dialog.Root>
      </footer>
    </div>
  );
}
