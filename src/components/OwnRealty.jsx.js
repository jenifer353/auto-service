import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadOwn as loadItems } from '../actions/realty'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import RealtyItem from './RealtyItem.jsx'

class OwnRealty extends Component {
  componentWillMount() {
    const { loadingOwn, lastLoadedOen, loadItems } = this.props
    if ( !loadingOwn && !lastLoadedOen ) loadItems()
  }

  render() {
    const { ownItems, loadingOwn } = this.props
    return (
      <Grid>
        { loadingOwn && <LinearProgress /> }
        {ownItems.map(item => <RealtyItem item={item} />)}
      </Grid>
    )
  }
}

export default connect(
  (store) => store.realty,
  (dispatch) => bindActionCreators({ loadItems }, dispatch)
)(OwnRealty)
