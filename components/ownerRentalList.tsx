import * as React from 'react';
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
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function O_RentalList() {
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box className="owner-history-table" sx={{ flexGrow: 1, maxWidth: 752 }}>
      <FormGroup row>
      </FormGroup>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Scheduled Rentals
          </Typography>
          <Demo>
            <List>
              {generate(
                <ListItem>
                  <ListItemAvatar>
                    <AccountCircleRoundedIcon fontSize="large">
                      <FolderIcon />
                    </AccountCircleRoundedIcon>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Full Name | $25.00"
                    secondary="Cancel Reservation"
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}