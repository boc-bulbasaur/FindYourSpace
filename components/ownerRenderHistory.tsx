import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'fullName',
    headerName: 'Full Name',
    description: 'This column has a value getter and is not sortable.',
    width: 160,
  },
  { field: 'duration', headerName: 'Rental Duration', width: 140, sortable: false},
  { field: 'location', headerName: 'Location', width: 200, sortable: false},
  { field: 'total', headerName: 'Total', width: 100 },
  { field: 'block', headerName: 'Block User', width: 100, sortable: false, type: 'boolean' }

];

const rows = [
  { id: 1, fullName: 'Justo Marquez', duration: null, location: '1234 Example st', total: '$25.00', block: true },
  { id: 2, fullName: 'Keren Liu', duration: null, location: '1234 Example st', total: '$25.00', block: null },
  { id: 3, fullName: 'Eric Kalin', duration: null, location: '1234 Example st', total: '$25.00', block: null },
  { id: 4, fullName: 'Keith Hall', duration: null, location: '1234 Example st', total: '$25.00', block: null },
  { id: 5, fullName: 'Zefeng Shen', duration: null, location: '1234 Example st', total: '$25.00', block: null },
  { id: 6, fullName: 'Miranda Zhou', duration: null, location: '1234 Example st', total: '$25.00', block: null },
  { id: 7, fullName: 'Jewell Wilson', duration: null, location: '1234 Example st', total: '$25.00', block: null },
  { id: 8, fullName: 'JT Liu', duration: null, location: '1234 Example st', total: '$25.00', block: null },
];

export default function O_RenderHistory() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
}