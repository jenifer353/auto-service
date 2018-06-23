import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadOwn as loadItems } from '../actions/realty'
import RealtyList from './RealtyList.jsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import { Link } from 'react-router-dom'


class OwnRealty extends Component {
  render() {
    const {
      loadItems,
      loadingItems,
      lastLoaded,
      items
    } = this.props

    const Buttons = ({ item }) =>
      <CardActions>
        <Button size="small" color="primary">
          Редагувати
        </Button>
        <Button size="small" color="secondary">
          Видалити
        </Button>
      </CardActions>

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to='/edit-realty/new'>
              Додати оголошення
            </Button>
          </Toolbar>
        </AppBar>

        <RealtyList
          buttonsComponent={Buttons}
          loadingItems={loadingItems}
          loadItems={loadItems}
          lastLoaded={lastLoaded}
          items={items}>
        </RealtyList>
      </div>
    )
  }
}

export default connect(
  ({ realty }) => ({
    loadingItems: realty.loadingOwn,
    lastLoaded: realty.lastLoadedOwn,
    items: realty.ownItems
  }),
  (dispatch) => bindActionCreators({ loadItems }, dispatch)
)(OwnRealty)
