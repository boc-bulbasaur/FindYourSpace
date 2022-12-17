import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Conf #', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'address', headerName: 'Address', width: 150 },
  { field: 'detail', headerName: 'Detail', width: 70 },
  { field: 'city', headerName: 'City', width: 70 },
  { field: 'state', headerName: 'State', width: 70 },
  { field: 'zip', headerName: 'ZIP', width: 70 },
  { field: 'startDateTime', type: 'dateTime', headerName: 'Start DateTime', width: 220 },
  { field: 'endDateTime', type: 'dateTime', headerName: 'End DateTime', width: 220 },
  { field: 'duration', headerName: 'Duration', width: 70 },
  { field: 'block', headerName: 'Block?', width: 70 },
];

const rows = [
  { id: 4, name: 'Ernesto B', address: '55 MLK dr', city: 'Austin', state: 'TX', zip: '78727', startDateTime: new Date('2022-12-22 08:00'), endDateTime: new Date('2022-12-22 17:00'), duration: '9 hours', block: 'X'},
  { id: 5, name: 'Ernesto B', address: '55 MLK dr', city: 'Austin', state: 'TX', zip: '78727', startDateTime: new Date('2022-12-23 10:00'), endDateTime: new Date('2022-12-23 17:00'), duration: '9 hours', block: 'X'},
];

export default function HistoryTable() {
  return (
    <div style={{ height: 270, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[3]}
        checkboxSelection
      />
    </div>
  );
}