import NotStartedIcon from '@mui/icons-material/NotStarted';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { Box, Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useClaimData from '../../hooks/useClaimData';
import { transform } from '../../hooks/useGameData';
import type { ClaimData } from '../../lib/types';
import ClaimDataTable from './ClaimDataTable';
import GameGraph from './GameGraph';

const Index: FC = () => {
  const { gameId } = useParams();
  const state = useClaimData(gameId || '');
  const claimData = state.value as ClaimData[];
  const gameData = transform(claimData || []);
  const [upTo, setUpTo] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (gameData && upTo === 0) setUpTo(gameData?.numClaims);

    if (gameData && playing) {
      const interval = setInterval(() => {
        const upToNext = upTo + 1;
        setUpTo(Number(upToNext) > Number(gameData.numClaims) ? 1 : upToNext);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameData, playing]);
  return (
    <Stack gap={4}>
      <Box>
        <Box
          onClick={() => setPlaying(!playing)}
          sx={{ color: 'primary.main', height: 96, position: 'absolute' }}
        >
          {playing ? (
            <PauseCircleIcon sx={{ fontSize: '30px' }} />
          ) : (
            <NotStartedIcon sx={{ fontSize: '30px' }} />
          )}
        </Box>
        <GameGraph data={gameData} upTo={upTo} />
      </Box>

      <ClaimDataTable data={claimData} loading={state.loading} />
    </Stack>
  );
};

export default Index;
