"use client";
import {HomeTemplate} from '@components-react-oneshot';
import {SessionProvider} from "next-auth/react";

export default async function Index() {
  return <SessionProvider>
    <HomeTemplate />
  </SessionProvider>;
}
