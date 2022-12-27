import React from 'react'
import SearchResult from './searchResult'
import { Box, Grid, Skeleton, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import styles from '../styles/search.module.css';


type SearchResultsProps = {
  results: {}[];
  isLoading: boolean;
  sortBy: string;
  setSortBy: Function;
}

const SearchResults = ({results, isLoading, sortBy, setSortBy}: SearchResultsProps) =>{
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
      zIndex: 1,
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
            color="primary"
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
      <Grid container direction={'column'} columnSpacing={2} >
        {
          results.length !== 0 && results.map((location: Object): JSX.Element => {
            return (
              <Grid key={location.id}>
                <SearchResult location={location} />
              </Grid>
            )
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