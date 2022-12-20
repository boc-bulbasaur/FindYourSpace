import React from 'react'
import { Flex } from '@chakra-ui/react'
import SearchResult from './searchResult'
import { Skeleton, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

type SearchResultsProps = {
  results: {}[];
  isLoading: boolean;
  sortBy: string;
  setSortBy: Function;
}

const SearchResults = ({results, isLoading, sortBy, setSortBy}: SearchResultsProps) =>{
  const handleChange = (e: React.MouseEvent<HTMLElement>, newSortBy: String) => {
    if (newSortBy !== null) {
      setSortBy(newSortBy);
    }
  }

  if (isLoading) return (
    <Flex
      direction={'column'}
      bg={'whiteAlpha.900'}
      width={'35%'}
      height ={'100%'}
      position ={'absolute'}
      left={0}
      top={0}
      zIndex={1}
      overflow='hidden'
      px={2}
    >
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
        {/* <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' /> */}
      </Stack>
    </Flex>
  )
  return (
    <Flex
      direction={'column'}
      bg={'whiteAlpha.900'}
      width={'35%'}
      height ={'100%'}
      position ={'absolute'}
      left={0}
      top={0}
      zIndex={1}
      overflow='hidden'
      px={2}
    >
      <Flex
        justifyContent={'right'}
        alignItems={'center'}
      >
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
        >
          Sort By:
        </Flex>
        <Flex
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
            <ToggleButton value="lat">Distance</ToggleButton>
            <ToggleButton value="distance">Price</ToggleButton>
          </ToggleButtonGroup>
        </Flex>
      </Flex>
      <Flex flex={1} overflowY={'scroll'} mt ={16} direction={'column'} className='search-results'>
        {
          results.length !== 0 && results.map((location: Object): JSX.Element => {
            return <SearchResult location={location} />
          })
        }
        {
          results.length === 0 && <div>No available results</div>
        }
      </Flex>
    </Flex>
  )
}

export default SearchResults;