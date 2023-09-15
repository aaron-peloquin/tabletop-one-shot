import { Button, Input } from "@components-layout"
import { useRandomName } from '@helper'
import { useCallback, useContext } from "react"
import { globalDataContext } from "../providers/globalData"

export const NameOrganism = () => {
  const {name, setName} = useContext(globalDataContext)
  const handleSetName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value)
  }, [])

  const {getName, nameLoading} = useRandomName(setName)

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
    <Button style={{height:'100%'}} text="Randomize" disabled={nameLoading} onClick={handleRandomizeName} />
  </>
}
