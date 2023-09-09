import CSS from 'csstype';
import {memo, useMemo} from 'react';

import styles from './GridTemplate.module.css';

type T_CssProps = Pick<CSS.Properties, 'gridTemplateAreas' | 'gridTemplateRows' | 'gridTemplateColumns' | 'gridGap' | 'alignItems' | 'textAlign' | 'justifyItems'>

type T_Props = {
  className?: string
  columns?: number
  rows?: number
}

type T_CombinedProps = T_Props & T_CssProps

const GridTemplate: React.FC<T_CombinedProps> = memo(({
  alignItems,
  children,
  className,
  columns,
  gridTemplateAreas,
  gridTemplateRows,
  gridTemplateColumns,
  gridGap,
  rows,
  justifyItems,
  textAlign,
}) => {
  const dynamicStyles = useMemo(() => {
    const columnsValue = gridTemplateColumns ?? `1fr `.repeat(columns || 1);
    const rowsValue = gridTemplateRows ?? `1fr `.repeat(rows || 1);
    return {
      alignItems,
      gridGap,
      gridTemplateAreas,
      gridTemplateColumns: columnsValue,
      gridTemplateRows: rowsValue,
      justifyItems,
      textAlign,
    };
  }, [alignItems, columns, gridGap, gridTemplateAreas, gridTemplateColumns, gridTemplateRows, justifyItems, rows, textAlign]);

  return <div className={`${styles['grid-template']} ${className}`.trim()} style={dynamicStyles}>
    {children}
  </div>;
});

GridTemplate.displayName = 'GridTemplate';
export {GridTemplate};
