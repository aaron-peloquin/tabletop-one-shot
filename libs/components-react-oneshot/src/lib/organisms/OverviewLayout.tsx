import { GridArea, Card } from "@components-layout";
import { useContext } from "react";
import { globalDataContext } from "@static";

type T_Props = {
  gridName: string
};

export const OverviewLayout: React.FC<T_Props> = ({gridName}) => {
  const {overview, overviewError} = useContext(globalDataContext);

  return <GridArea name={gridName} className="full-width">
    {overviewError && <Card layer="1" heading="Error">{overviewError}</Card>}
    {overview && 
      <Card layer="2" heading="Overview Output">
        {overview?.description}
        <Card layer="2" heading="Adventure Hooks">
          <Card layer="3">
            <ul>{overview?.hooks?.map(hook => <li>{hook}</li>)}</ul>
          </Card>
        </Card>
      </Card>
    }
  </GridArea>;

};