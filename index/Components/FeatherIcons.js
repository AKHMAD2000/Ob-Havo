import Icon from 'react-native-vector-icons/Feather';
import * as React from 'react';


export default function Feather(props) {
    return (
        <Icon
           name={props.name}
           size={props.size}
           style={props.style}
           color={props.color}
           
         />
       );
     }