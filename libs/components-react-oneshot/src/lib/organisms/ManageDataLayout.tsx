"use client";
import { Button, GridArea, GridTemplate, Label } from '@components-layout';
import { useSaveData } from '@helper';
import { AiFillSave } from 'react-icons/ai';

type T_Props = {
  gridName: string
};

const GRID_TEMPLATE_AREA =`
"save list load ctxt ctxt"
`;

export const ManageDataLayout: React.FC<T_Props> = ({gridName}) => {
  const {
    canSave,
    handleSageSave,
    loadData,
    saveData,
    savedSuccessful,
    savedDataList,
    stagedSave,

  } = useSaveData();

  return <GridArea name={gridName}>
    <GridTemplate columns={5} gridTemplateAreas={GRID_TEMPLATE_AREA}>
      <GridArea name="save">
        <Button onClick={saveData} disabled={!canSave}>Save <AiFillSave size={14} /></Button>
      </GridArea>
      <GridArea name="list">
        <select onChange={handleSageSave}>
          <option value="">Select a saved session...</option>
          {savedDataList?.map(({id, name}) => <option value={id}>{name}</option>)}
        </select>
      </GridArea>
      <GridArea name="ctxt">
        {stagedSave ? <Label text="Context" htmlFor="load-game-context"><em id="load-game-context">{stagedSave?.context || '(No context)'}</em></Label> : ''}
      </GridArea>
      <GridArea name="load">
        <Button onClick={loadData} disabled={!stagedSave}>Load {stagedSave?.name}</Button>
      </GridArea>
    </GridTemplate>
    
  </GridArea>;
};
