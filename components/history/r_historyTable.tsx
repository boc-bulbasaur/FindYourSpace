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
  { field: 'duration', type: 'number', headerName: 'Duration', width: 70 },
  { field: 'block', headerName: 'Block?', width: 70 },
];

var rows = [
  { id: 1, name: 'John S', address: '123 Anywhere st', city: 'Austin', state: 'TX', zip: '78757', startDateTime: new Date('2022-04-25 8:00'), endDateTime: new Date('2022-04-25 12:00'), duration: '4 hours', block: 'X'},
  { id: 2, name: 'Jimmy G', address: '101 Garage st', detail: '#304', city: 'Austin', state: 'TX', zip: '78754', startDateTime: new Date('2022-03-25 19:00'), endDateTime: new Date('2022-03-25 21:00'), duration: '2 hours', block: 'blocked'},
  { id: 3, name: 'Sarah L', address: '99 Williams rd', detail: '#3', city: 'Austin', state: 'TX', zip: '78727', startDateTime: new Date('2022-04-25 12:00'), endDateTime: new Date('2022-04-25 13:00'), duration: '1 hour', block: 'X'},
  { id: 4, name: 'Ernesto B', address: '55 MLK dr', city: 'Austin', state: 'TX', zip: '78727', startDateTime: new Date('2022-12-22 08:00'), endDateTime: new Date('2022-12-22 17:00'), duration: '9 hours', block: 'X'},
  { id: 5, name: 'Ernesto B', address: '55 MLK dr', city: 'Austin', state: 'TX', zip: '78727', startDateTime: new Date('2022-12-23 10:00'), endDateTime: new Date('2022-12-23 17:00'), duration: '9 hours', block: 'X'},
];

export default function HistoryTable(props) {
  if (props.listings.length !== 0) {
    rows = [];
    props.listings.forEach((e, idx) => {
      // console.log(e);
      const startDate = new Date(e.timeRangeStart);
      const endDate = new Date(e.timeRangeEnd);
      const diffDate = endDate.getDate()-startDate.getDate();
      rows.push({id: e.id, name: `${e.firstName} ${e.lastName}`, address: e.address, detail: e.detail,
      city: e.place_id, startDateTime: startDate, endDateTime: endDate, duration: diffDate });
    });
  }
  return (
    <div style={{ height: 270, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[3]}
        checkboxSelection={false}
      />
    </div>
  );
}