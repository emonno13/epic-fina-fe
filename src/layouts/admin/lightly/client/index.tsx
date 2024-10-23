import dynamic from 'next/dynamic';

export const  LightlyClientLayout = dynamic(
  () => import('./view'),
  { ssr: false },
);

export const LightlyClientLayoutForDocPage = dynamic(
  () => import('./view-for-doc-page'),
  { ssr: false },
);

export const LightlyClientLayoutProfile = dynamic(
  () => import('./profile'),
  { ssr: false },
);
