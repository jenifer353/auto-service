import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadCurrent } from '../actions/accounts'
import { loadAbout as loadReviewsAbout } from '../actions/reviews'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom'

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  cover: {
    width: 151,
    height: 151
  },
  avatar: {
    width: 50,
    height: 50
  }
})

class ProfilePage extends Component {
  componentWillMount() {
    const { loadCurrent, loadReviewsAbout } = this.props
    loadCurrent().then((data) => {
      loadReviewsAbout(data.value.data._id)
    })
  }

  render() {
    const { classes, current, reviews } = this.props
    if (! current) return <LinearProgress />
    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline">{ current.name }</Typography>
              <Typography variant="subheading" color="textSecondary">
                { current.email }
              </Typography>
            </CardContent>
          </div>
          <CardMedia
            className={classes.cover}
            image="http://asp-1c.ru/upload/medialibrary/cf5/tire_service_icon.jpg"
            title="Live from space album cover"
          />
        </Card>

        <Button
            style={{ position: 'absolute', bottom: 20, right: 20 }}
            variant="fab"
            color="primary"
            aria-label="Редагувати"
            component={Link}
            to='/edit-profile'>
          <EditIcon />
        </Button>

        <h1>Відгуки</h1>
        {!reviews && <LinearProgress />}
        {reviews && (
          <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    I
                  </Avatar>
                }
                title="Ігор Нестеренко"
                subheader="Червень 9, 2018"
              />
            <CardContent>
                <Typography paragraph>
                  Після ремонту двигун працює як новий, ніяких посторонніх звуків. Обслуговуванням задоволений!
                  </Typography>
                </CardContent>
          </Card>
        )}
      </div>
    )
  }
}

export default connect(
  (store) => ({
    reviews: store.accounts.current ? store.reviews.byAccount[store.accounts.current._id] : null,
    current: store.accounts.current
  }),
  (dispatch) => bindActionCreators({ loadCurrent, loadReviewsAbout }, dispatch)
)(withStyles(styles)(ProfilePage))
