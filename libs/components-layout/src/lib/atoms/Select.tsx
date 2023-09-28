import {InputHTMLAttributes, PropsWithChildren, ReactNode} from 'react';

import styles from './Select.module.css';
import {Label} from './Label';

type T_Props = {
    label: string | ReactNode
    id: string
};

const Select: React.FC<PropsWithChildren<T_Props> & InputHTMLAttributes<HTMLSelectElement>> = ({label, id, children, ...props}) => {
  return <Label htmlFor={id} text={label}>
    <select className={styles['select']} id={id} {...props}>
      {children}
    </select>
  </Label>;
};

Select.displayName = 'Select';
export {Select};
