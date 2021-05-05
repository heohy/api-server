import axios from 'axios';
import crypto from 'crypto-js';

export async function SignInValidate(state) {
    const errMessage = [];
    let signin_validate = true;
    let hash_password = "";

    await axios.post("http://127.0.0.1:5000/signin_validate", {
        username: state.username,
        password: state.password
    }).then((res) => {
        signin_validate = res.data[0]['confirm'];
        hash_password = res.data[0]['hash_password'];
        console.log(res.data[0]);
        console.log(signin_validate);
    }).catch((err) => {
        console.log(err);
    })

    if(signin_validate === false) {
        errMessage.push("존재하지 않는 아이디 입니다.")
    } else {
        const input_password = state.password;
        const db_password = crypto.AES.decrypt(hash_password, process.env.REACT_APP_HASH_KEY).toString(crypto.enc.Utf8);

        console.log(input_password);
        console.log(db_password);

        if (input_password !== db_password) {
            errMessage.push("비밀번호가 일치하지 않습니다.")
            signin_validate = false;
        }
    }

    return({
        validate: signin_validate,
        errorMessage: errMessage
    })
}