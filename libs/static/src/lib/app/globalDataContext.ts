"use client";
import {Dispatch, SetStateAction, createContext} from "react";
import {z} from 'zod';
import {zodSchemaOverview} from "./zodSchemaOverview";

export type T_Overview = z.infer<typeof zodSchemaOverview> | null;
export type T_ChatHistory = {
  role: 'human'|'ai'
  message: string
}[];

export type T_SavedDataItem = {
  id: number
  name: string
  context: string
};


type T_globalDataContext = {
  name: string
  setName: (name: string) => void
  saveId: number
  setSaveId: Dispatch<SetStateAction<number>>
  savedSuccessful: boolean|null
  setSavedSuccessful: Dispatch<SetStateAction<boolean|null>>
  context: string
  setContext: (context: string) => void
  overview: T_Overview
  setOverview: (overview: T_Overview) => void
  clearOverview: () => void
  overviewError: string
  setOverviewError: Dispatch<SetStateAction<string>>
  history: T_ChatHistory
  setHistory: (history: T_ChatHistory) => void
  clearHistory: () => void
};

export const globalDataContext = createContext<T_globalDataContext>({
  name: '',
  setName: () => { return; },
  saveId: 0,
  setSaveId: () => { return; },
  context: '',
  setContext: () => { return; },
  savedSuccessful: null,
  setSavedSuccessful: () => { return; },
  history: [],
  setHistory: () => { return; },
  clearHistory: () => { return; },
  overview: null,
  setOverview: () => { return; },
  clearOverview: () => { return; },
  overviewError: '',
  setOverviewError: () => { return; },
});

