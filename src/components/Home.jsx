import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { load as loadItems, bookItem } from '../actions/realty'
import RealtyList from './RealtyList.jsx'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormHelperText from '@material-ui/core/FormHelperText'

const BookingForm = reduxForm({form: 'bookingForm'})(({
  handleSubmit,
  onCancel
}) =>
  <form onSubmit={handleSubmit}>
    <FormHelperText>Заселення</FormHelperText>
    <Field
      component={TextField}
      name="bookedFrom"
      label="Заселення"
      type="date"
      fullWidth
    />
    <FormHelperText>Виселення</FormHelperText>
    <Field
      component={TextField}
      name="bookedTo"
      label="Виселення"
      type="date"
      fullWidth
    />
    <DialogActions>
      <Button onClick={onCancel} type='reset' color="secondary">
        Відмінити
      </Button>
      <Button color="primary" type='submit' autoFocus>
        Бронювати
      </Button>
    </DialogActions>
  </form>
)

class Home extends Component {
  constructor() {
    super()
    this.state = {
      openBookingModal: false
    }
  }

  handleClose = () =>
    this.setState({ openBookingModal: false })

  handleSubmit = (data) =>
    this.props.bookItem({
      ...data,
      realty: this.state.openBookingModal
    }).then(this.handleClose)

  render() {
    const {
      currentAccount,
      loadItems,
      bookItem,
      loadingItems,
      items
    } = this.props
    const { openBookingModal } = this.state

    const Buttons = ({ item }) =>
      <CardActions>
        {currentAccount._id !== item.account && (
          <div>
            <Button
              onClick={() => this.setState({ openBookingModal: item.id })}
              size="small"
              color="primary">
              Бронювати
            </Button>
            <Dialog
              open={openBookingModal === item._id}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">Бронюваня "{item.name}"</DialogTitle>
              <DialogContent>
                <BookingForm onCancel={this.handleClose} onSubmit={this.handleSubmit} />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardActions>

    return (
      <div>
        <RealtyList
          buttonsComponent={Buttons}
          loadingItems={loadingItems}
          loadItems={loadItems}
          items={items}>
        </RealtyList>
      </div>
    )
  }
}

export default connect(
  ({ realty, accounts }) => ({
    currentAccount: accounts.current,
    loadingItems: realty.loadingItems,
    items: realty.items
  }),
  (dispatch) => bindActionCreators({ loadItems, bookItem }, dispatch)
)(Home)
