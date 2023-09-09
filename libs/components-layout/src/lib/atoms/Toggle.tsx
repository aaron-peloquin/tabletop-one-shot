import {InputHTMLAttributes, memo} from 'react';

import {Label} from './Label';

import classNames from './Toggle.module.css';

type T_Props = {
    id: string
    label: string
    checked: boolean
}

const Toggle: React.FC<T_Props & InputHTMLAttributes<HTMLInputElement>> = memo(({id, label, checked, ...props}) => {
  return <label htmlFor={id}>
    <input type="checkbox" className={classNames['checkbox']} id={id} name={id} checked={checked} {...props} />
    <span>{label}:</span>
    <div className={classNames['toggle-plate']}>
      {checked ?
      <div className={`${classNames['toggle-switch']} ${classNames['switch-on']}`}>Yes</div> :
      <div className={`${classNames['toggle-switch']} ${classNames['switch-off']}`}>No</div>}
    </div>
  </label>;
});

Toggle.displayName = 'Toggle';
export {Toggle};
