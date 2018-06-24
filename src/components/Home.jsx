import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load as loadItems } from '../actions/realty'
import RealtyList from './RealtyList.jsx'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'


class Home extends Component {
  render() {
    const {
      loadItems,
      loadingItems,
      items
    } = this.props

    const Buttons = ({ item }) =>
      <CardActions>
        <Button
          onClick={() => this.setState({ bookPopup: item._id })}
          size="small"
          color="primary">
          Бронювати
        </Button>
        <Button size="small"color="primary">
          Деталі
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
      </div>
    )
  }
}

export default connect(
  ({ realty }) => ({
    loadingItems: realty.loadingItems,
    items: realty.items
  }),
  (dispatch) => bindActionCreators({ loadItems }, dispatch)
)(Home)
