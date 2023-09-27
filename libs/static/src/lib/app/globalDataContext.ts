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
  saveId: number
  setSaveId: Dispatch<SetStateAction<number>>
  context: string
  setContext: Dispatch<SetStateAction<string>>
  overview: T_Overview
  setOverview: Dispatch<SetStateAction<T_Overview>>
  clearOverview: () => void
  overviewError: string
  setOverviewError: Dispatch<SetStateAction<string>>
  history: T_ChatHistory
  setHistory: Dispatch<SetStateAction<T_ChatHistory>>
  clearHistory: () => void
};

export const globalDataContext = createContext<T_globalDataContext>({
  name: '',
  setName: () => { return; },
  saveId: 0,
  setSaveId: () => { return; },
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

