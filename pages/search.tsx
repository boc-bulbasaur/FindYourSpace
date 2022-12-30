import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import Map from '../components/map';
import SearchBar from '../components/searchBar';
import SearchResults from '../components/searchResults';
import NavBar from '../components/navBar';



type SearchProps = {
  startTime: string;
  endTime: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function Search(props: SearchProps) {

  const [results, setResults] = useState([]);
  const [coordinates, setCoordinates] = useState(props.coordinates || {lat: 29.76116, lng: -95.37419})
  const [isLoading, setIsLoading] = useState(false)
  const [startTime, setStartTime] = useState(props.startTime || '')
  const [endTime, setEndTime] = useState(props.endTime || '')
  const [sortBy, setSortBy] = useState('distance')
  const [selected, setSelected] = useState(-1)

  const { data: session } = useSession();
  // console.log(session);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      console.log({latitude, longitude});
      setCoordinates({lat: latitude, lng: longitude})
    })
  },[]);

  useEffect(() => {
    let newResults = [...results];
    setResults(newResults.sort((a, b) => a[sortBy] - b[sortBy]));
  }, [sortBy]);


  const handleSearch = async () => {
    console.log("search button clicked");
    if (startTime !== '' && endTime !== '' && coordinates.lat && coordinates.lng) {
      setIsLoading(true);
      console.log('start search');
      console.log(startTime, endTime, coordinates.lat, coordinates.lng);
      const info = {startTime, endTime, coordinates};
      try {
        fetch('api/search', {
          method: 'POST',
          body: JSON.stringify(info)
        })
        .then(async (response) => {
          let data = await response.json();
          console.log(data);
          setSortBy('distance');
          setSelected(-1);
          setResults(data);
          setIsLoading(false);
        })
      }
      catch (err) {
        console.log(err);
      }
    }
  }


  return (
    <>
      <Box sx={{
        width: '100%',
        height: '10%',
        position: 'relative',
        margin: '0',
        alignItems: 'center'
        }} >
        <NavBar session={session}/>
      </Box>
      <Box sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '90vw',
        height: '90vh',
        maxWidth: '100vw',
        maxHeight: '90vh',
        margin: '0 auto',
        position: 'relative',
        flexDirection: 'column'
      }} >
        <Box width={'100%'} height={'10%'} position={'relative'} marginTop={'20px'} justifyContent={'center'} alignItems={'center'}>
          <SearchBar
            setCoordinates={setCoordinates}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            isLoading={isLoading}
            handleSearch={handleSearch}
          />
        </Box>
        <Box width={'100%'} height={'85%'} position={'relative'} marginTop={'10px'}>
          <SearchResults results={results} isLoading={isLoading} sortBy={sortBy} setSortBy={setSortBy}
            startTime={startTime} endTime={endTime} selected={selected} setSelected={setSelected} />
          <Map coordinates={coordinates} results={results} selected={selected} />
        </Box>
      </Box>
    </>
  );
}
