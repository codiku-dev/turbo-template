import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(p: ButtonProps) {
  return (
    <button
      {...p}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded cursor-pointer transition-colors ${p.className || ''}`}
    >
      {p.children}
    </button>
  );
}
