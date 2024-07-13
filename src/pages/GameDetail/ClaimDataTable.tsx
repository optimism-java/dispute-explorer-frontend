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
import DigWrapper from '../../components/DigWrapper';
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
            <TableCell>
              <DigWrapper children={'Data Index'} />
            </TableCell>
            <TableCell>
              <DigWrapper children={'Position'} />
            </TableCell>
            <TableCell>
              <DigWrapper children={'Claim'} />
            </TableCell>
            <TableCell>
              <DigWrapper children={'Claimant'} />
            </TableCell>
            <TableCell>
              <DigWrapper children={'Countered By'} />
            </TableCell>
            <TableCell>
              <DigWrapper children={'Bond'} />
            </TableCell>
            <TableCell>
              <DigWrapper children={'Clock'} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && <TableRowSkeleton rowNum={5} colNum={6} />}
          {!loading &&
            data?.map((item) => (
              <TableRow key={item.data_index}>
                <TableCell>
                  <DigWrapper children={item.data_index} />
                </TableCell>
                <TableCell>
                  <DigWrapper children={item.position} />
                </TableCell>
                <TableCell>
                  <Tooltip title={item.claim} placement="top">
                    <DigWrapper children={formatAddress(item.claim)} />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={item.claimant} placement="top">
                    <DigWrapper children={formatAddress(item.claimant)} />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={item.countered_by} placement="top">
                    <DigWrapper children={formatAddress(item.countered_by)} />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <DigWrapper
                    children={
                      ethers
                        .formatEther(item.bond.toString())
                        .match(/^\d+(?:\.\d{0,2})?/) + 'ETH'
                    }
                  />
                </TableCell>
                <TableCell>
                  <Typography>
                    {' '}
                    <DigWrapper children={item.clock.toString()} />
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClaimDataTable;
