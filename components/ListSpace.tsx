import { Box, Button, Typography, LinearProgress } from '@mui/material';
import { useState } from 'react';
import First from "./ListSpaceSteps/FirstStep";
import Places from "./ListSpaceSteps/Second";
import Third from "./ListSpaceSteps/ThirdStep";
import Fourth from "./ListSpaceSteps/FourthStep";
import Fifth from "./ListSpaceSteps/FifthStep";
import Sixth from "./ListSpaceSteps/SixthStep";
import Seventh from "./ListSpaceSteps/SeventhStep";
import Eighth from "./ListSpaceSteps/EighthStep";
import Ninth from "./ListSpaceSteps/NinthStep";
import { useSession } from 'next-auth/react';


function ListSpace() {
  const { data: session } = useSession();
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    type: '',
    _address: '',
    coordinates: {lat: 28.6333, lng: -96.63153},
    amenities_attended: false,
    amenities_gated: false,
    amenities_electric: false,
    amenities_garage: false,
    amenities_247: false,
    amenities_clearance: false,
    description: '',
    _special_information: '',
    image_url: '',
    min_stay: 0,
    max_stay: 0,
    min_notice: 0,
    availability: [null, null],
    short_term_rate: 0,
    long_term_rate: 0,
    image_id: '',
    location_id: ''
  });

  function handleSubmit () {
    if (page === 0) {
      if (formData.type === '') {
        return alert('Please select the type of space you will be listing');
      } else {
        setPage(page + 1);
        console.log(formData);
      }
    } else if (page === 1) {
      if (formData._address === '' || formData._address.length <= 1) {
        return alert('Please enter the location of your space and verify it on the map');
      } else {
        setPage(page + 1);
        handleLocation({ formData })
        console.log(formData);
      }
    } else if (page === 2) {
      if (formData.description.length <= 1) {
        return alert('Please select an amenity, enter a brief description');
      } else {
        setPage(page + 1);
        console.log(formData);
      }
    }  else if (page === 3) {
      if (formData.image_url === '') {
        return alert('Please add a photo of your space');
      } else {
        setPage(page + 1);
        console.log(formData);
        handleImage(formData.image_url)
      }
    }  else if (page === 4) {
      if (formData.max_stay < 1) {
        return alert('Please enter the maximum length a user can rent your space');
      } else {
        setPage(page + 1);
        console.log(formData);
      }
    }  else if (page === 5) {
      if (!formData.availability[0] || !formData.availability[1]) {
        return alert('Please select the availability of your space from the calendar');
      } else {
        setPage(page + 1);
        console.log(formData);
      }
    }  else if (page === 6) {
      if (formData.short_term_rate < 1 || formData.long_term_rate < 1) {
        return alert('Please enter the base price for your space');
      } else {
        setPage(page + 1);
        console.log(formData);
      }
    }  else if (page === 7) {
        setPage(page + 1);
        handleListing(formData)
        console.log(formData);
    }
  }

  async function handleLocation(data) {
    const res = await fetch('/api/location', {
      method: 'POST',
      body: JSON.stringify({
        lat: data.formData.coordinates.lat,
        lng: data.formData.coordinates.lng,
        address: data.formData._address
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      const json = await res.json();
      setFormData({
        ...formData,
        location_id: json.id
      })
    }
  }

  async function handleImage(url) {
    const res = await fetch('/api/imageupload', {
      method: 'POST',
      body: JSON.stringify({
        url: url,
        type: 'Listing'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      const json = await res.json();
      setFormData({
        ...formData,
        image_id: json.id
      })
    }
  }

  async function handleListing(data) {
    console.log(data)
    const res = await fetch('/api/createlisting', {
      method: 'POST',
      body: JSON.stringify({
        attended: !!data.attended,
        gated: !!data.gated,
        electric_charger: !!data.electric_charger,
        garage: !!data.garage,
        always_available: !!data.always_available,
        high_clearance: !!data.high_clearance,
        description: data.description,
        special_information: data._special_information,
        minimum_stay: data.min_stay,
        maximum_stay: data.max_stay,
        first_available: data.availability[0].unix(),
        last_available: data.availability[1].unix(),
        short_term_rate: data.short_term_rate,
        long_term_rate: data.long_term_rate,
        type: data.type,
        image_id: data.image_id,
        location_id: data.location_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      const json = await res.json();
      console.log(json)
    }
  }

  const formPage = () => {
    switch (page) {
      case 0:
        return <First formData={formData} setFormData={setFormData} />;
      case 1:
        return <Places formData={formData} setFormData={setFormData} />;
      case 2:
        return <Third formData={formData} setFormData={setFormData} />;
      case 3:
        return <Fourth formData={formData} setFormData={setFormData} />;
      case 4:
        return <Fifth formData={formData} setFormData={setFormData} />;
      case 5:
        return <Sixth formData={formData} setFormData={setFormData} />;
      case 6:
        return <Seventh formData={formData} setFormData={setFormData} />;
      case 7:
        return <Eighth formData={formData} setFormData={setFormData} session={session} />
      case 8:
        return <Ninth formData={formData} setFormData={setFormData} />;
      default:
        return <First formData={formData} setFormData={setFormData} />;
    }
  };



  return (
    <Box
      sx={{
        backgroundColor: '#C0c0c0',
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 10px'
      }}
    >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '50vh',
        minWidth: '50vw',
        border: '2px solid #000',
        borderRadius: '8px',
        padding: '10px 20px',
        backgroundColor: '#FFF',
      }}
    >
        {formPage()}
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '20px'
            }}
          >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography>
              Step {page + 1} / 8
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {
              page > 0 &&
              <Button
                variant="outlined"
                className="listing-back-button"
                sx={{
                  display: 'flex'
                }}
                onClick={() => setPage(page - 1)}
              >BACK</Button>
            }
            {
              page < 8 &&
              <Button
                variant="contained"
                className="listing-next-button"
                sx={{
                  display: 'flex',
                  marginLeft: '8px'
                }}
                onClick={handleSubmit}
              >{ page === 7 ? "SUBMIT" : "NEXT" }</Button>
            }
            {/* {
              page === 6 &&
              <Button
                variant="contained"
                className="listing-submit-button"
                sx={{
                  display: 'flex',
                  marginLeft: '8px'
                }}
                onClick={handleSubmit}
              >SUBMIT</Button>
            } */}
            {/* <Button
              onClick={() => handleData(formData)}
              className="listing-next-button"
              variant="contained"
              sx={{
                marginLeft: '8px'
              }}
            >
              { page === 7 ? "SUBMIT" : "NEXT" }
            </Button> */}
          </Box>
        </Box>
      <Box>
        <LinearProgress variant="determinate" value={((page) * 100) / (8 - 1)} />
      </Box>
      </Box>
    </Box>
  </Box>
  );
}
export default ListSpace;