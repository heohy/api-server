import React from 'react';

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
                <div>{this.username}</div>
                <div>{this.password}</div>
            </>
        )
    }
}

export default SignInPage;