import * as React from 'react';
import OwnerHistory from '../pages/ownerHistoryDash';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


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
  { field: 'block', headerName: 'Block User', width: 250, sortable: false, type: 'boolean' }

];

// const rows = [
//   { id: '0AE7C96D', fullName: 'Justo Marquez', startDateTime: new Date('2022-04-20 8:00'), endDateTime: new Date('2022-04-20 12:00'), duration: null, location: '1234 Example st', total: '$32.00', block: true },
//   { id: 'B46D307D', fullName: 'Keren Liu', startDateTime: new Date('2022-04-22 9:00'), endDateTime: new Date('2022-04-22 14:00'), duration: null, location: '1234 Example st', total: '$40.00', block: null },
//   { id: 'F368C178', fullName: 'Eric Kalin', startDateTime: new Date('2022-04-25 8:00'), endDateTime: new Date('2022-04-25 9:00'), duration: null, location: '1234 Example st', total: '$10.00', block: null },
//   { id: 'C4A07C54', fullName: 'Keith Hall', startDateTime: new Date('2022-04-26 12:00'), endDateTime: new Date('2022-04-26 13:00'), duration: null, location: '1234 Example st', total: '$10.00', block: null },
//   { id: '0D984B84', fullName: 'Zefeng Shen', startDateTime: new Date('2022-04-29 8:00'), endDateTime: new Date('2022-04-29 16:00'), duration: null, location: '1234 Example st', total: '$55.00', block: null },
//   { id: '28F54014', fullName: 'Miranda Zhou', startDateTime: new Date('2022-04-23 11:00'), endDateTime: new Date('2022-04-23 17:00'), duration: null, location: '1234 Example st', total: '$45.00', block: null },
//   { id: 'CC34D0F9', fullName: 'Jewell Wilson', startDateTime: new Date('2022-04-25 8:00'), endDateTime: new Date('2022-04-25 12:00'), duration: null, location: '1234 Example st', total: '$25.00', block: null },
//   { id: '49B6F40D', fullName: 'JT Liu', startDateTime: new Date('2022-04-25 8:00'), endDateTime: new Date('2022-04-25 12:00'), duration: null, location: '1234 Example st', total: '$25.00', block: null },
// ];


export default function O_RenderHistory({ ownerHistory }) {

  console.log('Render History: ', ownerHistory.userHistory)

  return (

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={ownerHistory.userHistory}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        />
    </div>
  );
}
