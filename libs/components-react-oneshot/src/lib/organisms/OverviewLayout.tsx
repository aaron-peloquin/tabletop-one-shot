import React from 'react';
import { GridArea, Card } from "@components-layout";
import { useContext } from "react";
import { globalDataContext } from "@static";

type T_Props = {
  gridName: string
};

export const OverviewLayout: React.FC<T_Props> = ({gridName}) => {
  const {overview, overviewError} = useContext(globalDataContext);
  console.log('==overviewError==', overviewError);

  return <GridArea name={gridName} className="full-width">
    {overviewError && <Card layer="1" heading="Error">{overviewError}</Card>}
    {overview?.description && 
      <Card layer="2" heading="Overview Output">
        {overview?.description}
        {overview?.hooks?.length && <Card layer="2" heading="Adventure Hooks">
          <Card layer="3">
            <ul>{overview?.hooks?.map(hook => <li>{hook}</li>)}</ul>
          </Card>
        </Card>}
        {overview?.resolutions?.length && <Card layer="2" heading="Possible Resolutions">
          <Card layer="3">
            <ul>{overview?.resolutions?.map(resolution => <li>{resolution}</li>)}</ul>
          </Card>
        </Card>}
      </Card>
    }
  </GridArea>;

};