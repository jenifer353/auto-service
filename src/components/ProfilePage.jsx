import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withStyles } from '@material-ui/core/styles'
import { loginForm as validate } from '../helpers/validation'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'



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


const ProfilePage = ({ classes }) =>
    <div>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="headline">Автосервіс Шина</Typography>
            <Typography variant="subheading" color="textSecondary">
              м. Рівне, вул. Степана Бандери, буд. 42
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image="http://asp-1c.ru/upload/medialibrary/cf5/tire_service_icon.jpg"
          title="Live from space album cover"
        />
      </Card>


      <h1>Відгуки</h1>
      <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                I
              </Avatar>
            }
            title="Іван Іванов"
            subheader="Червень 9, 2018"
          />
        <CardContent>
            <Typography paragraph>
                Після ремонту двигун працює як новий, ніяких посторонніх звуків. Обслуговуванням задоволений!
              </Typography>
            </CardContent>
      </Card>
    </div>

export default withStyles(styles)(ProfilePage)
