import { Box, Button, Typography, LinearProgress } from '@mui/material';
import { useState } from 'react';
import First from "./ListSpaceSteps/FirstStep";
import Second from "./ListSpaceSteps/SecondStep";
import Third from "./ListSpaceSteps/ThirdStep";
import Fourth from "./ListSpaceSteps/FourthStep";
import Fifth from "./ListSpaceSteps/FifthStep";
import Sixth from "./ListSpaceSteps/SixthStep";
import Seventh from "./ListSpaceSteps/SeventhStep";
import Eighth from "./ListSpaceSteps/EighthStep";
import Ninth from "./ListSpaceSteps/NinthStep";


function ListSpace() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    type: '',
    _address: '',
    amenities_attended: false,
    amenities_gated: false,
    amenities_electric: false,
    amenities_garage: false,
    amenities_247: false,
    amenities_clearance: false,
    description: '',
    _specialInformation: '',
    photoURL: 'test',
    minStay: 0,
    maxStay: 0,
    minNotice: 0,
    availability: [null, null],
    shortTermRate: 0,
    longTermRate: 0
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
      if (formData.photoURL === '') {
        return alert('Please add a photo of your space');
      } else {
        setPage(page + 1);
        console.log(formData);
      }
    }  else if (page === 4) {
      if (formData.maxStay < 1) {
        return alert('Please enter the maximum length a user can rent your space');
      } else {
        setPage(page + 1);
        console.log(formData);
      }
    }  else if (page === 5) {
      if (formData.availability === '') {
        return alert('Please select the availability of your space from the calendar');
      } else {
        setPage(page + 1);
        console.log(formData);
      }
    }  else if (page === 6) {
      if (formData.basePrice < 1) {
        return alert('Please enter the base price for your space');
      } else {
        setPage(page + 1);
        console.log(formData);
      }
    }
  }

  const formPage = () => {
    switch (page) {
      case 0:
        return <First formData={formData} setFormData={setFormData} />;
      case 1:
        return <Second formData={formData} setFormData={setFormData} />;
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
        return <Eighth formData={formData} setFormData={setFormData} />
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
      }}
    >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '50vh',
        minWidth: '70vh',
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
                sx={{
                  display: 'flex'
                }}
                onClick={() => setPage(page - 1)}
              >BACK</Button>
            }
            <Button
              onClick={handleSubmit}
              className="listing-next-button"
              variant="contained"
              sx={{
                marginLeft: '8px'
              }}
            >
              { page === 7 ? "SUBMIT" : "NEXT" }
            </Button>
          </Box>
        </Box>
      <Box>
        <LinearProgress variant="determinate" value={((page + 1) * 100) / (8 - 1)} />
      </Box>
      </Box>
    </Box>
  </Box>
  );
}
export default ListSpace;