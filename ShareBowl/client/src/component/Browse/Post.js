import React from 'react'
import {Card, CardActionArea, CardMedia, Typography,CardContent} from '@mui/material'
import { Link } from 'react-router-dom'

const Post = ({user, p}) => {
  return (
    <Card className="w-[300px]"sx={{ maxWidth: 345 }}>
    <CardActionArea component={Link} to={`/product/${p._id}`}>
    <CardMedia
        component="img"
        alt="post image"
        height="200"
        image={p.images[0] ? p.images[0].url : require('./food.png')}
        style={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {p.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {p.description}
        </Typography>
      </CardContent>
      </CardActionArea>
      
    </Card>
  )
}

export default Post