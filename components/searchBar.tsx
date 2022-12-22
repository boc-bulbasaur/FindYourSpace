import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import{ Flex, InputGroup, Input, Button, Center } from '@chakra-ui/react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Stack } from '@mui/system';
import { TextField, TextFieldProps } from '@mui/material';

type SearchBarProps = {
  setCoordinates: Function;
  startTime: String;
  setStartTime: Function;
  endTime: String;
  setEndTime: Function;
  isLoading: Boolean;
  handleSearch: Function;
}

const SearchBar = ({ setCoordinates, startTime, setStartTime, endTime, setEndTime, isLoading, handleSearch }: SearchBarProps)=>{
  const [autocomplete, setAuotcomplete] = useState(null)
  const onLoad = (autoC) => setAuotcomplete(autoC);
  const onPlaceChanged = ()=>{
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
    setCoordinates({lat,lng})
  }
  let now = new Date();
  return (
    <Flex
    position ={'relative'}
    top={0}
    left={0}
    width={'80%'}
    height={'100%'}
    px={4}
    py={2}
    zIndex={101}
    justifyContent={'center'}
    >
      <Flex
        width={'40%'}
        height={'full'}
        alignItems={'center'}
        justifyContent={'right'}
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <InputGroup width={'100%'} shadow='lg'>
            <Input
              width={'31vw'}
              height={'7vh'}
              type={'text'}
              placeholder ='Search address for available parking...'
              variant = {'filled'}
              fontSize = {18}
              bg = {'white'}
              color = {'black'}
              _hover = {{bg:'whiteAlppha.800'}}
              _focus = {{bg: 'whiteAlpha.800'}}
              _placeholder ={{color: 'gray.700'}}
            />
          </InputGroup>
        </Autocomplete>
      </Flex>
      <Flex
        width={'20%'}
        justifyContent={'center'}
        alignItems={'center'}
      >
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
      </Flex>
      <Flex
        width={'20%'}
        alignItems={'center'}
        justifyContent={'center'}
      >
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
      </Flex>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Button
          isLoading={isLoading}
          loadingText="Searching"
          colorScheme="teal"
          variant="outline"
          borderRadius={'10px'}
          height={'4vh'}
          width={'10vw'}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Flex>
    </Flex>
  )
}

export default SearchBar;