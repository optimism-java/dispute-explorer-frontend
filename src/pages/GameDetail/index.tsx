import { FC } from 'react';
import { useParams } from 'react-router-dom';
import useClaimData from '../../hooks/useClaimData';

const Index: FC = () => {
  const { gameId } = useParams();
  const state = useClaimData(gameId || '');
  return <div>GameDetail {JSON.stringify(state.value)}</div>;
};

export default Index;
