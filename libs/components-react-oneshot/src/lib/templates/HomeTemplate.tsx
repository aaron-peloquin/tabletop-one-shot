"use client";
import { Card, GridTemplate } from "@components-layout";
import { SettingsLayout } from '../organisms/SettingsLayout';
import { OverviewLayout } from '../organisms/OverviewLayout';
import { GlobalDataProvider } from "../providers/globalData";
import { GenerateOverviewButton } from "../organisms/GenerateOverviewButton";
import { EncountersLayout } from "../organisms/EncountersLayout";
import { ContextLayout } from "../organisms/ContextLayout";
import { ChatLayout } from "../organisms/ChatLayout";
import { LoginLayout } from '../organisms/LoginLayout';

const GRID_TEMPLATE_AREA =`
"login_____ __________ __________ __________"
"name______ generate__ overview__ overview__"
"context___ context___ overview__ overview__"
"encounters encounters encounters encounters"
"chat______ chat______ chat______ chat______"
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
        <LoginLayout gridName="login_____" />
        <SettingsLayout gridName="name______" />
        <ContextLayout gridName="context___" />
        <GenerateOverviewButton gridName="generate__" />
        <OverviewLayout gridName="overview__" />
        <EncountersLayout gridName="encounters" />
        <ChatLayout gridName="chat______" />
      </GridTemplate>
    </Card>
  </GlobalDataProvider>;
};
