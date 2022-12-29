// import * as React from 'react';
// import {useState} from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// // import Avatar from '@mui/material/Avatar';
// // import IconButton from '@mui/material/IconButton';
// import FormGroup from '@mui/material/FormGroup';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import FolderIcon from '@mui/icons-material/Folder';
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import styles from '../styles/ownerHistoryDash.module.css';

// function generate(element, rentals) {

//   let userRentals = rentals || [];

//   return userRentals.map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }

// const Demo = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
// }));

// export default function O_RentalList(props) {
//   const [secondary, setSecondary] = useState(false);
//   const [rentalHistory, setRentalHistory] = useState(props.ownerHistory)
//   let matchedDates = [];

//   if (props.newDate) {
//     //console.log('New Date Defined', props)
//     props.ownerHistory.forEach((rentals) => {
//       let withTime = new Date(rentals.start_time);
//       let withoutTime = withTime.toISOString().split('T')[0];
//       console.log(withoutTime === props.newDate)
//       if (withoutTime === props.newDate) {
//         let key = -1;
//         key += 1
//         matchedDates.push(key)
//         console.log('matchedDates: ', matchedDates)
//       }
//     })
//   }

//   return (
//     <Box className={styles.owner_history_table}>
//       <FormGroup row>
//       </FormGroup>

//       <Grid>
//         <Grid>
//           <Typography sx={{
//             color: 'white',
//             backgroundColor: '#1b2139',
//             padding: '1rem',
//             textAlign: 'center',
//             borderRadius: '10px',

//             }} variant="h6" component="div">
//             Scheduled Rentals
//           </Typography>
//           <Demo>
//             <List sx={{
//                   borderRadius: '10px',
//                 }}>
//               {generate(
//                 <ListItem sx={{
//                   backgroundColor: '#F5F5F5',
//                   borderRadius: '10px',
//                   margin: '15px 0px 10px 0px',
//                 }}>
//                   <ListItemAvatar>
//                     <AccountCircleRoundedIcon fontSize="large" sx={{
//                       height: '50px',
//                       width: '50px'
//                     }}>
//                       <FolderIcon />
//                     </AccountCircleRoundedIcon>
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary="Full Name | $25.00"
//                     secondary= {<button onClick={() => {console.log('Clicked')}}>Cancel Reservation</button>}
//                   />
//                 </ListItem>,
//                 matchedDates
//               )}
//             </List>
//           </Demo>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }



import * as React from 'react';
import {useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import styles from '../styles/ownerHistoryDash.module.css';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function O_RentalList(props) {

  const [rentalHistory, setRentalHistory] = useState(props.ownerHistory)
  let matchedDates = [];

  if (props.newDate) {
    props.ownerHistory.forEach((rental) => {
      let withTime = new Date(rental.start_time);
      let withoutTime = withTime.toISOString().split('T')[0];
      console.log(withoutTime === props.newDate)
      if (withoutTime === props.newDate) {
        matchedDates.push(rental)
        // console.log('matchedDates: ', matchedDates)
      }
    })
  }

  return (
    <Box className={styles.owner_history_table}>
      <Typography sx={{
        color: 'white',
        backgroundColor: '#1b2139',
        padding: '1rem',
        textAlign: 'center',
        borderRadius: '10px',
        }} variant="h6" component="div">
        Scheduled Rentals
      </Typography>
      <List sx={{borderRadius: '10px'}}>
          {
            matchedDates.map((item) => {
            return (
            <ListItem sx={{
            backgroundColor: '#F5F5F5',
            borderRadius: '10px',
            margin: '15px 0px 10px 0px',
          }} key={item.id}>
            <ListItemAvatar>
              <AccountCircleRoundedIcon fontSize="large" sx={{height: '50px', width: '50px'}}></AccountCircleRoundedIcon>
            </ListItemAvatar>
            <ListItemText sx={{paddingLeft: '5%'}}
              primary={`${item.name} | $${item.short_term_rate}.00`}
              secondary= {<button onClick={() => {console.log('Clicked')}}>Cancel Reservation</button>}
            />
          </ListItem>
            )
            })
          }
      </List>
    </Box>
  );
}