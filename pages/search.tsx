import { Flex } from '@chakra-ui/react'
import Header from '../components/Header'
import Map from '../components/Map'
import List from '../components/List'
import PlaceDetail from '../components/PlaceDetail'
import { useState } from 'react'


const Search = () =>{
  const [ coordinates, setCoordinates] = useState({lat: 0, lng: 0})
  return (
    <Flex
    justifyContent= {'center'}
    alignItems = {'center'}
    width = {'100vw'}
    height = { '100vw'}
    maxWidth = {'100vw'}
    maxHeight = {'100vw'}
    position = {'relative'}
    // bg= {'blue.400'}
    >

      <Header />
      <List />
      <Map setCoordinates = {setCoordinates} coordinates = {coordinates}/>
      {/* <PlaceDetail /> */}
    </Flex>
  )

}
export default Search