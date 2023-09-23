"use client";
import { Button, GridArea } from '@components-layout';
import { useSession } from 'next-auth/react';
import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

type T_Props = {
  gridName: string
};

export const ManageDataLayout: React.FC<T_Props> = ({gridName}) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const {status, data} = useSession();
  
  return <GridArea name={gridName}>
    {status==='authenticated'
      ? <>Welcome {data.user?.name}</>
      : <Button onClick={() => signIn("google", { callbackUrl })}>Sign in with Google <FcGoogle /></Button>
    }
  </GridArea>;
};