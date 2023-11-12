import {Container,Paper, Typography,CardMedia} from '@mui/material'
import React from 'react'

const CheckForget = () => {
  return (
    <div>
        <Container component = 'main' maxWidth ='xs'>
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
                
                <Typography >We will send you an e-mail shortly with a link to reset the password and continue with ShareBowl.</Typography>

            </Paper>
        </Container>

    </div>
  )
}

export default CheckForget