import { Skeleton, TableCell, TableRow } from '@mui/material';
import { FC } from 'react';

const TableRowSkeleton: FC<{ rowNum: number; colNum: number }> = ({
  rowNum,
  colNum,
}) => {
  return (
    <>
      {[...Array(rowNum)].map((row, index) => (
        <TableRow key={`${row}-${index}`}>
          {[...Array(colNum)].map((col, index) => (
            <TableCell component="th" scope="row" key={`${col}-${index}`}>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableRowSkeleton;
