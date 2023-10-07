"use client";
import { URLs, zodSchemaStats } from "@static";
import { useCallback, useState } from "react";
import { z } from "zod";
import { useNetworkOperation } from "./useNetworkOperation";

export type T_Stats = z.infer<typeof zodSchemaStats> & { rolledInitiative: number } | null;

type T_Sig = (hookArgs: {
  name: string
  description: string
  cr: string,
  classification: string
}) => {
  generateStats: () => Promise<void>
  statsStatus: string
  stats: T_Stats
};

export const useGenerateStats: T_Sig = ({name, description, cr, classification}) => {
  const [stats, setStats] = useState<T_Stats>(null);
  const onSuccess = useCallback((message: T_Stats) => {
    if(message) {
      setStats({
        ...message,
        rolledInitiative: Math.floor( Math.random() * 20 ) + 1,
      });
    }
  }, []);
  const {status, run} = useNetworkOperation(URLs.api.stats, onSuccess);


  const generateStats = useCallback(async () => {
    const body = JSON.stringify({name, description, cr, classification});
    run(body);
  }, [setStats]);

  return {
    generateStats,
    statsStatus: status,
    stats
  };
};
