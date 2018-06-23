import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import RealtyItem from './RealtyItem.jsx'

export default class RealtyList extends Component {
  componentWillMount() {
    const { loadingItems, lastLoaded, loadItems } = this.props
    if ( !loadingItems && !lastLoaded ) loadItems()
  }

  render() {
    const { items, loadingItems } = this.props
    return (
      <Grid>
        { loadingItems && <LinearProgress /> }
        {items.map(item => <RealtyItem key={item._id} item={item} />)}
      </Grid>
    )
  }
}
