"use client";
import { Button, GridArea, GridTemplate, Label } from '@components-layout';
import { useSaveData } from '@helper';
import { T_SavedDataItem } from '@static';
import { useCallback, useMemo, useState } from 'react';
import { AiFillSave } from 'react-icons/ai';

type T_Props = {
  gridName: string
};

const GRID_TEMPLATE_AREA =`
"save list load ctxt ctxt"
`;

export const ManageDataLayout: React.FC<T_Props> = ({gridName}) => {
  const {canSave, saveData, savedGamesList} = useSaveData();
  const [stagedSave, setStagedSave] = useState<T_SavedDataItem>();
  const handleSageSave = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const sageSave = savedGamesList?.find((save) => save.id === parseInt(event.target.value));
    setStagedSave(sageSave);
  }, [savedGamesList]);

  return <GridArea name={gridName}>
    <GridTemplate columns={5} gridTemplateAreas={GRID_TEMPLATE_AREA}>
      <GridArea name="save">
        <Button onClick={saveData} disabled={!canSave}>Save <AiFillSave size={14} /></Button>
      </GridArea>
      <GridArea name="list">
        <select onChange={handleSageSave}>
          <option value="">Select a saved session...</option>
          {savedGamesList?.map(({id, name}) => <option value={id}>{name}</option>)}
        </select>
      </GridArea>
      <GridArea name="ctxt">
        {stagedSave ? <Label text="Context" htmlFor="load-game-context"><em id="load-game-context">{stagedSave?.context || '(No context)'}</em></Label> : ''}
      </GridArea>
      <GridArea name="load">
        <Button onClick={saveData} disabled={!stagedSave}>Load {stagedSave?.name}</Button>
      </GridArea>
    </GridTemplate>
    
  </GridArea>;
};
