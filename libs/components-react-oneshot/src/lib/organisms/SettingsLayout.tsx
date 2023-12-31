"use client";
import React from 'react';
import { GridArea, Input, Select, Card, GridTemplate, Button } from "@components-layout";
import { useGenerateName } from '@helper';
import { globalDataContext, IdleIcon, LoadingIcon, SuccessIcon } from "@static";
import { useCallback, useContext } from "react";
import { GenerateOverviewButton } from "./GenerateOverviewButton";

type T_Props = {
  gridName: string
};

export const SettingsLayout: React.FC<T_Props> = ({gridName}) => {
  const {name, setName, overview, partyLevel, setPartyLevel} = useContext(globalDataContext);
  const handleSetName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value);
  }, [setName]);
  const {getName, nameLoading, nameStatus} = useGenerateName();

  const handlePartyLevel = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setPartyLevel(event.target.value);
  }, [setPartyLevel]);

  return <GridArea className="full-width" name={gridName}>
    <Card layer="2" heading="Settings">
      <GridArea>
        <Input
          id="name"
          value={name}
          disabled={nameLoading}
          onChange={handleSetName}
          label="One Shot Session Name"
          autoComplete="off"
        />
      </GridArea>
      <br />
      <GridTemplate columns={3}>
        <GridArea justifySelf="center" alignSelf="end">
          <Button disabled={nameLoading} onClick={getName}>Random Name</Button>
          {nameStatus ==='loading'
            ? <LoadingIcon />
            : nameStatus==='success'
              ? <SuccessIcon />
              : <IdleIcon />}
        </GridArea>
        <GridArea>
          <Select onChange={handlePartyLevel} value={partyLevel} disabled={!!overview} label="Party Level" id="party-level-descriptor">
            <option value="low">Low Level</option>
            <option value="mid">Mid Level</option>
            <option value="high">High Level</option>
          </Select>
        </GridArea>
        <GridArea justifySelf="center" alignSelf="end">
          <GenerateOverviewButton gridName="" />
        </GridArea>
      </GridTemplate>
    </Card>
  </GridArea>;
};
