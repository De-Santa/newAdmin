import React from 'react';
import * as T from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Formik } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import { db } from 'src/firebase.db';

const styles = () => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const propTypes = {
  classes: T.object.isRequired,
  userData: T.object.isRequired
};

const UserForm = ({ classes, userData }) => {
  console.log(userData);
  const {
    age = '',
    country = '',
    currency = '',
    displayName = '',
    email = '',
    hobbies = '',
    sex = ''
  } = userData;

  return (
    <Formik
      initialValues={{
        age, country, currency, displayName, email, hobbies, sex
      }}
      onSubmit={(values, { setSubmitting }) => {
        db.collection('users')
          .doc(userData.uid)
          .set(values, { merge: true });
      }}
    >
      {formikProps => {
        const {
          values,
          // touched,
          // errors,
          // dirty,
          // isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          // handleReset
        } = formikProps;
        return (
          <form
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <FormControl
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="age">Возраст</InputLabel>
              <Input
                id="age"
                name="age"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
              />
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="displayName">Имя</InputLabel>
              <Input
                id="displayName"
                name="displayName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.displayName}
              />
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="country">Страна</InputLabel>
              <Input
                name="country"
                id="country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
              />
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="currency">Валюта</InputLabel>
              <Input
                name="currency"
                id="currency"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.currency}
              />
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                autoComplete="email"
                name="email"
                id="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="hobbies">Увлечения</InputLabel>
              <Input
                name="hobbies"
                id="hobbies"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hobbies}
              />
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="sex">Пол</InputLabel>
              <Input
                name="sex"
                id="sex"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sex}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Сохранить изменения
            </Button>
          </form>
        );
      }}
    </Formik>

  );
};

UserForm.propTypes = propTypes;

export default withStyles(styles)(UserForm);
