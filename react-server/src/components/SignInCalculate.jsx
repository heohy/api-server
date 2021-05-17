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
        const data10 = await TextMining(this.state);

        //alert("전처리 : " + data10['pretreatment'] + "\n" + "포함된 감성어 수 : " + data10['word_length'] + "\n" + "리뷰의 길이 : " + data10['text_length'] + "\n" + "Afinn 점수 : " + data10['afinn_score'] + "\n" + "Emolex 점수 : " + data10['emolex_score'] + "\n" + "평점 예측 : " + data10['predict_score']);

        const div1 = document.createElement('div');
        const text1 = document.createTextNode("포함된 감성어 : " + data10['pretreatment']);
        div1.appendChild(text1);
        document.getElementById('description_box').appendChild(div1);

        const div2 = document.createElement('div');
        const text2 = document.createTextNode("포함된 감성어 수 : " + data10['word_length']);
        div2.appendChild(text2);
        document.getElementById('description_box').appendChild(div2);

        const div3 = document.createElement('div');
        const text3 = document.createTextNode("리뷰의 길이 : " + data10['text_length']);
        div3.appendChild(text3);
        document.getElementById('description_box').appendChild(div3);

        const div4 = document.createElement('div');
        const text4 = document.createTextNode("Afinn 점수 : " + data10['afinn_score']);
        div4.appendChild(text4);
        document.getElementById('description_box').appendChild(div4);

        const div5 = document.createElement('div');
        const text5 = document.createTextNode("Emolex 점수 : " + data10['emolex_score']);
        div5.appendChild(text5);
        document.getElementById('description_box').appendChild(div5);

        const div6 = document.createElement('div');
        const text6 = document.createTextNode("평점 예측 점수 : " + data10['predict_score']);
        div6.appendChild(text6);
        document.getElementById('description_box').appendChild(div6);
        
        const img = document.createElement("img");
        img.setAttribute("src", "/fig1.png");
        document.getElementById('description_box').appendChild(img);
        //alert(data['pretreatment']);
        //alert(data['word_length']);
        //alert(data['text_length']);
        //alert(data['afinn_score']);
        //alert(data['emolex_score']);
        //alert(data['predict_score']);

        //document.getElementById("Pretreatment").innerHTML = data10['pretreatment'];
        //document.getElementById("Word").innerHTML = data10['word_length'];
        //document.getElementById("Text").innerHTML = data10['text_length'];
        //document.getElementById("Afinn").innerHTML = data10['afinn_score'];
        //document.getElementById("Emolex").innerHTML = data10['emolex_score'];
        //document.getElementById("Predict").innerHTML = data10['predict_score'];
    }


    render() {

        return (
            <>
                <div className="calc_box">
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
                        <div id="description_box"></div>
                    </div>
                </div>
            </>
        )
    }
}

export default SignInCalculate;