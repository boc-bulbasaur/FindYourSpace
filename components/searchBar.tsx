import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Stack } from '@mui/system';
import { Box, TextField, TextFieldProps, Button, Grid } from '@mui/material';


type SearchBarProps = {
  setCoordinates: Function;
  startTime: string;
  setStartTime: Function;
  endTime: string;
  setEndTime: Function;
  handleSearch: any;
}

const SearchBar = ({ setCoordinates, startTime, setStartTime, endTime, setEndTime, handleSearch }: SearchBarProps)=>{
  const [autocomplete, setAuotcomplete] = useState(null)
  const onLoad = (autoC: any) => setAuotcomplete(autoC);
  const onPlaceChanged = ()=>{
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
    setCoordinates({lat,lng})
  }
  let now = new Date();

  return (
    <Box>
      <Grid container direction="row" justifyContent='flex-start' alignItems='center' >
        <Grid item xs={12} sm={5} margin='5px' >
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <TextField id={'outlined-basic'} fullWidth placeholder='Search address for available parking...'/>
          </Autocomplete>
        </Grid>
        <Grid item xs={4} sm={2.5} margin={'5px'} >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DateTimePicker
                onChange={setStartTime}
                renderInput={(params: TextFieldProps) => {
                  return <TextField {...params} />;
                }}
                label="Start Time"
                views={['day', 'hours']}
                value={startTime}
                required={true}
                minDateTime={now}
                minutesStep={60}
                ampm={false}
              />
            </Stack>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sm={2.5} margin={'5px'} >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DateTimePicker
                onChange={setEndTime}
                renderInput={(params: TextFieldProps) => {
                  return <TextField {...params} />;
                }}
                disabled={startTime===''}
                label="End Time"
                views={['day', 'hours']}
                value={endTime}
                required={true}
                minDateTime={Date.parse(startTime) + 60*60*1000}
                minutesStep={60}
                ampm={false}
              />
            </Stack>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2.5} sm={1.1} margin={'5px'} >
          <Button
            variant="contained"
            onClick={handleSearch}
            fullWidth
            color='info'
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchBar;