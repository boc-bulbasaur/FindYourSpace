import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function HistoryToggle(props: any) {
  const [alignment, setAlignment] = React.useState<string | null>('left');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={props.handleToggle}
      aria-label="text alignment"
    >
      <ToggleButton value="renter" aria-label="renter">
        Renter
      </ToggleButton>
      <ToggleButton value="owner" aria-label="owner">
        Owner
      </ToggleButton>
    </ToggleButtonGroup>
  );
}