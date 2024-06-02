"use client";

import { FcGoogle } from 'react-icons/fc';
import { FaSignOutAlt } from 'react-icons/fa';

import { Button, GridArea } from '@components-layout';
import { useSignIn } from '@helper';
import React from 'react';

type T_Props = {
  gridName: string
};

export const AccountLayout: React.FC<T_Props> = ({gridName}) => {
  const {
    signInData,
    signInStatus,
    handleSignIn,
    handleSignOut
  } = useSignIn();

  return <GridArea name={gridName} justifySelf='left' alignSelf='end'>
    {signInStatus==='authenticated'
      ? <>
        Welcome{signInData?.user?.name ? `, ${signInData?.user?.name} `:''}
        <Button onClick={handleSignOut}>Sign out <FaSignOutAlt size={14} /></Button>
      </>
      : <Button onClick={handleSignIn}>Sign in with Google <FcGoogle /></Button>
    }
  </GridArea>;
};