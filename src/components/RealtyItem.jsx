import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  ownLabel: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    float: 'right'
  }
})

const RealtyItem = withStyles(styles)(({ classes, currentUser, item, buttonsComponent: Buttons }) =>
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <GridList className={classes.gridList} cols={2.5}>
        {item.images.map((img, i) => (
          <GridListTile key={img}>
            <img src={img} alt='' />
          </GridListTile>
        ))}
      </GridList>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {item.name}
          <Chip style={{ float: 'right' }} label={`${item.rate} грн/доба`} />
        </Typography>

        <Typography gutterBottom component="div" style={{minHeight: 35}}>
          {currentUser._id === item.user && (
            <Chip label='Власне оголошення' className={classes.ownLabel} />
          )}
          Розмістив: <b>{ item.userName }</b><br/>
        </Typography>

        <Typography component="p">
          {item.description}
        </Typography>
      </CardContent>
      <Buttons item={item} />
    </Card>
  </Grid>
)

export default connect(
  (store) => ({ currentUser: store.users.current })
)(RealtyItem)
