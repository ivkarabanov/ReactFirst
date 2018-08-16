import React from "react";
import AddFishForm from './AddFishForm';
import {formatPrice} from '../helpers';
import PropTypes from 'prop-types';

class Inventory extends React.Component{
constructor(){
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, key){
        const fish = this.props.fishes[key];
        const updatedFish = {...fish,
            [e.target.name]: e.target.value};
        console.log(updatedFish);    
        this.props.updateFish(key,updatedFish);

    }

    renderInventory(key){
        const fish = this.props.fishes[key];
        return (
        <div className="fish-edit" key={key}>
            <input type="text" name="name" placeholder="Fish Name" value={fish.name}
                onChange={(e)=>this.handleChange(e,key)}/>
            <input type="text" name="price" placeholder="Fish Price" value={formatPrice(fish.price)}
                onChange={(e)=>this.handleChange(e,key)}/>
            <select type="text" name="status" placeholder="Fish Status" value={fish.status}
                onChange={(e)=>this.handleChange(e,key)}>
                <option value="available">Fresh</option>
                <option value="unavailable">Sold Out</option>
            </select>
            <textarea type="text" name="desc" placeholder="Fish Desc" value={fish.desc} onChange={(e)=>this.handleChange(e,key)}></textarea>
            <input type="text" name="image" placeholder="Fish Image" value={fish.image} onChange={(e)=>this.handleChange(e,key)}/>
            <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
        </div>)
    }

    render(){
        return(
            <div className="inventory">
                <h2>Inventory!</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

Inventory.propTypes = {
    addFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    fishes: PropTypes.object.isRequired
};

export default Inventory;