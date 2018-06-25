import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadBooked as loadItems } from '../actions/realty'
import RealtyList from './RealtyList.jsx'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import EditIcon from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom'


class OwnRealty extends Component {
  render() {
    const {
      loadItems,
      loadingItems,
      items
    } = this.props

    const Buttons = ({ item }) =>
      <CardActions>
      </CardActions>

    return (
      <div>
        <RealtyList
          buttonsComponent={Buttons}
          loadingItems={loadingItems}
          loadItems={loadItems}
          items={items}>
        </RealtyList>

        <Button
            style={{ position: 'absolute', bottom: 20, right: 20 }}
            variant="fab"
            color="primary"
            aria-label="Редагувати"
            component={Link}
            to='/edit-profile'>
          <EditIcon />
        </Button>
      </div>
    )
  }
}

export default connect(
  ({ realty }) => ({
    loadingItems: realty.loadingBooked,
    items: realty.bookedItems
  }),
  (dispatch) => bindActionCreators({ loadItems }, dispatch)
)(OwnRealty)
