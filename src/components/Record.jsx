import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { collection, getDocs,getFirestore } from "firebase/firestore";
import {app} from './firebase';
const firestore = getFirestore(app);
const columns = [
  { id: 'si', label: 'SI', minWidth: 60 },
  { id: 'name', label: 'Name', minWidth: 120 },
  { id: 'guardian', label: 'Guardian Name', minWidth: 120 },
  
  {
    id: 'age',
    label: 'Age',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'gendar',
    label: 'Gendar',
    minWidth: 80,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 80,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'address',
    label: 'Address',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  
  {
    id: 'fee',
    label: 'Fee',
    minWidth: 80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];


export default function Record() {


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
 React.useEffect(() => {
  const fatchData=async()=>{
    try {
      const querySnapshot = await getDocs(collection(firestore, "paitent"));
      const result = querySnapshot.docs.map((doc) => doc.data());
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fatchData()
  
 },[])

 console.log(data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 560 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  sx={{fontSize: "16px",fontWeight: 'bold',color: "#72aae2",textAlign: 'left'}}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  // <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  //   {columns.map((column) => {
                  //     return (
                  //       <TableCell key={column.id} align={column.align}>
                          
                  //           {row[column.id]}
                  //       </TableCell>
                  //     );
                  //   })}
                  // </TableRow>
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.guardian}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.gendar}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.add + ", " + row.po + ", " +row.ps + ", " + row.dist + ", " + row.pin + ", " +row.state}</TableCell>
                    <TableCell>{row.fee}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
