import * as React from 'react';
import OwnerHistory from '../pages/ownerHistoryDash';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import styles from '../styles/ownerHistoryDash.module.css';
import { Center } from '@chakra-ui/react';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'Confirmation Code', width: 180, headerAlign: 'center', align: 'center' },
  { field: 'name', headerName: 'Full Name', description: 'This column has a value getter and is not sortable.', width: 200, headerAlign: 'center', align: 'center' },
  { field: 'start_time', type: 'dateTime', headerName: 'Start DateTime', width: 225, headerAlign: 'center' },
  { field: 'end_time', type: 'dateTime', headerName: 'End DateTime', width: 225, headerAlign: 'center' },
  { field: 'duration', headerName: 'Rental Duration', width: 200, headerAlign: 'center', align: 'center'},
  { field: 'address', headerName: 'Location', width: 300, sortable: false, headerAlign: 'center'},
  { field: 'total', headerName: 'Total', width: 128, headerAlign: 'center', align: 'center' },
  { field: 'block', headerName: 'Block User', width: 250, sortable: false, type: 'boolean', headerAlign: 'center'}
];

export default function O_RenderHistory(props) {

  console.log('Render History: ', props)
  let rows = [];

    props.ownerHistory.forEach((record) => {
      let start = new Date(record.start_time)
      let end = new Date(record.end_time)
      rows.push(
        {
          id: record.id,
          name: record.name,
          start_time: start,
          end_time: end,
          duration: `${record.duration} Hours`,
          address: record.address,
          total: `$${record.short_term_rate}.00`,
          block: false,
        }
      )
  })



  return (

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onCellClick={(e) => {
          e.row.block === true ? e.row.block = false : e.row.block = true
          // alert(`Blocked user: ${e.row.name}`)
        }}
        />
    </div>
  );
}
