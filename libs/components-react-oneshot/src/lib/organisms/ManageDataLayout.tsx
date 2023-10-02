"use client";
import React from 'react';
import { Button, GridArea, GridTemplate, Label, Select } from '@components-layout';
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
    <GridTemplate columns={5} gridTemplateAreas={GRID_TEMPLATE_AREA} alignItems='end'>
      <GridArea name="save">
        <Button onClick={saveData} disabled={!canSave}>{saveId?'Overwrite':'Save'} <AiFillSave size={14} /></Button>
        <FaCheckCircle color={savedSuccessful?"green":"grey"} />
      </GridArea>
      <GridArea name="list">
        <Select onChange={handleSageSave} label="Select Save" id="select-saved-session">
          <option value="">Select a saved session...</option>
          {savedDataList?.map(({id, name}) => <option key={`save-id-${id}`} value={id}>{name}</option>)}
        </Select>
      </GridArea>
      <GridArea name="ctxt">
        {stagedSave ? <Label text="Context" htmlFor="staged-save-context"><em id="staged-save-context">{stagedSave?.context || '(No context)'}</em></Label> : ''}
      </GridArea>
      <GridArea name="load">
        <Button onClick={loadData} disabled={!stagedSave}>Load {stagedSave?.name}</Button>
      </GridArea>
    </GridTemplate>
    
  </GridArea>;
};
