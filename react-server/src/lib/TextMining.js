import axios from 'axios';

export async function TextMining(state) {
    let stem_review = "";
    let afinn_review = "";
    let emolex_review = "";
    let predict_review = "";


    await axios.post("http://127.0.0.1:5000/textmining", {
        review: state.review
    }).then((res) => {
        stem_review = res.data[0]
    }).catch((err) => {
        console.log(err);
    })


    return stem_review
}