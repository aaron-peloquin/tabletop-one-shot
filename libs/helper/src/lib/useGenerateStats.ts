"use client";
import { zodSchemaStats } from "@static";
import { useCallback, useState } from "react";
import { z } from "zod";

export type T_Stats = z.infer<typeof zodSchemaStats> & { rolledInitiative: number } | null;

type T_Sig = (hookArgs: {
  name: string
  description: string
  cr: string,
  classification: string
}) => {
  generateStats: () => Promise<void>
  loadingStats: boolean
  stats: T_Stats
};

export const useGenerateStats: T_Sig = ({name, description, cr, classification}) => {
  const [loadingStats, setLoadingStats] = useState(false);
  const [stats, setStats] = useState<T_Stats>(null);

  const generateStats = useCallback(async () => {
    setLoadingStats(true);
    const body = JSON.stringify({name, description, cr, classification});
    fetch('/api/llm/stats', {
      method: 'POST',
      body,
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(({message})=>{
        if(message) {
          setStats({
            ...message,
            rolledInitiative: Math.floor( Math.random() * 20 ) + 1,
          });
        }
        setLoadingStats(false);
      }).catch(error => {
        setLoadingStats(false);
      });
  }, [setStats]);

  return {
    generateStats,
    loadingStats,
    stats
  };
};
