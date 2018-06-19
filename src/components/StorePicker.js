import React from "react";
import {getFunName } from "../helpers"

class StorePicker extends React.Component{
  constructor(){
    super();
    this.goToStore = this.goToStore.bind(this);
  }

  myInput = React.createRef();

  goToStore = (event)=>{
    event.preventDefault();
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`)
  }

  render(){
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
      <h2>Please Enter A Store</h2>  

      <input 
        type='text' 
        placeholder='Store Name'
        ref={this.myInput} required defaultValue={getFunName()}/>
      <button type='submit'>Visit Here</button> 
      </form>  
    )
  }
}

export default StorePicker;
