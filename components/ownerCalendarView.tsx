import * as React from 'react';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import styles from '../styles/ownerHistoryDash.module.css';

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function DatePicker() {
  const [value, setValue] = React.useState(new Date('2022-04-07'));
  console.log('selected Value: ', value)
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  return (
    <div>
      <LocalizationProvider className="owner-calendar-view" dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              highlightedDays.indexOf(day.date()) >= 0;

            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={isSelected ? <RocketLaunchIcon sx={{ color: '#0266F9' }} /> : undefined}
              >
                <PickersDay {...DayComponentProps} />
              </Badge>
            );
          }}
        />
      </LocalizationProvider>
    </div>
  );
}