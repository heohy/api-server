import axios from 'axios';

export async function TextMining(state) {
    let sentiment_analysis = "";

    await axios.post("http://127.0.0.1:5000/textmining", {
        review: state.review
    }).then((res) => {
        sentiment_analysis = res.data;
    }).catch((err) => {
        console.log(err);
    })
    
    
    //console.log(sentiment_analysis);
    
    return ({
        'pretreatment': sentiment_analysis['pretreatment'],
        'word_length': sentiment_analysis['word_length'],
        'text_length': sentiment_analysis['text_length'],
        'afinn_score': sentiment_analysis['afinn_score'],
        'emolex_score': sentiment_analysis['emolex_score'],
        'predict_score': sentiment_analysis['predict_score']
    })
    
}