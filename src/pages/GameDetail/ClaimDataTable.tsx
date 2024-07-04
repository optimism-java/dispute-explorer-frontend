import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { ethers } from 'ethers';
import TableRowSkeleton from '../../components/TableRowSkeleton';
import { ClaimData } from '../../lib/types';
import { formatAddress } from '../../lib/utils';

type ClaimDataTableProps = {
  loading: boolean;
  data?: ClaimData[];
};

const ClaimDataTable = ({ loading, data }: ClaimDataTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data Index</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Claim</TableCell>
            <TableCell>Claimant</TableCell>
            <TableCell>Countered By</TableCell>
            <TableCell>Bond</TableCell>
            <TableCell>Clock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && <TableRowSkeleton rowNum={5} colNum={6} />}
          {!loading &&
            data?.map((item) => (
              <TableRow key={item.data_index}>
                <TableCell>{item.data_index}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>
                  <Tooltip title={item.claim} placement="top">
                    <span>{formatAddress(item.claim)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={item.claimant} placement="top">
                    <span>{formatAddress(item.claimant)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={item.countered_by} placement="top">
                    <span>{formatAddress(item.countered_by)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {ethers.formatEther(item.bond.toString())} ETH
                </TableCell>
                <TableCell>
                  <Typography>{item.clock.toString()}</Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClaimDataTable;
