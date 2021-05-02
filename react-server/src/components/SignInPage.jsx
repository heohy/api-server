import React from 'react';
import '../css/SignInPage.css';

import SignInData from './SignInData';
import SignInCalculate from './SignInCalculate';
import SignInModel from './SignInModel';


class SignInPage extends React.Component {
    constructor(props) {
        super(props);

        this.username = this.props.location.state.username;
        this.password = this.props.location.state.password;

        //console.log(this.jwt_password);
        //console.log(process.env.REACT_APP_JWT_KEY);
        //console.log(typeof(this.jwt_password));
    }

    render() {
        return (
            <>
                <div className="header_box row">
                    <p className="col s4">
                        <a
                            id="category"
                            onClick={()=>{
                                document.getElementById("data_box").style.display = "none";
                                document.getElementById("model_box").style.display = "none";
                                document.getElementById("calculate_box").style.display = "none";
                            }}>
                        리뷰 데이터 감성분석 시스템</a>
                    </p>
                    <p className="col s2">
                        <a
                            id="category"
                            onClick={()=>{
                                document.getElementById("data_box").style.display = "";
                                document.getElementById("model_box").style.display = "none";
                                document.getElementById("calculate_box").style.display = "none";
                            }}>
                        데이터 분석</a>
                    </p>
                    <p className="col s2">
                        <a
                            id="category"
                            onClick={()=>{
                                document.getElementById("data_box").style.display = "none";
                                document.getElementById("model_box").style.display = "";
                                document.getElementById("calculate_box").style.display = "none";
                            }}>
                        모델</a>
                    </p>
                    <p className="col s2">
                        <a
                            id="category"
                            onClick={()=>{
                                document.getElementById("data_box").style.display = "none";
                                document.getElementById("model_box").style.display = "none";
                                document.getElementById("calculate_box").style.display = "";
                            }}>
                        계산</a>
                    </p>
                    <p className="col s2">{this.username}님 환영합니다.</p>
                </div>
                
                <div id="data_box" style={{display: "none"}}>
                    <SignInData />
                </div>
                <div id="model_box" style={{display: "none"}}>
                    <SignInModel />
                </div>
                <div id="calculate_box" style={{display: "none"}}>
                    <SignInCalculate />
                </div>
            </>
        )
    }
}

export default SignInPage;