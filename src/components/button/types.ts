import { PropsWithChildren } from 'react';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export type TButtonProps = IButtonProps & PropsWithChildren;
