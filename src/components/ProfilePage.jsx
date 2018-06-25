import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load } from '../actions/accounts'
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
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
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
  },
  table: {
    border: '1px solid #eee',
    marginTop: 10
  }
})

class ProfilePage extends Component {
  componentWillMount() {
    const { load, loadReviewsAbout, match } = this.props
    const id = match.params.id
    if (id !== 'my') load(id)
  }

  render() {
    const { classes, profile, reviews } = this.props
    const id = this.props.match.params.id
    if (! profile) return <LinearProgress />
    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline">{ profile.name }</Typography>
              <Typography variant="subheading" color="textSecondary">
                { profile.email }
              </Typography>

              {profile.isService && (profile.works || []).length > 0 && (
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Назва послуги</TableCell>
                      <TableCell numeric>Ціна (грн)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(profile.works || []).map((work, i) =>
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {work.name}
                        </TableCell>
                        <TableCell numeric>{work.price}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </div>
          {profile.images.length > 0 && (
            <CardMedia
              className={classes.cover}
              image={profile.images[0]} />
          )}
        </Card>

        {id === 'my' && (
          <Button
              style={{ position: 'absolute', bottom: 20, right: 20 }}
              variant="fab"
              color="primary"
              aria-label="Редагувати"
              component={Link}
              to='/edit-profile'>
            <EditIcon />
          </Button>
        )}

        {profile.isService && (
          <div>
            <h1>Відгуки</h1>
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
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  (store, props) => {
    const id = props.match.params.id
    const account = id === 'my' ? store.accounts.current : store.accounts.byId[id]
    return {
      reviews: account ? store.reviews.byAccount[account._id] : null,
      profile: account
    }
  },
  (dispatch) => bindActionCreators({ load, loadReviewsAbout }, dispatch)
)(withStyles(styles)(ProfilePage))
