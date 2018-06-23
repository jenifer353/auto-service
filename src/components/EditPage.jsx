import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import ImageUploader from 'react-images-upload'
import { save } from '../api/realty'

const initV = {
  name: 'test',
  description: 'test'
}

const Form = reduxForm({form: 'loginForm'})(({
  handleSubmit,
  submitting,
  onDrop
}) =>
  <form onSubmit={handleSubmit} style={{ padding: '25px'}}>
    <Field
        name='name'
        type='text'
        component={TextField}
        label='Назва оголошення'
        placeholder='Назва оголошення'
        fullWidth />
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
    <Field
        name='description'
        component='textarea'
        style={{ width: '100%', resize: 'vertical', fontSize: '14px' }}
        rows='6'
        label='Опис оголошення'
        placeholder='Опис оголошення' />
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
  onDrop(filesData) {
    this.setState({ images: filesData })
  }

  render() {
    const handleSubmit = (data) => {
      const images = this.state.images
      const id = this.props.match.params.id
      const item = {...data, images, _id: id === 'new' ? null : id}
      return save(item).then(() => this.props.history.push('/own-realty'))
    }

    const { submitting, initialValues } = this.props
    return (
      <Paper>
        <Form onSubmit={handleSubmit} initialValues={initialValues} onDrop={(_, f) => this.onDrop(f)} />
      </Paper>
    )
  }
}

export default connect(
  (store) => ({ initialValues: initV })
)(EditPage)
