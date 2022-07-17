import {React,useContext} from 'react';
import orderIDfun from 'order-id'

import Card from '@material-ui/core/Card'; 
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';


//import { OrderContext } from '../../contexts/OrderContext.jsx';
import { basketListContext } from '../../contexts/OrderListContext.jsx';

const useStyle=makeStyles({
    root:{
        margin:"0.5rem,auto",
        textAlign:"center"
    }
})

// פרטים של הקונה
// פרטים של הקנייה
// תזכורת לגבי המשלוח
function PurchasingPage () {
    const classes= useStyle()

    //GENERATE ORDER ID usning order=ID NPM package
    const orderID = orderIDfun('key')
    const id = orderID.generate()
    console.log (id)
    

    //const {basketList,setBasketList} = useContext (OrderContext)
    const {basketList} = useContext (basketListContext)

    //FILL THE CUSTOMER DETAILS
    function handleSubmit (){
        console.log ("submit")
        return (
            <p> xxx הזמנה מספר </p>
        )
    }
    

    return (
        
        <Container className= {classes.root} component="div" maxWidth="md">
        
            {/* THE CUSTOMER DETAILS */}
            <div> 
                <h1>this is purashing page</h1>
                <form onSubmit={handleSubmit}>
                    <input placeholder = "בחר מקום המשלוח"/>
                    <br/>
                    <h4> החבילה תגיע ביום שני בין12:00 ל15:00</h4>
                    <br/>
                    <input placeholder = "שם מלא" type="text" id="name" name="name"/> 
                    <br/>
                    <input placeholder = "נייד"/>
                    <br/>
                
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        
        
            <Card >
            {basketList.map (function (basketList,index){
           
            return(
            
            
                <div>

                    <Grid container>
                        <Grid item xs={3}>
                        
                            <CardMedia
                          
                            image="https://applemagazine.com/wp-content/uploads/2021/09/146898-phones-feature-the-best-apple-iphone-photos-ever-taken-image1-ydter7skel.jpg"
                            title="Contemplative Reptile"
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <CardContent > 
                                <Typography gutterBottom variant="h5" component="h2">
                                    {basketList.productHeader}
                                </Typography>
                            
                                {/* <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                                    {order.productDescription}
                                </Typography> */}

                                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                                    {basketList.units} 
                                </Typography>
                            </CardContent>
                                
                            <CardActions style={ { padding:"0px 16px 0px 16px" }} >
                                <Typography variant="body2" color="primary" component="p" style={{fontWeight:"bold"}}>
                                    כמות: {basketList.quantity} 
                                </Typography>
                            
                                <Typography variant="body2" color="primary" component="p" style={{fontWeight:"bold" , marginRight:"auto"}}>
                                {parseFloat(basketList.price)*(basketList.quantity)}
                                {' \u20AA'} {'כולל מע"מ'}
                                </Typography>
                            </CardActions>
                        </Grid>
                    
                    </Grid>
            
                </div>
            )
            })}
            </Card>
        
        
         </Container>
    
    )
}     
                
export default PurchasingPage