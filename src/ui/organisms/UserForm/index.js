import React from 'react';
import * as T from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { Formik } from 'formik';
import { db } from 'src/firebase.db';
import { currencies, sexTypes } from 'constants/common';

const styles = () => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  submit: {
    marginTop: '30px'
  }
});

const propTypes = {
  classes: T.object.isRequired,
  onSubmitComplete: T.func.isRequired,
  userData: T.object.isRequired
};

const UserForm = ({ classes, onSubmitComplete, userData }) => {
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
        db.collection('users').doc(userData.uid).set(values, { merge: true })
          .then(() => {
            setSubmitting(false);
            onSubmitComplete();
          });
      }}
    >
      {formikProps => {
        const {
          values,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = formikProps;

        return (
          <form
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <FormControl
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
            <TextField
              id="currency"
              name="currency"
              select
              label="Валюта"
              value={values.currency}
              onChange={handleChange}
              helperText="Выберите тип валюты"
              margin="normal"
            >
              {currencies.map(option => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  title={option.title}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
            <TextField
              id="sex"
              name="sex"
              select
              label="Пол"
              value={values.sex}
              onChange={handleChange}
              helperText="Выберите пол"
              margin="normal"
            >
              {sexTypes.map(option => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              disabled={isSubmitting}
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
