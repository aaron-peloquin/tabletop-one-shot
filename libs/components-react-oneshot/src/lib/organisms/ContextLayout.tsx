import { GridArea, Card, Textarea } from "@components-layout";
import { globalDataContext } from "@static";
import { useContext, useCallback } from "react";

type T_Props = {
  gridName: string
};

export const ContextLayout: React.FC<T_Props> = ({gridName}) => {
  const {overview, context, setContext} = useContext(globalDataContext);
  
  const handleContextChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(event?.target.value);
  }, [setContext]);
  
  const editable = !(overview);

  if(!editable && !context) {
    return [];
  }

  return <GridArea className='full-width' name={gridName}>
    <Card layer="2" heading="Context">
      {editable ? <Textarea
        onChange={handleContextChange}
        value={context}
        label="Optional context for the one-shot"
        placeholder="This can be background on the party, goals of the ones-shot, suggesting a theme, etc-"
        id="context"
      /> : context}
    </Card>
  </GridArea>;

};
