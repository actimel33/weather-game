import { memo } from 'react';
import { TButtonProps } from './types';

const Button = ({ children, onClick, className }: TButtonProps) => {
  return (
    <button
      className={`py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
