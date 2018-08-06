import React from "react";
import AddFishForm from './AddFishForm';
import {formatPrice} from '../helpers';


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
            <input type="text" name="price" placeholder="Fish Price" value={formatPrice(fish.price)}/>
            <select type="text" name="status" placeholder="Fish Status" value={fish.status}>
                <option value="available">Fresh</option>
                <option value="unavailable">Sold Out</option>
            </select>
            <textarea type="text" name="desc" placeholder="Fish Desc" value={fish.desc}></textarea>
            <input type="text" name="image" placeholder="Fish Image" value={fish.image}/>
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

export default Inventory;