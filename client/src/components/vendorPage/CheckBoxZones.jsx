import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';


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