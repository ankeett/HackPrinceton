import {Container,Paper, Typography,CardMedia} from '@mui/material'
import React from 'react'
import MetaData from '../../MetaData'

const CheckActivate = () => {
  return (
    <div>
        <Container component = 'main' maxWidth ='xs'>
            <MetaData title = "Check Activate"/>
            <Paper elevation={3} className="flex-col align-middle p-10">
                <CardMedia
                    component="img"
                    height="230"
                    image={require('../../images/email.png')}
                    alt="Buy"
                />
                <div className='p-[20px]  mb-[20px] text-center'>
                    <Typography>Thank You!</Typography>
                </div>
                
                <Typography >We will send you a confirmation e-mail shortly with an activation link to start with ShareBowl.</Typography>

            </Paper>
        </Container>

    </div>
  )
}

export default CheckActivate