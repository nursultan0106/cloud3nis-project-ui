// material
import { Grid, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';

// components
import Page from '../components/Page';
import { BlogPostCard } from '../sections/@app/blog';
//

// ----------------------------------------------------------------------

export default function Racers() {
  const [Data, setData] = useState({
    posts: []
  });
  const requestOptions = {
    method: 'GET'
  };
  fetch('https://mrmotor.herokuapp.com/posts/get_by_type?type=RACER', requestOptions)
    .then(async (response) => {
      const data = await response.json();
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      localStorage.setItem('racers', JSON.stringify(data));
      setData(data);
    })
    .catch((error) => {
      console.error('There was an error!', error);
      alert('Wrong data inputed!');
      window.location.reload(false);
    });
  return (
    <Page title="Racers | Mr.Motor">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Racers
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {Data.posts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
