// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start'
});


// ----------------------------------------------------------------------

export default function ColorPreview() {
  
  const state = {date: new Date("2021-07-26 10:34:23")};

  return (
    <RootStyle component="span">
      <Typography variant="subtitle2">{state.date.toLocaleDateString()}</Typography>
    </RootStyle>
  );
}
