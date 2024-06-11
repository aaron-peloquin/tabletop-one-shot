"use client";
import { signIn } from "next-auth/react";
import { useCallback, useMemo } from 'react';
import { signOut, useSession } from 'next-auth/react';

import { useSearchParams } from 'next/navigation';

export const useSignIn = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const handleSignIn = useCallback(() => {
    return signIn("google", { callbackUrl });
  }, [callbackUrl]);
  const {status, data} = useSession();

  const signInObj = useMemo(() => ({
    signInData: data,
    signInStatus: status,
    handleSignIn,
    handleSignOut: signOut
  }), []);
  return signInObj;  
};
