"use client";
import { useCallback } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { signIn } from "next-auth/react";
import { signOut, useSession } from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc';
import { FaSignOutAlt } from 'react-icons/fa';

import { Button, GridArea } from '@components-layout';

type T_Props = {
  gridName: string
};

export const AccountLayout: React.FC<T_Props> = ({gridName}) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const handleSignIn = useCallback(() => {
    return signIn("google", { callbackUrl });
  }, [callbackUrl]);
  const {status, data} = useSession();
  
  return <GridArea name={gridName} justifySelf='left'>
    {status==='authenticated'
      ? <>
        Welcome{data?.user?.name ? `, ${data?.user?.name} `:''}
        <Button onClick={signOut}>Sign out <FaSignOutAlt size={14} /></Button>
      </>
      : <Button onClick={handleSignIn}>Sign in with Google <FcGoogle /></Button>
    }
  </GridArea>;
};