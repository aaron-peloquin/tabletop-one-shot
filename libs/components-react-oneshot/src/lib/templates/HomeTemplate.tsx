"use client";
import React from 'react';
import { Card, GridTemplate } from "@components-layout";
import { SettingsLayout } from '../organisms/SettingsLayout';
import { OverviewLayout } from '../organisms/OverviewLayout';
import { GlobalDataProvider } from "../providers/GlobalDataProvider";
import { EncountersLayout } from "../organisms/EncountersLayout";
import { ContextLayout } from "../organisms/ContextLayout";
import { ChatLayout } from "../organisms/ChatLayout";
import { AccountLayout } from '../organisms/AccountLayout';
import { ManageDataLayout } from "../organisms/ManageDataLayout";
import { Suspense } from "react";

export const HomeTemplate = () => {
  return <GlobalDataProvider>
    <Card layer="1" heading="Quickshot: A TTRPG Session Generator">
      <GridTemplate
        id="mainTemplate"
        justifyItems="center"
        textAlign='left'
      >
        <Suspense>
          <AccountLayout gridName="login_____" />
        </Suspense>
        <ManageDataLayout gridName="save_load_" />
        <SettingsLayout gridName="settings__" />
        <ContextLayout gridName="context___" />
        <OverviewLayout gridName="overview__" />
        <EncountersLayout gridName="encounters" />
        <ChatLayout gridName="chat______" />
      </GridTemplate>
    </Card>
  </GlobalDataProvider>;
};
