import { Card, CardContent, CardActionArea, ButtonBase, Box, Stack, Button, Typography, TextField, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { textAlign } from '@mui/system';

function First({ formData, setFormData }) {

  const handleClick = (e) => {
    console.log(e.target)
    setFormData({
      ...formData,
      type: e.target.name,
    });
    setTimeout(() => {
      if (document.querySelector('.listing-next-button')) {
        document.querySelector('.listing-next-button').click();
      }
    }, 250)
  }

  return (
  <>
    <Typography
      sx={{
        display: 'flex',
        flexGrow: '1',
        maxHeight: '30px',
        alignItems: 'center'
      }}
    >
      What type of space will guests have?
    </Typography>
    <Box
      sx={{
        margin: '1rem 0',
      }}
    >
      <FormControl
        sx={{
          marginLeft: '1rem',
          display: 'flex',
          justifyContent: 'center',
          flexGrow: '1'
        }}
      >
       <Stack spacing={2}>
        <Button
          value="Covered"
          name="Covered"
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'flex-start',
          }}
          onClick={handleClick}
        >
          <Box
            component="span"
            sx={{
              fontSize: '14px',
              paddingBottom: '5px',
              pointerEvents: 'none'
            }}
          >
            Covered Space
          </Box>
          <Box
            component="span"
            sx={{
              fontSize: '10px',
              pointerEvents: 'none'
            }}
          >
            Guests will have access to a covered space.
          </Box>
        </Button>
        <Button
          value="Uncovered"
          name="Uncovered"
          variant="outlined"
          onClick={handleClick}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'flex-start'
          }}
        >
           <Typography
            sx={{
              fontSize: '14px',
              paddingBottom: '5px',
              pointerEvents: 'none'
            }}
          >
            Uncovered Space
          </Typography>
          <Typography
            sx={{
              fontSize: '10px',
              pointerEvents: 'none'
            }}
          >
            Guests will have access to an uncovered space.
          </Typography>
        </Button>
        <Button
          value="Street"
          name="Street"
          variant="outlined"
          onClick={handleClick}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'flex-start'
          }}
        >
           <Typography
            sx={{
              fontSize: '14px',
              paddingBottom: '5px',
              pointerEvents: 'none'
            }}
          >
            Street Parking
          </Typography>
          <Typography
            sx={{
              fontSize: '10px',
              pointerEvents: 'none'
            }}
          >
            Guests will have access to a reserved space on the street.
          </Typography>
        </Button>
      </Stack>
      </FormControl>
    </Box>
  </>
  );
}
export default First;