import axios from 'axios';

export async function SignUpValidate(state) {
    const errMessage = [];
    let signup_validate = true;
    let id_duplicate = true;

    await axios.post("http://127.0.0.1:5000/signup_validate", {
        username: state.username
    }).then((res) => {
        id_duplicate = res.data[0]['confirm']
        console.log(id_duplicate)
    }).catch((err) => {
        console.log(err)
    })

    // 아이디 무결성 검사
    if (state.username === "") { errMessage.push("아이디를 입력해주세요."); }
    else if (id_duplicate === false) { errMessage.push("이미 존재하는 아이디입니다."); }

    // 비밀번호 무결성 검사
    if (state.password1 !== state.password2) { errMessage.push("패스워드가 일치하지 않습니다."); }
    else if (!/^[a-zA-Z0-9]{8,20}$/.test(state.password1)) { errMessage.push("비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다."); }
    else if (state.password1.search(/[0-9]/g) < 0 || state.password1.search(/[a-z]/ig) < 0) {
        errMessage.push("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
    }

    // 이름 무결성 검사
    if (state.name === "") { errMessage.push("이름을 입력해주세요."); }

    // 성별 무결성 검사
    if (state.gender === "") { errMessage.push("성별을 입력해주세요."); }
    
    // 생일 무결성 검사
    if (state.birth === "") { errMessage.push("생일을 입력해주세요."); }

    if (errMessage.length > 0) { signup_validate = false; }

    return ({
        validate: signup_validate,
        errorMessage: errMessage
    })
}