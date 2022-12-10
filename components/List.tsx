import React from 'react'
import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import ParkingDetail from './ParkingDetail'


const List = ({parkings, isLoading}) =>{
  if (isLoading) return (
    <Flex
      direction={'column'}
      bg={'whiteAlpha.900'}
      width={'37vw'}
      height ='100vh'
      position ={'absolute'}
      left={0}
      top={0}
      zIndex={1}
      overflow='hidden'
      px={2}
    >
      <Box padding = '6' boxShadow='lg' bg='white' mt={16}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines ={4} spacing = '4' />
      </Box>
      <Box padding = '6' boxShadow='lg' bg='white' mt={3}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines ={4} spacing = '4' />
      </Box>
      <Box padding = '6' boxShadow='lg' bg='white' mt={3}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines ={4} spacing = '4' />
      </Box>
      <Box padding = '6' boxShadow='lg' bg='white' mt={3}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines ={4} spacing = '4' />
      </Box>
      <Box padding = '6' boxShadow='lg' bg='white' mt={3}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines ={4} spacing = '4' />
      </Box>
      <Box padding = '6' boxShadow='lg' bg='white' mt={3}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines ={4} spacing = '4' />
      </Box>
      <Box padding = '6' boxShadow='lg' bg='white' mt={3}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines ={4} spacing = '4' />
      </Box>
      <Box padding = '6' boxShadow='lg' bg='white' mt={3}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines ={4} spacing = '4' />
      </Box>
      <Box padding = '6' boxShadow='lg' bg='white' mt={3}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines ={4} spacing = '4' />
      </Box>

    </Flex>
  )
  return (
    <Flex
    direction={'column'}
      bg={'whiteAlpha.900'}
      width={'37vw'}
      height ='100vh'
      position ={'absolute'}
      left={0}
      top={0}
      zIndex={1}
      overflow='hidden'
      px={2}
    >
      <Flex flex={1} overflowY={'scroll'} mt ={16} direction={'column'}>
        {
          parkings && parkings.map((parking: any, i: any )=>
            <ParkingDetail parking={parking} key={i} />
          )
        }
      </Flex>
    </Flex>
  )
}

export default List