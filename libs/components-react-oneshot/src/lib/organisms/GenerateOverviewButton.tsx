import { GridArea, Card, Button } from "@components-layout";
import { useGenerateOverview } from "@helper";
import { useContext, useCallback } from "react";
import { globalDataContext } from "@static";
import React from "react";

type T_Props = {
  gridName: string
};

export const GenerateOverviewButton: React.FC<T_Props> = ({gridName}) => {
  const {overview, name, clearOverview} = useContext(globalDataContext);
  const {generateOverview, overviewLoading} = useGenerateOverview();
  
  const handleGenerateOverview = useCallback(() => {
    generateOverview();
  }, [generateOverview]);
  
  const disabled = !name || overviewLoading;

  return <GridArea className='full-width' name={gridName}>
    {overview
      ? <Button style={{fontWeight:'bold', color: '#694834'}} text="Clear Data" onClick={clearOverview} />
      : <Button style={{fontWeight:'bold', color: '#586'}} text="Generate Session Overview" disabled={disabled} onClick={handleGenerateOverview} />}
  </GridArea>;

};