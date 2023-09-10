import {TextareaHTMLAttributes, ReactNode} from 'react';

import styles from './Input.module.css';
import {Label} from './Label';

type T_Props = {
    label: string | ReactNode
    id: string
}

const Textarea: React.FC<T_Props & TextareaHTMLAttributes<HTMLTextAreaElement>> = ({label, id, ...props}) => {
  return <Label htmlFor={id} text={label}>
    <textarea className={styles['textarea']} id={id} {...props} />
  </Label>;
};

Textarea.displayName = 'Textarea';
export {Textarea};
