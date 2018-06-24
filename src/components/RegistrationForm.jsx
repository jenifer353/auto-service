import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'


const Form = ({ handleSubmit, submitting, isService, onTypeChange }) =>
    <form onSubmit={handleSubmit} style={{ padding: '25px'}}>
        <FormControlLabel
            control={
              <Switch
                checked={isService}
                onChange={onTypeChange}
              />
            }
            label="Реєстрація автосервісу"
        />
        <Field
            name='email'
            type='email'
            component={TextField}
            autoComplete='current-email'
            placeholder='Електронна адреса'
            fullWidth />
        <Field
            name='name'
            type='text'
            component={TextField}
            placeholder={ isService ? "Назва" : "Ім'я" }
            fullWidth />
        {isService && (
            <Field
                name='address'
                type='text'
                component={TextField}
                placeholder="Адреса"
                fullWidth />
        )}
        <Field
            name='password'
            type='password'
            component={TextField}
            autoComplete='current-password'
            placeholder='Пароль'
            fullWidth />
        <Field
            name='confirmPassword'
            type='password'
            component={TextField}
            placeholder='Підтвердження паролю'
            fullWidth />
        <Button
            style={{ marginTop: '20px' }}
            type='submit'
            disabled={submitting}
            variant='raised'
            color='primary'>
            Зареєструватись
        </Button>
    </form>

export default reduxForm({form: 'registrationForm'})(Form)
