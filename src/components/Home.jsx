import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const data = [
    {
        image: 'http://www.book-a-flat.com/images/paris-salon-2.jpg',
        name: 'Двокімнатна квартира',
        description: 'Тестовий опис квартири'
    },
    {
        image: 'https://www.mcdonaldjoneshomes.com.au/sites/default/files/designs/feature_images/granny-flat-9-living-kitchen-alfresco-r.jpg',
        name: 'Великий дім',
        description: 'Тестовий опис дому'
    }
]

const Home = () =>
    <div>
        {data.map(flat =>
          <Card>
            <CardMedia
              style={{ paddingBottom: '150px' }}
              image={flat.image}
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

export default Home
