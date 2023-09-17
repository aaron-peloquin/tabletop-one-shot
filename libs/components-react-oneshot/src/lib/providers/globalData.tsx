"use client";

import { Dispatch, PropsWithChildren, SetStateAction, createContext, useMemo, useState } from "react";
import {z} from 'zod';
import { zodSchemaOverview } from '@static';
type T_Overview = z.infer<typeof zodSchemaOverview>;

type T_globalDataContext = {
  name: string
  setName: Dispatch<SetStateAction<string>>
  overview?: T_Overview
  setOverview: Dispatch<SetStateAction<T_Overview>>
};

export const globalDataContext = createContext<T_globalDataContext>({
  name: '',
  setName: () => { return; },
  overview: undefined,
  setOverview: () => { return; },
});

const {Provider} = globalDataContext;

export const GlobalDataProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [name, setName] = useState('');
  const [overview, setOverview] = useState<T_Overview>();

  const value = useMemo(() => ({
    name, setName,
    overview, setOverview
  }), [name, overview]);

  return <Provider value={value}>{children}</Provider>;
};