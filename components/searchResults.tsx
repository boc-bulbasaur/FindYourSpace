import React from 'react'
import { Box, Grid, Skeleton, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SearchResult from './searchResult';
import SearchResultZoom from './searchResultZoom';
import styles from '../styles/search.module.css';

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

type SearchResultsProps = {
  results: Location[];
  isLoading: boolean;
  sortBy: string;
  setSortBy: Function;
  startTime: string;
  endTime: string;
  selected: number;
  handleClick: Function;
}

const SearchResults = ({results, isLoading, sortBy, setSortBy, startTime, endTime, selected, handleClick }: SearchResultsProps) =>{
  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target.value !== null) {
      setSortBy(e.target.value);
    }
  }

  if (isLoading) return (
    <Box sx={{
      direction: 'column',
      bg: 'whiteAlpha.900',
      width: '38%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
      overflow: 'hidden',
      px: 2,
    }} >
      <Stack>
        <br></br>
        <Skeleton height='50px' />
        <br></br>
        <Skeleton height='50px' />
        <br></br>
        <Skeleton height='50px' />
        <br></br>
        <Skeleton height='50px' />
        <br></br>
        <Skeleton height='50px' />
        <br></br>
        <Skeleton height='50px' />
        <br></br>
        <Skeleton height='50px' />
        <br></br>
        <Skeleton height='50px' />
        <br></br>
        <Skeleton height='50px' />
        <br></br>
        <Skeleton height='50px' />
      </Stack>
    </Box>
  )
  return (
    <Box sx={{
      direction: 'column',
      bg: 'whiteAlpha.900',
      width: '38%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      zindex: 1,
      overflow: 'scroll',
      px: 2,
    }} className={styles.searchresults} >
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
          results.length === 0 && <div>No available results</div>
        }
      </Grid>
    </Box>
  )
}

export default SearchResults;