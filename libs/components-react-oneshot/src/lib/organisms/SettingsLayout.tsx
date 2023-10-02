"use client";
import React from 'react';
import { GridArea, Input, Select, Card, GridTemplate, Button } from "@components-layout";
import { useRandomName } from '@helper';
import { globalDataContext } from "@static";
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
  const {getName, nameLoading} = useRandomName();

  const handlePartyLevel = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setPartyLevel(event.target.value);
  }, [setPartyLevel]);

  return <GridArea className="full-width" name={gridName}>
    <Card layer="2" heading="Settings">
      <GridTemplate columns={4}>
        <GridArea>
          <Input
            id="name"
            value={name}
            onChange={handleSetName}
            label="One Shot Session Name"
            autoComplete="off"
          />
        </GridArea>
        <GridArea justifySelf="center" alignSelf="end">
          <Button text="Generate Random Name" disabled={nameLoading} onClick={getName} />
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
