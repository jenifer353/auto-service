import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { loginForm as validate } from '../helpers/validation'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'

const Form = ({ handleSubmit, submitting }) =>
    <form onSubmit={handleSubmit} style={{ padding: '25px'}}>
        <Field
            name='email'
            type='email'
            component={TextField}
            autoComplete='current-email'
            label='Електронна пошта'
            placeholder='Електронна пошта'
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
            style={{ marginTop: '20px' }}
            type='submit'
            disabled={submitting}
            variant='raised'
            color='primary'>
            Увійти
        </Button>
    </form>

export default reduxForm({form: 'loginForm', validate})(Form)
