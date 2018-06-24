import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadOwn as loadItems, removeItem } from '../actions/realty'
import RealtyList from './RealtyList.jsx'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import CardActions from '@material-ui/core/CardActions'
import { Link } from 'react-router-dom'


class OwnRealty extends Component {
  render() {
    const {
      loadItems,
      removeItem,
      loadingItems,
      items
    } = this.props

    const Buttons = ({ item }) =>
      <CardActions>
        <Button
            component={Link}
            to={`/edit-realty/${item._id}`}
            size="small"
            color="primary">
          Редагувати
        </Button>
        <Button
          onClick={() => removeItem(item._id) }
          size="small"
          color="secondary">
          Видалити
        </Button>
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
            aria-label="Додати"
            component={Link}
            to='/edit-realty/new'>
          <AddIcon />
        </Button>
      </div>
    )
  }
}

export default connect(
  ({ realty }) => ({
    loadingItems: realty.loadingOwn,
    items: realty.ownItems
  }),
  (dispatch) => bindActionCreators({ loadItems, removeItem }, dispatch)
)(OwnRealty)
