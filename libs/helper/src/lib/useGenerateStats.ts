"use client";
import { zodSchemaStats } from "@static";
import { useCallback, useState } from "react";
import { z } from "zod";

export type T_Stats = z.infer<typeof zodSchemaStats> | null;

type T_Sig = (hookArgs: {
  name: string
  physicalDescription: string
  challengeRating: number
  classification: string
}) => {
  generateStats: () => Promise<void>
  loadingStats: boolean
  stats: T_Stats
};

export const useGenerateStats: T_Sig = ({name, physicalDescription, challengeRating, classification}) => {
  const [loadingStats, setLoadingStats] = useState(false);
  const [stats, setStats] = useState<T_Stats>(null);

  const generateStats = useCallback(async () => {
    setLoadingStats(true);
    const body = JSON.stringify({name, physicalDescription, challengeRating, classification});
    fetch('/api/llm/stats', {
      method: 'POST',
      body,
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(({message, error})=>{
        if(message) {
          setStats(message);
        }
        setLoadingStats(false);
      });
  }, [setStats]);

  return {
    generateStats,
    loadingStats,
    stats
  };
};
