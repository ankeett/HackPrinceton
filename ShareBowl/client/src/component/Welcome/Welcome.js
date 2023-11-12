import React from 'react'
import {Container, Paper,CardMedia,Grid} from '@mui/material'

const Welcome = () => {
  return (
    <Grid container component="main" className='items-center justify-center' >
  <Paper  className=' shadow-none max-w-3xl'>
    <h2 className='text-center'>Welcome to ShareBowl!</h2>
      <CardMedia className='object-contain'
                    component="img"
                    height={500}
                    width={10}
                    image={require('../../images/bowl.jpeg')}
                    alt="Construction"
                />
        <p className='text-center'>Pick a bowl and start sharing!</p>
    </Paper>
    </Grid>

  )
}

export default Welcome