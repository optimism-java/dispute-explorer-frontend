import {
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ethers } from 'ethers';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import useCreditDetail from '../../hooks/useCreditDetail';
import { formatAddress } from '../../lib/utils';

const Index: FC<any> = () => {
  const { addr } = useParams();
  const state = useCreditDetail(addr || '');
  return (
    <Stack spacing={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>CreatedAt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.value?.records?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{formatAddress(item.address)}</TableCell>
                <TableCell>{ethers.formatEther(item.credit)}</TableCell>
                <TableCell>{item.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination />
    </Stack>
  );
};

export default Index;
