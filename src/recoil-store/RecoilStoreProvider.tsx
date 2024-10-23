'use client';

import { RecoilRoot } from 'recoil';

export default function RecoilStoreProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
