"use client";
import { Button, GridArea, GridTemplate, Label } from '@components-layout';
import { useSaveData } from '@helper';
import { globalDataContext } from '@static';
import { useContext } from 'react';
import { AiFillSave } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';

type T_Props = {
  gridName: string
};

const GRID_TEMPLATE_AREA =`
"save list load ctxt ctxt"
`;

export const ManageDataLayout: React.FC<T_Props> = ({gridName}) => {
  const {savedSuccessful, saveId} = useContext(globalDataContext);
  const {
    canSave,
    handleSageSave,
    loadData,
    saveData,
    savedDataList,
    stagedSave,
  } = useSaveData();

  return <GridArea name={gridName}>
    <GridTemplate columns={5} gridTemplateAreas={GRID_TEMPLATE_AREA}>
      <GridArea name="save">
        <Button onClick={saveData} disabled={!canSave}>{saveId?'Overwrite':'Save'} <AiFillSave size={14} /></Button>
        {savedSuccessful?<FaCheckCircle color="green" />: <FaCheckCircle color="grey" />}
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
