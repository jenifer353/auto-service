import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadServices } from '../actions/accounts'
import ServicesList from './ServicesList.jsx'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'

class Home extends Component {
  render() {
    const {
      currentAccount,
      loadServices,
      loadingItems,
      items
    } = this.props

    const Buttons = ({ item }) =>
      <CardActions>
        <Button
          component={Link}
          to={`/profile/${item._id}`}
          size="small"
          color="primary">
          Детальніше
        </Button>
      </CardActions>

    return (
      <div>
        <ServicesList
          buttonsComponent={Buttons}
          loadingItems={loadingItems}
          loadItems={loadServices}
          items={items}>
        </ServicesList>
      </div>
    )
  }
}

export default connect(
  ({ accounts }) => ({
    currentAccount: accounts.current,
    loadingItems: accounts.loadingServices,
    items: accounts.services
  }),
  (dispatch) => bindActionCreators({ loadServices }, dispatch)
)(Home)
