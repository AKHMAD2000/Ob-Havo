import Icon from 'react-native-vector-icons/Fontisto';
import * as React from 'react';



export default function Icons(props) {
 
  
  if(props.name === '01d'){
    var name = 'day-sunny'
    var color = '#fce100'
  }
  else if(props.name === '02d'){
    var name = 'day-cloudy'
    var color = '#fff'
  }
  else if(props.name === '03d'){
    var name = 'day-cloudy'
    var color = '#fff'
  }
  else if(props.name === '04d'){
    var name = 'cloudy'
    var color = '#fff'
  }
  else if(props.name === '09d'){
    var name = 'rain'
    var color = '#3EB5FF'
  }
  else if(props.name === '10d'){
    var name = 'day-rain'
    var color = '#3EB5FF'
  }
  else if(props.name === '11d'){
    var name = 'day-lightning'
    var color = '#0c0865'
  }
  else if(props.name === '13d'){
    var name = 'snowflake'
    var color = '#fff'
  }
  else if(props.name === '50d'){
    var name = 'fog'
    var color = '#555'
  }
  else if(props.name === '01n'){
    var name = 'night-clear'
    var color = '#fff'
  }
  else if(props.name === '02n'){
    var name = 'night-alt-cloudy'
    var color = '#fff'
  }
  else if(props.name === '03n'){
    var name = 'night-alt-cloudy'
    var color = '#fff'
  }
  else if(props.name === '04n'){
    var name = 'cloudy'
    var color = '#fff'
  }
  else if(props.name === '09n'){
    var name = 'rain'
    var color = '#3EB5FF'
  }
  else if(props.name === '10n'){
    var name = 'night-alt-rain'
    var color = '#3EB5FF'
  }
  else if(props.name === '11n'){
    var name = 'night-alt-lightning'
    var color = '#0c0865'
  }
  else if(props.name === '13n'){
    var name = 'snowflake'
    var color = '#fff'
  }
  else if(props.name === '50n'){
    var name = 'fog'
    var color = '#555'
  }
  if(props.color == 1){
    var color = props.color2
  }
  else {
  }
  return (
   <Icon
      name={name}
      size={props.size}
      style={props.style}
      color={color}
      
    />
  );
}