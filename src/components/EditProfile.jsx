import React, { Component } from 'react'
import _ from 'lodash'
import { loadCurrent } from '../actions/accounts'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import ImageUploader from 'react-images-upload'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { save } from '../api/accounts'

const renderWorks = ({ fields }) =>
  <div>
    {fields.map((e, i) =>
      <Grid container spacing={8} key={i}>
        <Grid item xs={9}>
          <Field
              name={`${e}.name`}
              type='text'
              component={TextField}
              placeholder='Назва роботи'
              fullWidth />
        </Grid>
        <Grid item xs={2}>
          <Field
              name={`${e}.price`}
              type='number'
              component={TextField}
              placeholder='Ціна роботи'
              fullWidth />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={() => fields.remove(i)} aria-label="Видалити">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    )}
    <Button
        onClick={() => fields.push({ price: 0 })}
        style={{ marginTop: '10px' }}
        color='primary'>
        Додати послугу
    </Button>
  </div>

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
    {account.isService && (
      <div>
        <FormHelperText>Список послуг</FormHelperText>
        <FieldArray name='works' component={renderWorks} />
      </div>
    )}

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
          this.props.history.push('/profile/my')
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
