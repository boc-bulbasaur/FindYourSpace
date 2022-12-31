import { flexbox } from '@chakra-ui/react';
import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import Map from '../components/map';
import SearchResults from '../components/searchResults';

type Location = {
  address: string;
  id: number;
  distance: number;
  price: number;
  url: string;
  attended: boolean;
  gated: boolean;
  electric: boolean;
  garage: boolean;
  always_available: boolean;
  high_clearance: boolean;
  description: string;
}

type MobileSearchProps = {
  results: Location[];
  isLoading: boolean;
  sortBy: string;
  setSortBy: Function;
  startTime: string;
  endTime: string;
  selected: number;
  handleClick: Function;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function MobileSearch(props: MobileSearchProps) {
  const { results, isLoading, sortBy, setSortBy, startTime, endTime, selected,
    handleClick, coordinates } = props;
  const [mobileView, setMobileView] = useState('map');

  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target.value !== null) {
      setMobileView(e.target.value)
    }
  }

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          marginTop: '56px',
          height: '80%',
          display: {
            xs: 'block',
            sm: 'none'
          }
        }}
      >
        {mobileView === 'list' &&
        (<Box
          sx={{
            width: '100%',
            height: '80%',
          }}
        >
          <SearchResults results={results} isLoading={isLoading} sortBy={sortBy} setSortBy={setSortBy}
                startTime={startTime} endTime={endTime} selected={selected} handleClick={handleClick}/>
        </Box> )}
        {mobileView === 'map' &&
        (<Box
          sx={{
            position: 'absolute',
            marginTop: '56px',
            height: '80%',
            display: {
              xs: 'block',
              sm: 'none'
            }
          }}
        >
          <Map coordinates={coordinates} results={results} selected={selected} handleClick={handleClick}/>
        </Box> )}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          margin: 'auto',
          display: {
            xs: 'block',
            sm: 'none'
          }
        }}
      >
        <ToggleButtonGroup
          color="info"
          value={mobileView}
          exclusive
          aria-label="MobileView"
          onChange={handleChange}
        >
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="map">Map</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  )

}