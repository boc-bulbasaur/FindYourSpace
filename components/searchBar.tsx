import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import{ Flex, InputGroup, InputRightElement, Input } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-date-pickers-pro/themeAugmentation';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Stack } from '@mui/system';
import { TextField, TextFieldProps } from '@mui/material';
import { now } from 'next-auth/client/_utils';

type SearchBarProps = {
  setCoordinates: Function;
  startTime: String;
  setStartTime: Function;
  endTime:String;
  setEndTime: Function;
}

const SearchBar = ({ setCoordinates, startTime, setStartTime, endTime, setEndTime }: SearchBarProps)=>{
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
    position ={'absolute'}
    top={0}
    left={0}
    width={'full'}
    height={'full'}
    px={4}
    py={2}
    zIndex={101}
    >
      <Flex width={'30%'} height={'full'} >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <InputGroup width={'100%'} shadow='lg'>
            <InputRightElement
            pointerEvents={'none'}
            children={<BiSearch color ='gray' fontSize={20} />}
            />
            <Input
              type={'text'}
              placeholder ='Search address for available parking...'
              variant = {'filled'}
              fontSize = {18}
              bg = {'white'}
              color = {'gray.700'}
              _hover = {{bg:'whiteAlppha.800'}}
              _focus = {{bg: 'whiteAlpha.800'}}
              _placeholder ={{color: 'gray.700'}}
            />
          </InputGroup>
        </Autocomplete>
      </Flex>
      <Flex>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DateTimePicker
              onChange={setStartTime}
              renderInput={(params: TextFieldProps) => {
                return <TextField {...params} />;
              }}
              label="startTime"
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
      <Flex>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DateTimePicker
              onChange={setEndTime}
              renderInput={(params: TextFieldProps) => {
                return <TextField {...params} />;
              }}
              disabled={startTime===''}
              label="endTime"
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
    </Flex>
  )
}

export default SearchBar;