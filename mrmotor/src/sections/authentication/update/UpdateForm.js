import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function UpdateForm() {
  const navigate = useNavigate();
  const [fieldValue, setFieldValue] = useState('');
  const RegisterSchema = Yup.object().shape({
    nname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required')
  });
  const user = JSON.parse(localStorage.getItem('user'));
  const formik = useFormik({
    initialValues: {
      nname: user.name
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
          name: formik.values.nname,
          email: user.email,
          avatar: fieldValue
        })
      };
      fetch('https://mrmotor.herokuapp.com/users', requestOptions)
        .then(async (response) => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          localStorage.setItem('user', JSON.stringify(data));
          navigate('/app/profile', { replace: true });
        })
        .catch((error) => {
          console.error('There was an error!', error);
          alert('Wrong data inputed!');
          window.location.reload(false);
        });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('nname')}
            error={Boolean(touched.nname && errors.nname)}
            helperText={touched.nname && errors.nname}
          />
          <Button variant="contained" component="label">
            Choose Avatar
            <input
              name="avatar"
              accept="image/*"
              id="contained-button-file"
              type="file"
              hidden
              onChange={(e) => {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                  if (fileReader.readyState === 2) {
                    setFieldValue(fileReader.result);
                  }
                };
                fileReader.readAsDataURL(e.target.files[0]);
              }}
            />
          </Button>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Update information
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
