import React from 'react';


export default function InputCity({city, onInputHandler, onSubmitHandler}) {
    return ( 
    <form className="input"> 
        <input  type="text" onChange={onInputHandler} value={city}/>
        <br />
        <button className="input_button" type="submit" onClick={onSubmitHandler}>Search</button>
    </form>
       
    )
   
}
/*
create InputCity component;
    - provide you with a search box for the name of the city ;
    for what you want weather information on

    - has an input fiel
        -you mean props?
        - takes two attributes. the city. and onINputHandler functin


        - update state
*/

