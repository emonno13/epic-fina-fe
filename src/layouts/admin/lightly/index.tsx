import dynamic from 'next/dynamic';

export const  LightlyAdminLayout = dynamic(
  () => import('./view'),
  { ssr: false },
);
