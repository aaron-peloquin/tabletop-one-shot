"use client";
import {Dispatch, SetStateAction, createContext} from "react";
import {z} from 'zod';
import {zodSchemaOverview} from "./zodSchemaOverview";

export type T_Overview = z.infer<typeof zodSchemaOverview> | null;
export type T_ChatHistory = {
  role: 'human'|'ai'
  message: string
}[];

type T_globalDataContext = {
  name: string
  setName: Dispatch<SetStateAction<string>>
  context: string
  setContext: Dispatch<SetStateAction<string>>
  history: T_ChatHistory
  setHistory: Dispatch<SetStateAction<T_ChatHistory>>
  clearHistory: () => void
  overview: T_Overview
  setOverview: Dispatch<SetStateAction<T_Overview>>
  clearOverview: () => void
  overviewError: string
  setOverviewError: Dispatch<SetStateAction<string>>
};

export const globalDataContext = createContext<T_globalDataContext>({
  name: '',
  setName: () => { return; },
  context: '',
  setContext: () => { return; },
  history: [],
  setHistory: () => { return; },
  clearHistory: () => { return; },
  overview: null,
  setOverview: () => { return; },
  clearOverview: () => { return; },
  overviewError: '',
  setOverviewError: () => { return; },
});

