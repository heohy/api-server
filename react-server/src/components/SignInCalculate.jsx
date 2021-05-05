import React from 'react';
import { TextMining } from '../lib/TextMining.js';
import '../css/SignInCalculate.css';

class SignInCalculate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            review: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    async handleClick() {
        const data = await TextMining(this.state);

        alert(data);
    }


    render() {
        return (
            <>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                name="review"
                                id="review"
                                autoComplete="off"
                                alue={this.state.review}
                                onChange={this.handleInputChange} /> 
                            <label htmlFor="review">review</label>
                        </div>
                    </div>
                </form>
                <div className="output_box">
                    <a
                        className="waves-effect waves-light btn"
                        id="submit" 
                        onClick={this.handleClick}>  
                        리뷰 분석</a>
                    <div className="Stemmer">Stemmer</div>
                    <div className="Afinn">Afinn</div>
                    <div className="Emolex">Emolex</div>
                    <div className="Predict">Predict</div>
                </div>
            </>
        )
    }
}

export default SignInCalculate;