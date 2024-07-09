import { Empty } from 'antd';
import { FC, ReactNode } from 'react';

interface GameCardProp {
  header?: ReactNode;
  children: ReactNode;
}

const GameCard: FC<GameCardProp> = ({ header, children }) => {
  return (
    <div className="h-full rounded-lg border p-6 px-4 shadow-md">
      {header && <div className="border-b"> {header}</div>}
      {children ?? <Empty />}
    </div>
  );
};

export default GameCard;
