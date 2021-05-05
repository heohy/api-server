import axios from 'axios';

export async function SignInDataQuery(state) {
    const resultRows = [];

    await axios.post("http://127.0.0.1:5000/signin_data", {
        table_category: state.table_category
    }).then((res) => {
        //console.log(res.data);
        resultRows.push(res.data);
    }).catch((err) => {
        console.log(err);
    })

    return resultRows;
}