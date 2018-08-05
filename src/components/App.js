import React from 'react';
import Header from "./Header";
import Order from "./Order";
import Fish from './Fish'
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component{
    state = {
        fishes: {},
        order: {}
    };
addFish = (fish) =>{
    const fishes = {...this.state.fishes};
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
        fishes
    });
}
loadSampleFishes = () => {
    this.setState({
        fishes: sampleFishes
    })
}

addToOrder = (key) => {
    const order = {...this.state.order};
    order[key] = order[key] +1 || 1;
    this.setState({order});
}

componentDidMount(){

    var localStorageRef = localStorage.getItem(this.props.match.params.storeId);
    if (localStorageRef){
        this.setState({order: JSON.parse(localStorageRef)});
    }
    this. ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
        context: this,
        state: 'fishes'
    });
}

componentWillUnmount(){
    base.removeBinding(this.ref);
}

componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify( this.state.order));
    console.log('IT updated.');
}

render(){
    return(
    <div className="catch-of-the-day">
        <div className="menu">
            <Header tagline="Fresh Seafood Market"/>
            <ul className="list-of-fishes">
                {Object.keys(this.state.fishes).map(key => 
                    <Fish key={key} index={key}
                    details={this.state.fishes[key]}
                    addToOrder={this.addToOrder}/>)}
            </ul>
        </div>
       <Order order={this.state.order} fishes={this.state.fishes}/>
       <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
    </div>
    )
}
}

export default App;