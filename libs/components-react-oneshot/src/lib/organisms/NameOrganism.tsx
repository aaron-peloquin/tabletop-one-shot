"use state"
import { Button, GridArea, GridTemplate, Input } from "@components-layout"
import { useRandomName } from '@helper'
import { useCallback, useState } from "react"

export const NameOrganism = () => {
  const [name, setName] = useState('The Harbinger of Shadow')
  const handleSetName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value)
  }, [])

  const getRandomName = useRandomName()

  const handleRandomizeName = useCallback(async () => {
    const newName = await getRandomName()
    console.log({newName})
    setName(newName)
  }, [getRandomName])

  return <GridTemplate columns={2}>
    <GridArea>
      <Button text="Randomize" onClick={handleRandomizeName} />
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
