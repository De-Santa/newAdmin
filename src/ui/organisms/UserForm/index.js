import React from 'react';
import * as T from 'prop-types';
import Button from '@material-ui/core/Button';
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
        db.collection('users').doc(userData.uid).update(values)
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
            <TextField
              disabled={isSubmitting}
              fullWidth
              id="age"
              label="Возраст"
              placeholder="Укажите возраст"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              variant="outlined"
              value={values.age}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              disabled={isSubmitting}
              fullWidth
              id="displayName"
              label="Имя"
              placeholder="Ваше имя"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              value={values.displayName}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              disabled={isSubmitting}
              fullWidth
              id="country"
              label="Страна"
              placeholder="Укажите страну проживания"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              value={values.country}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="currency"
              name="currency"
              select
              label="Валюта"
              placeholder="Тип валюты"
              value={values.currency}
              variant="outlined"
              onChange={handleChange}
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
            <TextField
              autoComplete="email"
              disabled={isSubmitting}
              fullWidth
              id="email"
              label="Email"
              placeholder="Укажите ваш Email"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              value={values.email}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              disabled={isSubmitting}
              fullWidth
              id="hobbies"
              label="Увлечения"
              margin="normal"
              multiline
              placeholder="Расскажите о ваших увлечениях"
              rowsMax="4"
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              value={values.hobbies}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="sex"
              name="sex"
              select
              label="Пол"
              placeholder="Ваш пол"
              value={values.sex}
              variant="outlined"
              onChange={handleChange}
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
