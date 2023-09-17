"use client";
import { Card, GridArea, GridTemplate } from "@components-layout";
import { NameOrganism } from '../organisms/NameOrganism';
import { OverviewOrganism } from '../organisms/OverviewOrganism';
import { GlobalDataProvider } from "../providers/globalData";

const GRID_TEMPLATE_AREA =`
"oneshot_name______ prompt_overview___"
"generated_overview generated_overview"
`;

export const HomeTemplate = () => {
  return <GlobalDataProvider>
    <Card layer="1" heading="Quickshot">
      <GridTemplate
        gridTemplateAreas={GRID_TEMPLATE_AREA}
        justifyItems="center"
        textAlign='left'
        columns={2}
      >
        <GridArea name="oneshot_name______" className="full-width">
          <Card layer="2">
            <NameOrganism />
          </Card>
        </GridArea>
        <OverviewOrganism
          gridNameInput="prompt_overview___" // corresponding to GRID_TEMPLATE_AREA
          gridNameOutput="generated_overview" // corresponding to GRID_TEMPLATE_AREA
        />
      </GridTemplate>
    </Card>
  </GlobalDataProvider>;
};
