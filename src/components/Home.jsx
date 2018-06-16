import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load as loadItems } from '../actions/realty'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const defaultImage = 'https://newhomelistingservice.com/assets/default_logo/large_emg_default-04cb60da994cb5a009f5f7640a7881a7b035e7bddba555c218b5e084b2a64f93.jpg'

class Home extends Component {
  componentWillMount() {
    const { loadingItems, lastLoaded, loadItems } = this.props
    if ( !loadingItems && !lastLoaded ) loadItems()
  }

  render() {
    const { items, loadingItems, lastLoaded } = this.props
    return (
      <div>
        {items.map(flat =>
          <Card key={flat._id}>
            <CardMedia
              style={{ paddingBottom: '150px' }}
              image={flat.image || defaultImage}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {flat.name}
              </Typography>
              <Typography component="p">
                {flat.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Бронювати
              </Button>
              <Button size="small" color="primary">
                Деталі
              </Button>
            </CardActions>
          </Card>
        )}
      </div>
    )
  }
}

export default connect(
  (store) => store.realty,
  (dispatch) => bindActionCreators({ loadItems }, dispatch)
)(Home)
