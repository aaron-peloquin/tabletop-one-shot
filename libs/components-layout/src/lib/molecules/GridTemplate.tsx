import CSS from 'csstype';
import {PropsWithChildren, memo, useMemo} from 'react';

import styles from './GridTemplate.module.css';

type T_CssProps = Pick<CSS.Properties, 'gridTemplateAreas' | 'gridTemplateRows' | 'gridTemplateColumns' | 'alignItems' | 'textAlign' | 'justifyItems'>;

type T_Props = {
  className?: string
  columns?: number
  rows?: number
  id?: string
};

type T_CombinedProps = T_Props & T_CssProps;

const GridTemplate: React.FC<PropsWithChildren<T_CombinedProps>> = memo(({
  alignItems,
  children,
  className,
  columns,
  gridTemplateAreas,
  gridTemplateRows,
  gridTemplateColumns,
  id,
  rows,
  justifyItems,
  textAlign,
}) => {
  const dynamicStyles = useMemo(() => {
    const columnsValue = columns || gridTemplateColumns ? gridTemplateColumns ?? `1fr `.repeat(columns || 1) : undefined;
    const rowsValue = gridTemplateRows || rows ? gridTemplateRows ?? `1fr `.repeat(rows || 1) : undefined;
    return {
      alignItems,
      gridTemplateAreas,
      gridTemplateColumns: columnsValue,
      gridTemplateRows: rowsValue,
      justifyItems,
      textAlign,
    };
  }, [alignItems, columns, gridTemplateAreas, gridTemplateColumns, gridTemplateRows, justifyItems, rows, textAlign]);

  return <div id={id} className={`${styles['grid-template']} ${className}`.trim()} style={dynamicStyles}>
    {children}
  </div>;
});

GridTemplate.displayName = 'GridTemplate';
export {GridTemplate};
