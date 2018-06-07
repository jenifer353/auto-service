import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { loginForm as validate } from '../helpers/validation'
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
        <Button
            type='submit'
            disabled={submitting}
            variant='raised'
            color='primary'>
            Увійти
        </Button>
    </form>

export default reduxForm({form: 'loginForm', validate})(Form)
