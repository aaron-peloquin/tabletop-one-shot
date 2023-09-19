"use client";
import { Card, GridArea, GridTemplate } from "@components-layout";
import { SettingsLayout } from '../organisms/SettingsLayout';
import { OverviewLayout } from '../organisms/OverviewLayout';
import { GlobalDataProvider } from "../providers/globalData";
import { GenerateOverviewButton } from "../organisms/GenerateOverviewButton";
import { EncountersLayout } from "../organisms/EncountersLayout";
import { ContextLayout } from "../organisms/ContextLayout";

const GRID_TEMPLATE_AREA =`
"name______ generate__ overview__ overview__"
"context___ context___ overview__ overview__"
"encounters encounters encounters encounters"
`;

export const HomeTemplate = () => {
  return <GlobalDataProvider>
    <Card layer="1" heading="Quickshot">
      <GridTemplate
        gridTemplateAreas={GRID_TEMPLATE_AREA}
        justifyItems="center"
        textAlign='left'
        columns={4}
      >
        <SettingsLayout gridName="name______" />
        <ContextLayout gridName="context___" />
        <GenerateOverviewButton gridName="generate__" />
        <OverviewLayout gridName="overview__" />
        <EncountersLayout gridName="encounters" />
      </GridTemplate>
    </Card>
  </GlobalDataProvider>;
};
