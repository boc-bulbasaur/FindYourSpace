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
  { field: 'short_term_rate', headerName: 'Total', width: 128, headerAlign: 'center', align: 'center' },
  { field: 'block', headerName: 'Block User', width: 250, sortable: false, type: 'boolean', headerAlign: 'center'}
];

export default function O_RenderHistory({ ownerHistory }) {

  //console.log('Render History: ', ownerHistory.userHistory)

  return (

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.id}
        rows={ownerHistory.userHistory}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        />
    </div>
  );
}
