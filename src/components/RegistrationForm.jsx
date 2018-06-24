import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'

const Form = ({ handleSubmit, submitting }) =>
    <form onSubmit={handleSubmit} style={{ padding: '25px'}}>
        <Field
            name='email'
            type='email'
            component={TextField}
            autoComplete='current-email'
            label='Електронна адреса'
            placeholder='Електронна адреса'
            fullWidth />
        <Field
            name='name'
            type='text'
            component={TextField}
            label="Назва"
            placeholder="Назва"
            fullWidth />
        <Field
            name='address'
            type='text'
            component={TextField}
            label="Адреса"
            placeholder="Адреса"
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
            style={{ marginTop: '20px' }}
            type='submit'
            disabled={submitting}
            variant='raised'
            color='primary'>
            Зареєструватись
        </Button>
    </form>

export default reduxForm({form: 'registrationForm'})(Form)
