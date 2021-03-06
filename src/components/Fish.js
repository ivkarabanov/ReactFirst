import React from "react";
import {formatPrice} from '../helpers'
import PropTypes from 'prop-types';

class Fish extends React.Component{
    handleClick =() => {
        this.props.addToOrder(this.props.index);
    }
    render() {  
        const {image,name,price,status, desc} = this.props.details;
        const isAvaiable = status === 'available'
        return (
        <li className="menu-fish">
         <img src={image} alt={name}/>
         <h3 className="fish-name">{name}
         <span className="price">{formatPrice(price)}</span>
         </h3>
         <p>{desc}</p>
         <button disabled={!isAvaiable} onClick={this.handleClick}>
            {isAvaiable? 'Add To Cart' : 'Sold Out!'}</button>
        </li>
    )
    }
}

Fish.propTypes={
    details : PropTypes.object.isRequired,
    index : PropTypes.number.isRequired, 
    addToOrder : PropTypes.func.isRequired
};

export default Fish;