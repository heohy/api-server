import React from 'react';
import logo from '../img/sign_image.png'
import toast, { Toaster } from 'react-hot-toast';
import { SignInValidate } from '../lib/SignInValidate';
import '../css/SignPage.css';

class SignPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };

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
        const data = await SignInValidate({
            username: this.state.username,
            password: this.state.password
        });

        console.log(data);
        console.log(data.errorMessage.length);

        if (data.validate === false) {
            for (let i=0; i < data.errorMessage.length; i++) {
                toast(data.errorMessage[i]);
            }
        } else {
            alert('로그인이 정상적으로 처리되었습니다.')

            this.props.history.push({
                pathname: "/signin",
                state: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
        }


    }

    render() {
        return (
            <>
                <div className="login_box">
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
                                        pathname: "/signup"
                                    })}
                                }
                                >
                                Create Account</a>
                        </p>

                    </div>

                    <div className="top_box">
                        <img id="sign_logo" src={logo} />
                        <p className="slogan_1">
                            This site provides Python-based api services.
                        <br />You can use it when you log in after registering as a member.
                    </p>

                    </div>

                    <div className="bottom_box">
                        <div className="slogan_2">
                            <strong>USER LOGIN<br /></strong>
                        Welcome back

                    </div>

                        <form className="col s12" id="login">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="off"
                                        value={this.state.username}
                                        onChange={this.handleInputChange} />
                                    <label htmlFor="username">Enter your id</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange} />
                                    <label htmlFor="password">Enter your password</label>
                                </div>
                            </div>

                        </form>

                    </div>
                    <div className="bottom_box_sub_1">
                        <div className="bottom_box_sub_2 row">
                            <p className="col s5"></p>
                            <a className="col s2">Forgot password?</a>
                            <p className="col s5"></p>
                        </div>
                        <a
                            className="waves-effect waves-light btn"
                            id="submit" 
                            onClick={this.handleClick}>
                        LOGIN</a>

                    </div>
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

export default SignPage;
