import CSS from 'csstype';
import {memo, useMemo} from 'react';

type T_CssProps = Pick<CSS.Properties, 'alignSelf' | 'justifySelf' | 'textAlign'>

type T_Props = {
  name?: string
  className?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function
  style?: Record<string, string>
}

type T_CombinedProps = T_Props & T_CssProps
const GridArea: React.FC<T_CombinedProps> = memo(({alignSelf, children, className, name, justifySelf, style, textAlign}) => {
  const dynamicStyles = useMemo(() => ({
    alignSelf,
    gridArea: name,
    justifySelf,
    textAlign,
    ...style,
  }), [alignSelf, name, justifySelf, style, textAlign]);

  return <div className={className} style={dynamicStyles}>
    {children}
  </div>;
});

GridArea.displayName = 'GridArea';
export {GridArea};
