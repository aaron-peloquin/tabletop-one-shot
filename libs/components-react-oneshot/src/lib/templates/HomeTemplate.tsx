"use client";
import { Card, GridArea, GridTemplate } from "@components-layout";
import { SettingsLayout } from '../organisms/SettingsLayout';
import { OverviewLayout } from '../organisms/OverviewLayout';
import { GlobalDataProvider } from "../providers/globalData";
import { GenerateOverviewButton } from "../organisms/GenerateOverviewButton";

const GRID_TEMPLATE_AREA =`
"name____ generate"
"overview overview"
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
        <SettingsLayout gridName="name____" />
        <GenerateOverviewButton gridName="generate" />
        <OverviewLayout gridName="overview" />
      </GridTemplate>
    </Card>
  </GlobalDataProvider>;
};
