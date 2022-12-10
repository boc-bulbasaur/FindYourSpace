import { Flex } from '@chakra-ui/react'
import Header from '../components/Header'
import Map from '../components/Map'
import List from '../components/List'
// import ParkingDetail from '../components/ParkingDetail'
import { useEffect, useState } from 'react'
import Head from 'next/head'

const parkings = [
  {address: 'earth'},
  {address: 'earth'},
  {address: 'earth'},
  {address: 'earth'},
]

const Search = () =>{
  const [ coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState(null)
  const [type, setType] = useState('restaurants')
  const[ratings, setRatings]= useState('')
  const [isLoading, setIsLoading] = useState(false)



  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      console.log({latitude, longitude});
      setCoordinates({lat: latitude, lng: longitude})
    })
  },[]);

    return (
    <Flex
      justifyContent= {'center'}
      alignItems = {'center'}
      width = {'100vw'}
      height = { '100vw'}
      maxWidth = {'100vw'}
      maxHeight = {'100vw'}
      position = {'relative'}
    >
    <Head>
      <script src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCQaRzoY9ix-fRrNmoyzizVJ7gSR8V_V7Y'></script>
    </Head>
      <Header  setType={setType} setRatings={setRatings} setCoordinates = {setCoordinates}/>
      <List parkings={parkings} isLoading ={isLoading}/>
      <Map setCoordinates = {setCoordinates} coordinates = {coordinates} />
      {/* <ParkingDetail /> */}
    </Flex>
  )

}
export default Search