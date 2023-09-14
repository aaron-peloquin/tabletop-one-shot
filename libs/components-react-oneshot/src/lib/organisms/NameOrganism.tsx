"use state"
import { Button, GridArea, GridTemplate, Input } from "@components-layout"
import { useRandomName } from '@helper'
import { useCallback, useState } from "react"

export const NameOrganism = () => {
  const [name, setName] = useState('')
  const handleSetName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value)
  }, [])

  const {getName, loading} = useRandomName(setName)

  const handleRandomizeName = useCallback(async () => {
    getName()
  }, [getName])

  return <>
    <Input
      id="name"
      value={name}
      onChange={handleSetName}
      label="One Shot Session Name"
    />
    <Button style={{height:'100%'}} text="Randomize" disabled={loading} onClick={handleRandomizeName} />
  </>

  return <GridTemplate columns={2}>
    <GridArea>
      <Button style={{height:'100%'}} text="Randomize" disabled={loading} onClick={handleRandomizeName} />
    </GridArea>
    <GridArea>
      <Input
        id="name"
        value={name}
        onChange={handleSetName}
        label="Name"
      />
    </GridArea>
  </GridTemplate>
}
