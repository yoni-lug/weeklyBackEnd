import React, { useEffect, useState } from 'react';
import withStyles from '@mui/styles/withStyles';
import { green } from '@mui/material/colors';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckBoxZones(props) {
  const [delivery, setDelivery] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
  });
  
  
  function handleChange (event) {
    console.log (event.target.name)
    console.log (event.target.checked)
    const isChecked =event.target.checked
    const name= event.target.name
    setDelivery({ ...delivery, [name]: isChecked })
    
      
    }

    useEffect(() => {
      props.delivery (delivery) // This is be executed when `loading` state changes
  }, [delivery])

    


  return (
        
    <Paper margin={5} variant="outlined" style={{backgroundColor:"transparent"}}>
        <h3>  בחר איזור חלוקה</h3>
        <FormGroup row 
            // style={{borderStyle:"solid"}}
            >
        <FormControlLabel
            control={
            <GreenCheckbox
            checked={delivery.checkedA} 
            onChange={handleChange}
            name="checkedA" />}
            label="Custom color"
        />
        <FormControlLabel
            control={
            <GreenCheckbox
            checked={delivery.checkedB} 
            onChange={handleChange}
            name="checkedB" />}
            label="עזר"
        />
        <FormControlLabel
            control={
            <GreenCheckbox
            checked={delivery.checkedC} 
            onChange={handleChange}
            name="checkedC" />}
            label="תל גזר"
        />
        <FormControlLabel
            control={
            <GreenCheckbox
            checked={delivery.checkedD} 
            onChange={handleChange}
            name="checkedD" />}
            label="שקר כלשהו"
        />
        
        </FormGroup>
    </Paper>
    
  );
}