import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import Map from '../components/map';
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'
import SearchResults from '../components/searchResults';


type SearchProps = {
  address: String;
  startTime: String;
  endTime: String;
}

export default function Search(props: SearchProps) {

  const [results, setResults] = useState([]);
  const [coordinates, setCoordinates] = useState({lat: 29.76116, lng: -95.37419})
  const [isLoading, setIsLoading] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      console.log({latitude, longitude});
      setCoordinates({lat: latitude, lng: longitude})
    })
  },[]);

  const mokeResults = [
    {address: "some 1 places",
     id: 1,
     price: 10,
     description: "this place have one parking spot",
     coordinates: {
      lat: 28.6346,
      lng: -96.62859
     }
    },
    {address: "some 2 places",
      id: 2,
      price: 20,
      description: "this place have two parking spot",
      coordinates: {
        lat: 28.63496,
        lng: -96.62796
       }
    },
    {address: "some 3 places",
      id: 3,
      price: 40,
      description: "this place have three parking spot",
      coordinates: {
        lat: 28.63454,
        lng: -96.62495
       }
    },
    {address: "some 4 places",
      id: 4,
      price: 40,
      description: "this place have four parking spot",
      coordinates: {
        lat: 28.63231,
        lng: -96.62734
       }
    },
    {address: "some 5 places",
      id: 5,
      price: 50,
      description: "this place have five parking spot",
      coordinates: {
        lat: 28.6333,
        lng: -96.63153
       }
    }
  ];

  return (
    <>
      <Head>
        <script async defer src='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCQaRzoY9ix-fRrNmoyzizVJ7gSR8V_V7Y' ></script>
      </Head>
      <Flex
        justifyContent= {'center'}
        alignItems = {'center'}
        width = {'100vw'}
        height = { '100vw'}
        maxWidth = {'90vw'}
        maxHeight = {'90vh'}
        position = {'relative'}
      >
        <Flex width={'95vw'} height={'20vh'} justifyContent= {'center'} alignItems = {'center'}>
          <SearchBar
            setCoordinates={setCoordinates}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        </Flex>
        <Flex width={'100vw'} height={'70vh'} justifyContent= {'center'} alignItems = {'center'}>
          <SearchResults results={mokeResults} isLoading ={isLoading}/>
          <Map setCoordinates = {setCoordinates} coordinates = {coordinates} results={mokeResults}/>
        </Flex>
        {/* <ParkingDetail /> */}
      </Flex>
    </>
  );
}