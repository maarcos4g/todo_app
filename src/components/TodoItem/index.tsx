import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import classNames from 'classnames';

import styles from './styles.module.scss'
import './styles.css'

import calendar from '../../assets/calendar.svg'
import goal from '../../assets/goal.svg'
import task from '../../assets/task.svg'

import { Check, TrashSimple } from 'phosphor-react';
import { api } from '../../lib/api';

interface TodoItemProps {
  id: string;
  title: string;
  endDate?: Date;
  category: "studyOrWork" | "hobby" | "commitment";
  isFinished: boolean;
}

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps { }

export function TodoItem(props: TodoItemProps) {

  async function handleDeleteTask(id: string) {
    try {
      await api.delete(`/todo/${id}`);
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleChangeTaskToCompleted(id: string) {
    try {
      await api.put(`/todo/${id}`)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  const categoryVirified =
    props.category === "hobby" ? goal : props.category === "studyOrWork" ? task : calendar;

  return (
    <div
      className={props.isFinished ? styles.containerItemCompleted : styles.containerItem}>
      <div>
        <img src={categoryVirified} alt="Icone" />
        <span>{props.title}</span>
      </div>

      <TrashSimple size={20} className={styles.trash} onClick={() => handleDeleteTask(props.id)} />
      
      <Checkbox
        checked={props.isFinished}
        onCheckedChange={() => {
          handleChangeTaskToCompleted(props.id);
        }}
        onClick={() => handleChangeTaskToCompleted(props.id)} />


    </div>
  );
}

export function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root className={styles.ckeckbox} {...props}>
      <CheckboxPrimitive.Indicator asChild>
        <Check weight="bold" size={20} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}