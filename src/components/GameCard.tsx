import { Empty } from 'antd';
import { FC, ReactNode } from 'react';

interface GameCardProp {
  header?: ReactNode;
  children: ReactNode;
}

const GameCard: FC<GameCardProp> = ({ header, children }) => {
  return (
    <div>
      {header && <div> {header}</div>}
      {children ?? <Empty />}
    </div>
  );
};

export default GameCard;
