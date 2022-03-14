import { Link as RouterLink, Navigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { UpdateForm } from '../sections/authentication/update';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: '0 auto',
  display: 'flex',
  minHeight: '60vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(0, 0)
}));

// ----------------------------------------------------------------------

export default function Settings() {
  if (localStorage.getItem('token') === null) {
    return <Navigate to="/app/home" />;
  }
  return (
    <RootStyle title="Settings | Mr. Motor">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Update your personal information
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Edit data below</Typography>
          </Box>
          <UpdateForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
