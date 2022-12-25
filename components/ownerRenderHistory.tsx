import * as React from 'react';
import OwnerHistory from '../pages/ownerHistoryDash';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import styles from '../styles/ownerHistoryDash.module.css';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'Confirmation Code', width: 180 },
  { field: 'fullName', headerName: 'Full Name', description: 'This column has a value getter and is not sortable.', width: 200 },
  { field: 'startDateTime', type: 'dateTime', headerName: 'Start DateTime', width: 225 },
  { field: 'endDateTime', type: 'dateTime', headerName: 'End DateTime', width: 225 },
  {
    field: 'duration',
    headerName: 'Rental Duration',
    width: 200,
    valueGetter: (params) =>
    // `${params.row.endDateTime.getHours() - params.row.startDateTime.getHours()} Hours`
    console.log()
  },
  { field: 'location', headerName: 'Location', width: 300, sortable: false},
  { field: 'total', headerName: 'Total', width: 128 },
  { field: 'block', headerName: 'Block User', width: 250, sortable: false, type: 'boolean'}

];

export default function O_RenderHistory({ ownerHistory }) {

  //console.log('Render History: ', ownerHistory.userHistory)

  return (

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={ownerHistory.userHistory}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        />
    </div>
  );
}
