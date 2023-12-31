"use client";
import React from 'react';
import { Button, GridArea, GridTemplate, Label, Select } from '@components-layout';
import { useSaveData } from '@helper';
import { IdleIcon, LoadingIcon, SuccessIcon, globalDataContext } from '@static';
import { useContext } from 'react';
import { AiFillSave } from 'react-icons/ai';

type T_Props = {
  gridName: string
};

const GRID_TEMPLATE_AREA =`
"save list load"
"ctxt ctxt ctxt"
`;

export const ManageDataLayout: React.FC<T_Props> = ({gridName}) => {
  const {savedSuccessful, saveId} = useContext(globalDataContext);
  const {
    canSave,
    handleSageSave,
    loadData,
    saveData,
    somethingIsLoading,
    savedDataList,
    stagedSave,
  } = useSaveData();

  return <GridArea name={gridName}>
    <GridTemplate columns={3} gridTemplateAreas={GRID_TEMPLATE_AREA} alignItems='end'>
      <GridArea name="save">
        <Button onClick={saveData} disabled={!canSave}>{saveId?'Overwrite':'Save (excluding stats)'} <AiFillSave size={14} /></Button>
        {somethingIsLoading
          ? <LoadingIcon />
          : savedSuccessful
            ? <SuccessIcon />
            : <IdleIcon />}
      </GridArea>
      <GridArea name="list">
        <Select value={stagedSave?.id || ''} onChange={handleSageSave} label="Select Save" id="select-saved-session">
          <option value="">Select a saved session...</option>
          {savedDataList?.map(({id, name}) => <option key={`save-id-${id}`} value={id}>{name}</option>)}
        </Select>
      </GridArea>
      <GridArea name="ctxt">
        {stagedSave ? <Label text={`Context from ${stagedSave.name}`} htmlFor="staged-save-context"><em id="staged-save-context">{stagedSave?.context || '(No context given)'}</em></Label> : ''}
      </GridArea>
      <GridArea name="load">
        <Button onClick={loadData} disabled={!stagedSave}>Load</Button>
      </GridArea>
    </GridTemplate>
    
  </GridArea>;
};
