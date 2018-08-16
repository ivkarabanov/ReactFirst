import React from 'react';
import Header from "./Header";
import Order from "./Order";
import Fish from './Fish'
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component{

    constructor(){
        super();

        this.updateFish = this.updateFish.bind(this);
        this.addFish = this.addFish.bind(this);
        this.loadSampleFishes = this.loadSampleFishes.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);

        this.state = {
            fishes: {},
            order: {}
        };
    }

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

removeFromOrder = (key) =>{
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
}

updateFish(key, fish){
    const fishes = {...this.state.fishes};
    fishes[key] = fish;
    console.log(fish); 
    this.setState({fishes});

}

removeFish(key){
    const fishes= {...this.state.fishes};
    fishes[key]= null;
    this.setState({fishes});
}

componentDidMount(){

    var localStorageRef = localStorage.getItem(this.props.match.params.storeId);
    if (localStorageRef){
        this.setState({order: JSON.parse(localStorageRef)});
    }
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
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
       <Order order={this.state.order} fishes={this.state.fishes}
            removeFromOrder= {this.removeFromOrder}/>
       <Inventory 
            addFish={this.addFish}
            fishes={this.state.fishes}
            loadSampleFishes={this.loadSampleFishes}
            updateFish={this.updateFish}
            removeFish= {this.removeFish}/>
    </div>
    )
}
}

App.propTypes = {
    match: PropTypes.object.isRequired
}

export default App;