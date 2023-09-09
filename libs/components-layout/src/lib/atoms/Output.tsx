import {OutputHTMLAttributes, ReactNode} from 'react';

import {Label} from './Label';
import styles from './Output.module.css';

type T_Props = {
  value: string | number | ReactNode
  label: string | ReactNode
  id: string
}

const Output: React.FC<T_Props & OutputHTMLAttributes<HTMLOutputElement>> = ({id, label, value, ...props}) => {
  return <>
    <Label text={label} htmlFor={id} />
    <output className={styles['output']} id={id} {...props}>{value}</output>
  </>;
};

Output.displayName = 'Output';
export {Output};
