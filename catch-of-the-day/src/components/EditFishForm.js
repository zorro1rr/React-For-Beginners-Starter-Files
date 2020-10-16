import React from "react";
import { formatPrice } from '../helpers'
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
    //make event handler so we can update the inventory and it doesn't conflict with the state
    static propTypes = {
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func,
    }
    handleChange = event => {
        //update the fish
        //take a copy of the current fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        }
        this.props.updateFish(this.props.index, updatedFish)
    }

    clickHandler = () => {
        this.props.deleteFish(this.props.index);
    }
    render() {
        return (
            <div className="fish-edit">
                <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />
                <input type="text" name="price" onChange={this.handleChange} value={formatPrice(this.props.fish.price)} />
                <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status} >
                <option value="available">Fresh!</option>
                  <option value="unavailable">Sold Out!</option>
                </select>
                <textarea  name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
                <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image} alt={this.props.fish.name}/>
                <button onClick={this.clickHandler}>Remove Fish</button>
            </div>
        )
    }
}

export default EditFishForm;