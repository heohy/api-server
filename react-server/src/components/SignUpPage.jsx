import React from 'react';
import axios from 'axios';
import crypto from 'crypto-js';
import toast, { Toaster } from 'react-hot-toast';
import { SignUpValidate } from '../lib/SignUpValidate.js';
import '../css/SignUpPage.css';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password1: "",
            password2: "",
            name: "",
            gender: "",
            birth: ""
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
        const data = await SignUpValidate(this.state);

        if (data.validate === false) {
            for (let i=0; i < data.errorMessage.length; i++) {
                toast(data.errorMessage[i]);
            }
        }
        else {
            alert('회원가입이 정상적으로 처리되었습니다.');
            const hash_password = crypto.AES.encrypt(this.state.password1, process.env.REACT_APP_HASH_KEY).toString();
            //const test2 = crypto.AES.decrypt(test, "1234").toString(crypto.enc.Utf8);

            await axios.post("http://127.0.0.1:5000/signup", {
                username: this.state.username,
                password: hash_password,
                name: this.state.name,
                gender: this.state.gender,
                birth: this.state.birth
            })
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            });

            this.props.history.push({
                pathname: "/"
            })
        }
    }

    render() {
        return (
            <>
                <div className="regist_box">
                    <div className="top_box_sub_1 row">
                            <p className="col s2" id="text_logo">API Server</p>
                            <p className="col s2"> </p>
                            <p className="col s2"> </p>
                            <p className="col s3"> </p>
                            <p className="col s3" id="signup_button">
                                <a
                                    className="waves-effect waves-light btn"
                                    onClick={()=>{
                                        this.props.history.push({
                                            pathname: "/"
                                        })}
                                    }>
                                    PREVIOUS</a>
                            </p>

                    </div>

                    <div className="col s12" id="slogan">
                        <h5>REGISTER</h5>
                    </div>

                    <form className="col s12" id='regist'>
                        <div className="row" id="form-item">
                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={this.state.username}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="username">ID</label>
                            </div>
                        </div>

                        <div className="row" id="form-item">
                            <div className="input-field col s12">
                                <input 
                                    type="password"
                                    name="password1"
                                    id="password1"
                                    value={this.state.password1}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="password1">Password</label>
                            </div>
                        </div>

                        <div className="row" id="form-item">
                            <div className="input-field col s12">
                                <input 
                                    type="password"
                                    name="password2"
                                    id="password2"
                                    value={this.state.password2}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="password2">Validate Password</label>
                            </div>
                        </div>

                        <div className="row" id="form-item">
                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="off"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="name">Name</label>
                            </div>
                        </div>

                        <p id="form-item">
                            <label>
                                <input 
                                    type="radio"
                                    name="gender"
                                    id="gender"
                                    value="남"
                                    onChange={this.handleInputChange} />
                                <span id="gender-item">남</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    id="gender"
                                    value="여"
                                    onChange={this.handleInputChange} />
                                <span>여</span>
                            </label>
                        </p>
                        
                        <p id="form-item">
                            <input
                                type="date"
                                id="birth"
                                name="birth"
                                className="datepicker"
                                value={this.state.birth}
                                onChange={this.handleInputChange} />
                            <label htmlFor="birth">Birth</label>
                        </p>
                    </form>

                    <a
                        className="waves-effect waves-light btn"
                        id="submit" 
                        onClick={this.handleClick}>  
                        LOGIN</a>
                </div>

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        // Define default options
                        className: '',
                        style: {
                        margin: '100px',
                        background: '#363636',
                        color: '#fff',
                        zIndex: 1,
                        },
                        duration: 5000,
                        
                        // Default options for specific types
                        success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                        },
                    }} /> 
            </>
        )
    }
}

export default SignUpPage;