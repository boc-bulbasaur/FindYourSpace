import React from 'react'
import { Box, Flex,SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import SearchResult from './searchResult'
import { Skeleton, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

type SearchResultsProps = {
  results: {}[];
  isLoading: boolean;
}

const SearchResults = ({results, isLoading}: SearchResultsProps) =>{
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
            value={'sort'}
            exclusive
            aria-label="sortBy"
          >
            <ToggleButton value="distance">Distance</ToggleButton>
            <ToggleButton value="price">Price</ToggleButton>
          </ToggleButtonGroup>
        </Flex>
      </Flex>
      <Flex flex={1} overflowY={'scroll'} mt ={16} direction={'column'} className='search-results'>
        {
          results && results.map((parking: Object): JSX.Element => {
            const {id, price, address, description } = parking;
            return <SearchResult address={address} id={id} price={price} description={description} />
          })
        }
      </Flex>
    </Flex>
  )
}

export default SearchResults;