import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadOwn } from '../actions/requests'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const Item = ({ title, content, onRemove }) =>
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          { title }
        </Typography>
        <Typography component="p">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        {onRemove && (
          <Button onClick={onRemove} size="small" color="secondary">
            Завершити
          </Button>
        )}
      </CardActions>
    </Card>
  </Grid>

class Requests extends Component {
  componentWillMount() {
    const { loadOwn, loading, currentAccount } = this.props
    if (loading) return
    loadOwn()
  }

  handleRemove = () =>
    console.log('remove')

  render() {
    const {
      currentAccount,
      loading,
      requests
    } = this.props

    if (loading) return <LinearProgress />

    const asService = requests.filter(r => r.service === currentAccount._id)
    const asCustomer = requests.filter(r => r.user === currentAccount._id)
    const fmt = (text) => text.split('\n').map((item, key) =>
        <span key={key}>{item}<br/></span>
    )

    console.log(asService)

    return (
      <Grid container spacing={16} >
        {asService.length > 0 && asService.map(item =>
          <Item
            key={item._id}
            title={item.userItem.name}
            content={fmt(item.description)}
            onRemove={this.handleRemove} />
        )}

        {asCustomer.length > 0 && asCustomer.map(item =>
          <Item
            key={item._id}
            title={item.serviceItem.name}
            content={fmt(item.description)} />
        )}
      </Grid>
    )
  }
}

export default connect(
  ({ requests, accounts }) => ({
    currentAccount: accounts.current,
    loading: requests.loading,
    requests: requests.items
  }),
  (dispatch) => bindActionCreators({ loadOwn }, dispatch)
)(Requests)
