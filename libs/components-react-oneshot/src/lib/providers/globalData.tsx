"use client";

import { Dispatch, PropsWithChildren, SetStateAction, createContext, useMemo, useState } from "react";
import {z} from 'zod';
import { zodSchemaOverview } from '@static';
export type T_Overview = z.infer<typeof zodSchemaOverview> | null;

type T_globalDataContext = {
  name: string
  setName: Dispatch<SetStateAction<string>>
  overview: T_Overview
  setOverview: Dispatch<SetStateAction<T_Overview>>
};

export const globalDataContext = createContext<T_globalDataContext>({
  name: '',
  setName: () => { return; },
  overview: null,
  setOverview: () => { return; },
});

const {Provider} = globalDataContext;

export const GlobalDataProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [name, setName] = useState('');
  const [overview, setOverview] = useState<T_Overview>(null);

  const value = useMemo(() => ({
    name, setName,
    overview, setOverview
  }), [name, overview]);

  return <Provider value={value}>{children}</Provider>;
};

/**
Type '{ name: string; setName: Dispatch<SetStateAction<string>>; overview: { description: string; hooks: string[]; encounters: { description: string; name: string; areaDescription: string; purpose: string; NPCs: { ...; }[]; }[]; } | undefined; setOverview: Dispatch<...>; }' is not assignable to type 'T_globalDataContext'.
Types of property 'setOverview' are incompatible.

T_globalDataContext


 */