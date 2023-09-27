"use client";
import { Button, GridArea } from '@components-layout';
import { useSaveData } from '@helper';
import { AiFillSave } from 'react-icons/ai';

type T_Props = {
  gridName: string
};

export const ManageDataLayout: React.FC<T_Props> = ({gridName}) => {
  const {canSave, saveData} = useSaveData();

  return <GridArea name={gridName}>
    <Button onClick={saveData} disabled={!canSave}>Save <AiFillSave size={14} /></Button>
  </GridArea>;
};
