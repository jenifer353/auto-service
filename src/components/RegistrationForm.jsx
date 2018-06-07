import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { registrationForm as validate } from '../helpers/validation'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'

const Form = ({ handleSubmit, submitting }) =>
    <form onSubmit={handleSubmit}>
        <Field
            name='username'
            type='text'
            component={TextField}
            autoComplete='current-user'
            label='Логін'
            placeholder='Логін'
            fullWidth />
        <Field
            name='password'
            type='password'
            component={TextField}
            autoComplete='current-password'
            label='Пароль'
            placeholder='Пароль'
            fullWidth />
        <Field
            name='confirmPassword'
            type='password'
            component={TextField}
            label='Підтвердження паролю'
            placeholder='Підтвердження паролю'
            fullWidth />
        <Button
            type='submit'
            disabled={submitting}
            variant='raised'
            color='primary'>
            Зареєструватись
        </Button>
    </form>

export default reduxForm({form: 'registrationForm', validate})(Form)
