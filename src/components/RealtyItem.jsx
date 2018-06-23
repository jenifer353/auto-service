import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const defaultImage = 'https://newhomelistingservice.com/assets/default_logo/large_emg_default-04cb60da994cb5a009f5f7640a7881a7b035e7bddba555c218b5e084b2a64f93.jpg'

export default ({ item, buttonsComponent: Buttons }) =>
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <CardMedia
        style={{ paddingBottom: '150px' }}
        image={item.image || defaultImage}
      />
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
