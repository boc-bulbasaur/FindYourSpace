import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'address', headerName: 'Address', width: 220 },
  { field: 'startDateTime', type: 'dateTime', headerName: 'Start DateTime', width: 220 },
  { field: 'endDateTime', type: 'dateTime', headerName: 'End DateTime', width: 220 },
];

const rows = [
  { id: 1, address: '123 Anywhere st', startDateTime: new Date('2022-04-25 8:00'), endDateTime: new Date('2022-04-25 12:00')},
  { id: 2, address: '101 Garage st. #304', startDateTime: new Date('2022-03-25 19:00'), endDateTime: new Date('2022-03-25 21:00')},
  { id: 3, address: '99 Williams rd. #3', startDateTime: new Date('2022-04-25 12:00'), endDateTime: new Date('2022-04-25 13:00')},
  { id: 4, address: '55 MLK dr.', startDateTime: new Date('2022-12-22 08:00'), endDateTime: new Date('2022-12-22 17:00')},
  { id: 5, address: '55 MLK dr.', startDateTime: new Date('2022-12-23 10:00'), endDateTime: new Date('2022-12-23 17:00')},
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