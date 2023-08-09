import { TButtonProps } from './types';

export default function Button({ children, onClick, className }: TButtonProps) {
  return (
    <button
      className={`py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
