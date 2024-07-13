import { FC, ReactNode } from 'react';

const DigWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <span className="font-dogica text-sm">{children}</span>;
};

export default DigWrapper;
