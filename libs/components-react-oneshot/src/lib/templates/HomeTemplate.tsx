"use client";
import { Card, GridTemplate } from "@components-layout";
import { SettingsLayout } from '../organisms/SettingsLayout';
import { OverviewLayout } from '../organisms/OverviewLayout';
import { GlobalDataProvider } from "../providers/GlobalDataProvider";
import { GenerateOverviewButton } from "../organisms/GenerateOverviewButton";
import { EncountersLayout } from "../organisms/EncountersLayout";
import { ContextLayout } from "../organisms/ContextLayout";
import { ChatLayout } from "../organisms/ChatLayout";
import { AccountLayout } from '../organisms/AccountLayout';
import { ManageDataLayout } from "../organisms/ManageDataLayout";

const GRID_TEMPLATE_AREA =`
"login_____ save_load_ save_load_ save_load_"
"name______ generate__ chat______ chat______"
"context___ context___ chat______ chat______"
"overview__ overview__ chat______ chat______"
"encounters encounters chat______ chat______"
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
        <AccountLayout gridName="login_____" />
        <ManageDataLayout gridName="save_load_" />
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
