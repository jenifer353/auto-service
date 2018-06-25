import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  }
})

const ServiceItem = withStyles(styles)(({ classes, currentAccount, item, buttonsComponent: Buttons }) =>
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <GridList className={classes.gridList} cols={2.5}>
        {item.images && item.images.map((img, i) => (
          <GridListTile key={img}>
            <img src={img} alt='' />
          </GridListTile>
        ))}
      </GridList>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {item.name}
        </Typography>
        <Typography component="p">
          {item.address}
        </Typography>
      </CardContent>
      <Buttons item={item} />
    </Card>
  </Grid>
)

export default connect(
  (store) => ({ currentAccount: store.accounts.current })
)(ServiceItem)
