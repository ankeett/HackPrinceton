import React from 'react'
import {Card, CardActionArea, CardMedia, Typography,CardContent} from '@mui/material'
import Rating from '@mui/material/Rating';
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
        {user!==''
      && user?.role === "user"
      &&
      <Rating
        name="simple-controlled"
        value={p.ratings}
        precision={0.5}
        disabled = {true}
      />}
      </CardContent>
      </CardActionArea>
      
    </Card>
  )
}

export default Post