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
  let currentDay;
  let secondaryText;
  //console.log('list props: ', props)
  let matchedDates = [];
  let dummyDates = [];

  if (props.newDate) {
    props.ownerHistory.forEach((rental) => {
      let withTime = new Date(rental.start_time);
      let withoutTime = withTime.toISOString().split('T')[0];

      if (withoutTime === props.newDate) {
        currentDay = withTime;
        matchedDates.push(rental)
        // console.log('current Time: ', withTime < new Date('2022-12-30'))
      }
    })
    if (currentDay < new Date('2022-12-30')) {
      secondaryText = <></>
    }
  }

  return (
    <Box className={styles.owner_history_table}>
      <Typography sx={{
        color: 'white',
        backgroundColor: '#1976d2',
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
            backgroundColor: '#c9c9ce',
            borderRadius: '10px',
            margin: '15px 0px 10px 0px',
          }} key={item.id}>
            <ListItemAvatar>
              <AccountCircleRoundedIcon fontSize="large" sx={{height: '50px', width: '50px', color: 'black'}}></AccountCircleRoundedIcon>
            </ListItemAvatar>
            <ListItemText sx={{color: 'black', paddingLeft: '5%'}}
              primary={`${item.name} | $${item.short_term_rate}.00`}
              secondary= {
              secondaryText || <button onClick={() => {props.removeRecord(item.id)}}>Cancel Reservation</button>
            }
            />
          </ListItem>
            )
            })
          }
      </List>
    </Box>
  );
}