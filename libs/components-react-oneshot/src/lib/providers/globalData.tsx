"use client"

import { Dispatch, PropsWithChildren, SetStateAction, createContext, useMemo, useState } from "react"

type T_globalDataContext = {
  name: string
  setName: Dispatch<SetStateAction<string>>
  overview: string
  setOverview: Dispatch<SetStateAction<string>>
}

export const globalDataContext = createContext<T_globalDataContext>({
  name: '',
  setName: () => { return },
  overview: '',
  setOverview: () => { return },
})

const {Provider} = globalDataContext

export const GlobalDataProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [name, setName] = useState('')
  const [overview, setOverview] = useState('')

  const value = useMemo(() => ({
    name, setName,
    overview, setOverview
  }), [name, overview])

  return <Provider value={value}>{children}</Provider>
}