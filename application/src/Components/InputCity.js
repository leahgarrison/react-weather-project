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
