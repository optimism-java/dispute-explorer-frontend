import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Index: FC = () => {
  const { gameId } = useParams();
  return <div>GameDetail {gameId}</div>;
};

export default Index;
