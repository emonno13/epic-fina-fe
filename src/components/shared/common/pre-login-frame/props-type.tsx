import { ReactNode } from 'react';

export interface LoginFrameLogoProps {
  extraContent?: ReactNode;
}

export interface PreLoginFrameProps {
  children?: ReactNode;
  leftSidePhoto?: string;
  footer?: ReactNode;
  header?: ReactNode;
  className?: string;
}

