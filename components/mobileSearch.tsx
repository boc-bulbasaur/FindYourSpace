import styles from '../styles/search.module.css';
import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import GoogleMapReact from 'google-map-react'
import { IoLocation } from "react-icons/io5";
import SearchResult from '../components/searchResult';
import SearchResultZoom from '../components/searchResultZoom';

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

  const handleViewChange = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target.value !== null) {
      setMobileView(e.target.value)
    }
  }

  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target.value !== null) {
      setSortBy(e.target.value);
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
            position: 'absolute',
            left: 0,
            marginTop: '15px',
            height: '70vh',
            width: '90vw',
            px: 2,
            overflow: 'scroll',
            display: {
              xs: 'block',
              sm: 'none'
            }
          }}
          className={styles.searchresults}
        >
          <Grid container direction={'row'} justifyContent={'flex-end'} alignItems={'center'} >
            <Grid
              justifyContent={'center'}
              alignItems={'center'}
            >
              Sort By:
            </Grid>
            <Grid
              justifyContent={'center'}
              alignItems={'center'}
            >
              <ToggleButtonGroup
                color="info"
                value={sortBy}
                exclusive
                aria-label="sortBy"
                onChange={handleChange}
              >
                <ToggleButton value="distance">Distance</ToggleButton>
                <ToggleButton value="price">Price</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Grid container direction={'column'} columnSpacing={1}>
            {
              results.length !== 0 && results.map((location: Location): JSX.Element => {
                const id = location.id;
                if (id === selected) {
                  return (
                    <Grid key={id} onClick={(e) => { handleClick(e, id) }} >
                      <SearchResultZoom location={location} startTime={startTime} endTime={endTime}/>
                    </Grid>
                  )
                } else {
                  return (
                    <Grid key={id} onClick={(e) => { handleClick(e, id) }} >
                      <SearchResult location={location} />
                    </Grid>
                  )
                }
              })
            }
            {
              results.length === 0 && <Box marginTop={'20px'}>No available results</Box>
            }
          </Grid>
        </Box> )}
        {mobileView === 'map' &&
        (<Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            marginTop: '5px',
            height: '70vh',
            width: '90vw',
            display: {
              xs: 'block',
              sm: 'none'
            }
          }}
        >
          <GoogleMapReact
          bootstrapURLKeys = {{key: process.env.GOOGLE_MAP_API_KEY}}
          center = {coordinates}
          defaultZoom = {14.5}
          margin = {[50,50,50,50]}
          option= {''}
          onchange = {()=>{}}
          onChildClick = {()=>{}}
          >
            <Box
              component='span'
              lat={coordinates.lat}
              lng={coordinates.lng}
              position={'relative'}
              zIndex={100}
            >
                <IoLocation color = 'red' fontSize={30} />
            </Box>
            {results && results.map((location):JSX.Element => {
              const { lat, lng, id } = location;
              if (id === selected) {
                return (
                  <Box
                    component='span'
                    key={id}
                    lat = {lat}
                    lng = {lng}
                    position={'relative'}
                    zIndex={20}
                    onClick={(e) => { handleClick(e, id) }}
                  >
                    <IoLocation color='#1976D2' fontSize={40} />
                  </Box>)
              } else {
                return (
                  <Box
                    component='span'
                    key={id}
                    lat = {lat}
                    lng = {lng}
                    position={'relative'}
                    zIndex={10}
                    onClick={(e) => { handleClick(e, id) }}
                  >
                    <IoLocation color='black' fontSize={30} />
                  </Box>)
              }
            })}
          </GoogleMapReact>
        </Box> )}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          margin: 'auto',
          zIndex: 100,
          backgroundColor: 'grey',
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
          onChange={handleViewChange}
        >
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="map">Map</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  )

}