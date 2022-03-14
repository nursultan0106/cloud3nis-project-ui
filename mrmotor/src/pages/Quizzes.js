// material
import { Grid, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';

// components
import Page from '../components/Page';
import { QuizCard } from '../sections/@app/quiz';

// ----------------------------------------------------------------------

export default function Quizzes() {
  const [Data, setData] = useState({
    quizzes: []
  });
  const requestOptions = {
    method: 'GET'
  };
  fetch('https://mrmotor.herokuapp.com/quiz', requestOptions)
    .then(async (response) => {
      const data = await response.json();
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      localStorage.setItem('quizzes', JSON.stringify(data));
      setData(data);
    })
    .catch((error) => {
      console.error('There was an error!', error);
      alert('Wrong data inputed!');
      window.location.reload(false);
    });
  return (
    <Page title="Quizzes | Mr.Motor">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Quizzes
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {Data.quizzes.map((post, index) => (
            <QuizCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
