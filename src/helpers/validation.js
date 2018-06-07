export const password = (value) => {
    if (!value) return 'Заповніть поле'
    else if (!/^[a-z0-9_]{3,20}$/i.test(value)) return 'Некоректний пароль'
}

export const username = (value) => {
    if (!value) return 'Заповніть поле'
    else if (!/^[a-z0-9_]{3,20}$/i.test(value)) return 'Некоректний логін'
}

export const confirmPassword = (pass, confirmPass) => {
    const error = password(confirmPass)
    if (error) return error
    if (pass !== confirmPass) return 'Ваші паролі не збігаються'
}

export const loginForm = (values) => ({
    username: username(values.username),
    password: password(values.password)
})

export const registrationForm = (values) => ({
    ...loginForm(values),
    confirmPassword: confirmPassword(values.password, values.confirmPassword)
})
