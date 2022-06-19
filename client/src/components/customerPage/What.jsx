import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const head_P1 = "סחורה משובחת וטרייה מהחקלאים";
const head_P2 = "ניתן להזמין עד ליום רביעי שעה 20:00";
const head_P3 = "הזמנות יסופקו ביום חמישי"

function What (){
    return(
        <div>
            <Container component="div" maxWidth="lg"  >
                <Grid container spacing={2}  
                    style={{textAlign:"center"}} justify="center"
                    >
                    <Grid item xs={12} lg={4}>
                        <Typography variant= 'h5' >
                        {head_P1}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Typography variant= 'h5' >
                        {head_P2}
                        </Typography>   
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Typography variant= 'h5' >
                        {head_P3}
                        </Typography>  
                        
                    </Grid>
                </Grid>

            </Container>
            
        </div>
         
    )

}

export default What 