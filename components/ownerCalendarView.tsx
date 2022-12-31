import * as React from 'react';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import getServerSideProps from '../pages/ownerHistoryDash.tsx'
import styles from '../styles/ownerHistoryDash.module.css';

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function DatePicker(props) {
  const [value, setValue] = React.useState(new Date('2022-12-31'));
  const [highlightedDays, setHighlightedDays] = React.useState(props.dates);
  console.log('Calendar Dates: ', props.dates)

  return (
    <div>
      <LocalizationProvider className={styles.owner_calendar_view} dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={value}
          onChange={(newValue) => {
            let day, reformat;
            if(newValue.$D <= 9) {
              day = `0${newValue.$D}`
            }
            reformat = `${newValue.$y}-${newValue.$M + 1}-${day || newValue.$D }`;
            props.liftDate(reformat);
            setValue(newValue);
          }}
          onMonthChange={(e) => {
            let month;
            if(e.$M < 9) {
              month = `0${e.$M + 1}`;
            }
            let reformat = month || e.$M + 1;
            console.log('reformat: ', reformat);
            console.log('props: ', props)
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
                badgeContent={isSelected ? <FiberManualRecordIcon sx={{ color: '#9c27b0' }} /> : undefined}
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