import React, { Component } from 'react'
import _ from 'lodash'
import { loadItem } from '../actions/realty'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import ImageUploader from 'react-images-upload'
import Grid from '@material-ui/core/Grid'
import { save } from '../api/realty'

const Form = reduxForm({form: 'loginForm'})(({
  initialImages,
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
  constructor() {
    super()
    this.state = {
      loading: false,
      images: []
    }
  }

  componentWillMount() {
    const id = this.props.match.params.id
    const { loading, initialValues } = this.props
    if (id === 'new' || initialValues || loading) return
    this.props.loadItem(id).then(() => this.setState({ loading: false }))
    this.setState({ loading: true })
  }

  onDrop(filesData) {
    this.setState({ images: filesData })
  }

  render() {
    const handleSubmit = (data) => {
      const { images } = this.state
      const { initialValues } = this.props
      const initialImages = (initialValues && initialValues.images) || []
      const id = this.props.match.params.id
      const item = {
        ...data,
        images: _.flatten([initialImages, images]),
        _id: id === 'new' ? null : id
      }
      return save(item).then(() => this.props.history.push('/own-realty'))
    }

    const { submitting, initialValues } = this.props
    if (this.state.loading) return <LinearProgress />
    const initialImages = (initialValues && initialValues.images) || []
    return (
      <Paper>
        <Form
          initialImages={initialImages}
          submitting={submitting}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          onDrop={(_, f) => this.onDrop(f)} />
      </Paper>
    )
  }
}

export default connect(
  (store, props) => ({
    initialValues: store.realty.byId[props.match.params.id]
  }),
  (dispatch) => bindActionCreators({ loadItem }, dispatch)
)(EditPage)
