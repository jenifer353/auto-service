import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import ServiceItem from './ServiceItem.jsx'

export default class ServicesList extends Component {
  componentWillMount() {
    const { loadingItems, loadItems } = this.props
    if ( !loadingItems ) loadItems()
  }

  render() {
    const { items, loadingItems, buttonsComponent } = this.props
    if (loadingItems) return <LinearProgress />

    if (items && items.length < 1) return (
      <Typography
        style={{ padding: 30, textAlign: 'center' }}
        variant='title'
        component='h2'>
        Жодного сервісу
      </Typography>
    )

    return (
      <Grid container spacing={16} >
        { loadingItems && <LinearProgress /> }
        { items &&items.map(item =>
          <ServiceItem
            buttonsComponent={buttonsComponent}
            key={item._id}
            item={item} />
        )}
      </Grid>
    )
  }
}
