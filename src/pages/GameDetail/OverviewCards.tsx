import { Grid } from '@mui/material';
import { ethers } from 'ethers';
import type { Overview } from '../../lib/types';

type OverviewProps = {
  data?: Overview;
};

const OverviewCards = ({ data }: OverviewProps) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <p className="font-palanquin text-center text-4xl font-bold">
          {ethers.formatEther('215182088800000000000')} ETH
        </p>
        <p className="font-montserrat text-slate-gray text-center leading-7">
          Total Credits
        </p>
      </Grid>
      <Grid item xs={6}>
        <p className="font-palanquin text-center text-4xl font-bold">3005</p>
        <p className="font-montserrat text-slate-gray text-center leading-7">
          Total Games
        </p>
      </Grid>
    </Grid>
  );
};

export default OverviewCards;
