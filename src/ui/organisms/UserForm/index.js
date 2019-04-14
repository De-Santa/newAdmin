import React from 'react';
import * as T from 'prop-types';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { Formik } from 'formik';
import { db, firebase } from 'src/firebase.db';
import { currencies, sexTypes } from 'constants/common';

const styles = (theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '6px'
  },
  fieldsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    gridColumnGap: '12px',
    marginBottom: '30px',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
    }
  },
  submit: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'center',
      marginBottom: '21px'
    }
  }
});

const propTypes = {
  classes: T.object.isRequired,
  fetchUser: T.func.isRequired,
  userData: T.object.isRequired
};

const UserForm = ({ classes, fetchUser, userData, ...props }) => {
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
        db.collection('users').doc(userData.uid).update(
          { ...values, _version: firebase.firestore.FieldValue.increment(1) }
        ).then(() => {
          setSubmitting(false);
          fetchUser();
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
            {...props}
          >
            <div className={classes.fieldsWrapper}>
              <TextField
                disabled={isSubmitting}
                fullWidth
                id="age"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Лет</InputAdornment>,
                  max: '100',
                  min: '5',
                  step: '1'
                }}
                label="Возраст"
                placeholder="Укажите возраст"
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                variant="outlined"
                value={values.age}
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
              />
              <TextField
                disabled={isSubmitting}
                id="currency"
                name="currency"
                select
                fullWidth
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
              />
              <TextField
                disabled={isSubmitting}
                id="sex"
                name="sex"
                select
                fullWidth
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
              />
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
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
