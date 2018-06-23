import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

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
  }
})

export default withStyles(styles)(({ classes, item, buttonsComponent: Buttons }) =>
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
        </Typography>
        <Typography component="p">
          {item.description}
        </Typography>
      </CardContent>
      <Buttons item={item} />
    </Card>
  </Grid>
)
