import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridEventListener, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import moment from 'moment';
import { Button } from '@mui/material';
import Link from 'next/link';

interface GridCellExpandProps {
  value: string;
  width: number;
}

function isOverflown(element: Element): boolean {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(
  props: GridCellExpandProps,
) {
  const { width, value } = props;
  const wrapper = React.useRef<HTMLDivElement | null>(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current!);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent: KeyboardEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: '100%',
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

function renderCellExpand(params: GridRenderCellParams<string>) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Conf#', width: 60, },
  { field: 'name', headerName: 'Name', width: 150, renderCell: renderCellExpand },
  { field: 'address', headerName: 'Address', width: 180, renderCell: renderCellExpand },
  { field: 'detail', headerName: 'Detail', width: 150, renderCell: renderCellExpand },
  { field: 'city', headerName: 'City', width: 120 },
  // { field: 'state', headerName: 'State', width: 70 },
  // { field: 'zip', headerName: 'ZIP', width: 70 },
  { field: 'startDateTime', type: 'dateTime', headerName: 'Start DateTime', width: 220 },
  { field: 'endDateTime', type: 'dateTime', headerName: 'End DateTime', width: 220 },
  { field: 'duration', type: 'number', headerName: 'Duration', width: 100 },
  { field: 'rebook', headerName: 'Rebook', width: 100, renderCell: (params) => <Link href={'/reservation'}><Button variant="outlined" component="a">Rebook</Button></Link>
 },
];

var rows: any[] = [];

const diff_hours = (dt2: Date, dt1: Date) => {
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
}

export default function HistoryTable(props: any) {
  if (props.listings.length !== 0) {
    rows = [];
    props.listings.forEach((e: any, idx: number) => {
      // console.log(e);
      const startDate = new Date(e.timeRangeStart);
      const endDate = new Date(e.timeRangeEnd);
      const diffDate = diff_hours(endDate, startDate);
      rows.push({id: e.id, name: e.name, address: e.address, detail: e.detail,
      city: e.place_id, startDateTime: startDate, endDateTime: endDate, duration: `${diffDate} hours`, lat: e.lat, lng: e.lng});
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
        onRowClick={props.handleTableClick}
        sx={{}}
      />
    </div>
  );
}