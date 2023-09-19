"use client";

import { Dispatch, PropsWithChildren, SetStateAction, createContext, useMemo, useState } from "react";
import {z} from 'zod';
import { zodSchemaOverview } from '@static';
export type T_Overview = z.infer<typeof zodSchemaOverview> | null;

type T_globalDataContext = {
  name: string
  setName: Dispatch<SetStateAction<string>>
  context: string
  setContext: Dispatch<SetStateAction<string>>
  overview: T_Overview
  setOverview: Dispatch<SetStateAction<T_Overview>>
  overviewError: string
  setOverviewError: Dispatch<SetStateAction<string>>
};

export const globalDataContext = createContext<T_globalDataContext>({
  name: '',
  setName: () => { return; },
  context: '',
  setContext: () => { return; },
  overview: null,
  setOverview: () => { return; },
  overviewError: '',
  setOverviewError: () => { return; },
});

const {Provider} = globalDataContext;

export const GlobalDataProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [name, setName] = useState('');
  const [context, setContext] = useState('');
  const [overview, setOverview] = useState<T_Overview>(null);
  const [overviewError, setOverviewError] = useState('');

  const value = useMemo(() => ({
    name, setName,
    context, setContext,
    overview, setOverview,
    overviewError, setOverviewError
  }), [context, name, overview, overviewError]);

  return <Provider value={value}>{children}</Provider>;
};
