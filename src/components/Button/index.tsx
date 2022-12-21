import { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  position?: boolean;
}

export function Button({ label, position, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={position ? styles.containerButtonPositioned : styles.containerButton}>
      <span>
        {label}
      </span>
    </button>
  );
}