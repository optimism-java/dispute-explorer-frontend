import { Empty } from 'antd';
import { FC, ReactNode } from 'react';

interface GameCardProp {
  header?: ReactNode;
  children: ReactNode;
}

const GameCard: FC<GameCardProp> = ({ header, children }) => {
  return (
    <div className="h-full border px-4 shadow-md">
      {header && <div className="border-b py-2"> {header}</div>}
      {children ?? <Empty />}
    </div>
  );
};

export default GameCard;
