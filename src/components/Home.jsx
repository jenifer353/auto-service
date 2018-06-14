import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const data = [
    {
        image: 'http://asp-1c.ru/upload/medialibrary/cf5/tire_service_icon.jpg',
        name: 'Автосервіс Шина',
        description: 'м. Рівне, вул. Степана Бандери, буд. 42'
    },
    {
        image: 'http://wworld.com.ua/wp-content/uploads/2018/02/%D0%B0%D0%B2%D1%82%D0%BE%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81-%D1%81%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D0%BA%D0%B0-%D1%88%D1%83%D1%88%D0%B0%D1%80%D1%8B.jpg',
        name: 'Сервіс Ластівка',
        description: 'м. Рівне, вул. Олени Теліги, буд. 23'
    }
]

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

const Home = ({ classes }) =>
    <div>
        {data.map(service =>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="headline">{service.name}</Typography>
                <Typography variant="subheading" color="textSecondary">
                  {service.description}
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              className={classes.cover}
              image={service.image}
              title="Live from space album cover"
            />
          </Card>
      )}
    </div>

export default withStyles(styles)(Home)
