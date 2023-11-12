import React from 'react'
import {Card, CardActionArea, CardMedia, Typography,CardContent} from '@mui/material'
import moment from 'moment'

import { Link } from 'react-router-dom'

const Post = ({p}) => {
  return (
    <Card className="w-[500px]"sx={{ maxWidth: 345 }}>
    <CardActionArea component={Link} to={`/product/${p._id}`}>
      <CardMedia
        component="img"
        alt="post image"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {p.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {p.description}
        </Typography>
        <Typography varient="body3">
          Price: ${p.price}
        </Typography>
        <Typography varient="body3">
          Stock: {p.stock}
        </Typography>
        <Typography varient="body3">
        {moment(p.createdAt).fromNow()}
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Post