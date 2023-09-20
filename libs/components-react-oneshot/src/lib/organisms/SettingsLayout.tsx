"use client";
import { Button, Card, GridArea, GridTemplate, Input } from "@components-layout";
import { useRandomName } from '@helper';
import { globalDataContext } from "@static";
import { useCallback, useContext } from "react";

type T_Props = {
  gridName: string
};

export const SettingsLayout: React.FC<T_Props> = ({gridName}) => {
  const {name, setName} = useContext(globalDataContext);
  const handleSetName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value);
  }, [setName]);
  const {getName, nameLoading} = useRandomName(setName);

  return <GridArea className="full-width" name={gridName}>
    <Card layer="2" heading="Settings">
      <GridTemplate columns={2}>
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
          <Button text="Random Name" disabled={nameLoading} onClick={getName} />
        </GridArea>
      </GridTemplate>
    </Card>
  </GridArea>;
};
