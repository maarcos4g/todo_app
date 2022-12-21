import { useState, FormEvent } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import task from '../../assets/task.svg'
import goal from '../../assets/goal.svg'
import calendar from '../../assets/calendar.svg'

import styles from './styles.module.scss'
import { Button } from '../Button';
import { api } from '../../lib/api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Plus } from 'phosphor-react';

export function Modal() {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState(Date());
  const [description, setDescription] = useState<string>('');

  function handleCategory(category: string) {
    setCategory(category);
  }

  async function handleCreateTodo(event: FormEvent) {
    event.preventDefault();

    const dateFormatted = parseISO(date)

    try {
      const response = await api.post("/todo/new", {
        title: title,
        category: category,
        endDate: dateFormatted,
        description: description,
      });

      console.log(response.data)
      window.location.reload();
    } catch (error) {
      alert('Erro ao criar tarefa!');
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={styles.dialogContent}>
        <Dialog.Title className={styles.dialogTitle}>
          Adicionar nova tarefa
          <Plus size={20} weight="bold" color='#4A3780' />
        </Dialog.Title>

        <form className={styles.form}>
          <div>
            <label htmlFor='title'>Título da tarefa</label>
            <input
              type="text"
              id='title'
              placeholder='Título da tarefa'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className={styles.categories}>
            <label htmlFor="category">Categoria</label>
            <img
              onClick={() => handleCategory("studyOrWork")}
              src={task} id='task'
              alt="Icone de Task" />

            <img
              onClick={() => handleCategory("commitment")}
              src={calendar} id='calendar'
              alt="Icone de Calendário" />

            <img
              onClick={() => handleCategory("hobby")}
              src={goal} id='goal'
              alt="Icone de Goal" />
          </div>

          <div>
            <label htmlFor="date">Data e hora</label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <div className={styles.description}>
            <label htmlFor="description">Descrição <span>Opcional</span></label>
            <textarea
              id='description'
              placeholder='Descrição da tarefa'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <footer>
            <Dialog.Close type='button' className={styles.close}>Cancelar</Dialog.Close>

            <Button label="Salvar" onClick={handleCreateTodo} />
          </footer>

        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}