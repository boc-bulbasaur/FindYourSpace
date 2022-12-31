import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import Map from '../components/map';
import SearchBar from '../components/searchBar';
import SearchResults from '../components/searchResults';
import NavBar from '../components/navBar';
import { createTheme, ThemeProvider } from "@mui/material/styles";




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
  const user_id = session?.user?.user_id;
  // console.log(session.user.user_id);

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1b2139',
        dark: '#c9c9ce',
      },
      secondary: {
        main: '#000000',
      },
      info: {
        main: '#1976D2',
      }
    },
    typography: {
      fontFamily: ['Sono','sans-serif'].join(',')
    },
    components: {
    }
  });

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


  const handleSearch = () => {
    console.log("search button clicked");
    if (startTime !== '' && endTime !== '' && coordinates.lat && coordinates.lng) {
      setIsLoading(true);
      console.log('start search');
      console.log(startTime, endTime, coordinates.lat, coordinates.lng);
      const info = {startTime, endTime, coordinates, user_id};
      return fetch('api/search', {
          method: 'POST',
          body: JSON.stringify(info)
        })
        .then(async (response) => {
          let data = await response.json();
          console.log(data);
          if (!data) {
            data = [];
          }
          if (data.length !== 0) {
            data.forEach((location: Object) => {
              const duration = (Date.parse(endTime) - Date.parse(startTime)) / 3600000;
              if (duration > 24) {
                location['priceTag'] = `$${location['long_term_rate']}/day`;
                location['price'] = location['long_term_rate'];
              } else {
                location['priceTag'] = `$${location['short_term_rate']}/hr`;
                location['price'] = location['short_term_rate'];
              }
              location['duration'] = duration;
            })
          }
          setSortBy('distance');
          setSelected(-1);
          setResults(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        })
    }
  }
  const handleClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
    if (selected !== id) {
      setSelected(id);
    } else {
      setSelected(-1);
    }
  }

  const scriptURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=places&callback=initMap`

  return (
    <>
        <script id="google-map-script" async defer src={scriptURL} />
        <Box sx={{
          width: '100%',
          height: '10%',
          position: 'relative',
          margin: '0',
          alignItems: 'center',
          color: 'white'
          }} >
          <NavBar session={session}/>
        </Box>
      <ThemeProvider theme={theme} >
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
              handleSearch={handleSearch}
            />
          </Box>
          <Box width={'100%'} height={'85%'} position={'relative'} marginTop={'10px'}>
            <SearchResults results={results} isLoading={isLoading} sortBy={sortBy} setSortBy={setSortBy}
              startTime={startTime} endTime={endTime} selected={selected} handleClick={handleClick}/>
            <Map coordinates={coordinates} results={results} selected={selected} handleClick={handleClick}/>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
