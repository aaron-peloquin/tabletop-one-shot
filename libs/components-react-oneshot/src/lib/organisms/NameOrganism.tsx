import { Button, GridArea, GridTemplate, Input } from "@components-layout";
import { useRandomName } from '@helper';
import { useCallback, useContext } from "react";
import { globalDataContext } from "../providers/globalData";

export const NameOrganism = () => {
  const {name, setName} = useContext(globalDataContext);
  const handleSetName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value);
  }, [setName]);

  const {getName, nameLoading} = useRandomName(setName);

  const handleRandomizeName = useCallback(async () => {
    getName();
  }, [getName]);

  return <GridTemplate columns={2}>
    <GridArea>
      <Input
        id="name"
        value={name}
        onChange={handleSetName}
        label="One Shot Session Name"
      />
    </GridArea>
    <GridArea justifySelf="center" alignSelf="end">
      <Button text="Random Name" disabled={nameLoading} onClick={handleRandomizeName} />
    </GridArea>
  </GridTemplate>;
};
