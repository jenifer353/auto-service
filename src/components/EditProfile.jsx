import React, { Component } from 'react'
import _ from 'lodash'
import { loadCurrent } from '../actions/accounts'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import ImageUploader from 'react-images-upload'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import { save } from '../api/accounts'

const Form = reduxForm({form: 'profileForm'})(({
  initialImages,
  account,
  handleSubmit,
  submitting,
  onDrop
}) =>
  <form onSubmit={handleSubmit} style={{ padding: 20 }}>
    <FormHelperText>{account.isService ? 'Назва' : "Ім'я"}</FormHelperText>
    <Field
        name='name'
        type='text'
        component={TextField}
        placeholder={account.isService ? 'Назва' : "Ім'я"}
        fullWidth />
    <Grid container spacing={16}>
      {initialImages.map(img =>
        <Paper key={img} style={{
          margin: 10,
          width: 100,
          height: 100,
          backgroundSize: 'cover',
          backgroundImage: `url("${img}")`
        }} />
      )}
    </Grid>
    <ImageUploader
        withIcon={true}
        withPreview={true}
        buttonType='button'
        buttonText='Завантажте зображення'
        onChange={onDrop}
        label='Максимальний розмір: 5Мб, дозволено: jpg/gif/png'
        imgExtension={['.jpg', '.gif', '.png']}
        maxFileSize={5242880}
        />
    {account.isService && (
      <div>
        <FormHelperText>Адреса</FormHelperText>
        <Field
            name='address'
            type='text'
            component={TextField}
            placeholder='Адреса'
            fullWidth />
      </div>
    )}
    <FormHelperText>Електронна адреса</FormHelperText>
    <Field
        name='email'
        type='email'
        component={TextField}
        placeholder='Електронна адреса'
        fullWidth />
    <Button
        style={{ marginTop: '20px' }}
        type='submit'
        disabled={submitting}
        variant='raised'
        color='primary'>
        Зберегти
    </Button>
  </form>
)

class EditPage extends Component {
  constructor() {
    super()
    this.state = {
      images: []
    }
  }

  onDrop(filesData) {
    this.setState({ images: filesData })
  }

  render() {
    const handleSubmit = (data) => {
      const { images } = this.state
      const { account, loadCurrent } = this.props
      const initialImages = account.images || []
      const item = {
        ...data,
        images: _.flatten([initialImages, images])
      }
      return save(item).then(() => {
        loadCurrent().then(() =>
          this.props.history.push('/profile')
        )
      })
    }

    const { submitting, account } = this.props
    const initialImages = account.images || []

    return (
      <Paper>
        <Form
          initialImages={initialImages}
          submitting={submitting}
          onSubmit={handleSubmit}
          initialValues={account}
          account={account}
          onDrop={(_, f) => this.onDrop(f)} />
      </Paper>
    )
  }
}

export default connect(
  (store, props) => ({
    account: store.accounts.current
  }),
  (dispatch) => bindActionCreators({ loadCurrent }, dispatch)
)(EditPage)
