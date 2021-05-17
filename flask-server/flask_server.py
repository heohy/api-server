import os
import json

import pymysql

from flask import Flask
from flask import request
from flask import jsonify
from flask import make_response
from flask_cors import CORS, cross_origin, logging

from afinn import Afinn

import pandas as pd
from nltk.tokenize import RegexpTokenizer            # 토큰화
from nltk.corpus import stopwords                    # 불용어 처리. the, a, an 같은 의미없는 관사들을 제거해준다.
from nltk.stem import PorterStemmer                  # 어간 추출
from nltk.stem import WordNetLemmatizer              # 표제어 추출

import plotly.express as px
import pandas as pd


###MYSQL Connection 연결
conn = pymysql.connect(
    host="58.122.41.157",
    port=3306,
    user="remote",
    password="gjgurwls54!",
    db="api",
    charset="utf8"
)
curs = conn.cursor()

### CORS section
app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})
logging.getLogger('flask_cors').level = logging.DEBUG

default_path = os.getcwd()

@app.after_request
def after_request_func(response):
    origin = request.headers.get('Origin')
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Headers', 'x-csrf-token')
        response.headers.add('Access-Control-Allow-Methods',
                            'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)
    else:
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)

    return response
### end CORS section


@app.route("/signup", methods=['POST'])
def signup():
    req = json.loads(request.get_data(), encoding = "UTF-8")

    sql = "insert into api_user(username, password, name, gender, birth) values('{}', '{}', '{}', '{}', '{}')".format(
        req['username'],
        req['password'],
        req['name'],
        req['gender'],
        req['birth']
    )
    curs.execute(sql)
    conn.commit()
    
    res = [req]

    print(jsonify(res))
    print(req)

    return jsonify(res)


@app.route("/signup_validate", methods=['POST'])
def signup_validate():
    req = json.loads(request.get_data(), encoding = "UTF-8")
    res_item = { "confirm": True }

    sql = "select * from api_user where username='{}'".format(req['username'])

    curs.execute(sql)
    rows = curs.fetchall()

    if len(rows) > 0:
        res_item["confirm"] = False
    else:
        res_item["confirm"] = True

    res = [res_item]
    print(res)
    print(res_item)

    return jsonify(res)


@app.route("/signin_validate", methods=['POST'])
def signin_validate():
    req = json.loads(request.get_data(), encoding = "UTF-8")
    res_item = { "confirm": True }

    sql = "select password from api_user where username='{}'".format(req['username'])
    print(sql)

    curs.execute(sql)
    rows = curs.fetchall()

    print(rows)
    print(rows[0])

    if len(rows) > 0:
        res_item["confirm"] = True
        res_item["hash_password"] = rows[0][0]
    else:
        res_item["confirm"] = False

    res = [res_item]

    print(res)
    print(res_item)

    return jsonify(res)


@app.route("/signin_data", methods=['POST'])
def signin_data():
    req = json.loads(request.get_data(), encoding = "UTF-8")

    sql = "select * from {} where idx < 500".format(req['table_category'])

    curs.execute(sql)
    rows = curs.fetchall()
    
    #print(rows)
    #print(jsonify(rows))

    return jsonify(rows)



def lemmatizer(review_str):
    tokenizer = RegexpTokenizer('[\w]+')
    stop_words = stopwords.words('english')
    l = WordNetLemmatizer()
    
    text = review_str.lower()
    tokens = tokenizer.tokenize(text)
    stopped_tokens = [i for i in tokens if not i in stop_words]
    lem = [l.lemmatize(w) for w in stopped_tokens]
    
    return lem


def extractAfinn(lemmatize, review_str):
    afinn = Afinn()
    sentiment_word = afinn.find_all(lemmatize)
    word_length = len(sentiment_word)
    text_length = len(review_str)
    sentiment_score = afinn.score(lemmatize)
    
    result = {
        'sentiment_word': sentiment_word,
        'word_length': word_length,
        'text_length': text_length,
        'sentiment_score': sentiment_score
    }
    
    return result


def extractEmolex(review_str):
    NRC = pd.read_csv("C:/Users/heohy/Desktop/Project/api-server/flask-server/nrc.txt", sep='\t')
    emolex_score = {
        'positive': 0,
        'negative': 0,
        'joy': 0,
        'trust': 0,
        'anticipation': 0,
        'surprise': 0,
        'sadness': 0,
        'anger': 0,
        'fear': 0,
        'disgust': 0
    }
    
    tokenizer = RegexpTokenizer('[\w]+')
    tokens = tokenizer.tokenize(str(review_str))
    NRC_N = NRC[NRC['word'].isin(tokens)].copy()                                     # 감성사전 최적화.
    match_words = list(filter(lambda x: NRC_N['word'].isin([x]).any(), tokens))      # 최적회된 감성사전에서 감성점수를 추출한다.
    
    emotion_list = []
    for match_word in match_words:
        emotions = list(NRC[NRC['word'].isin([match_word])]['emotion'])
        emotion_list = emotion_list + emotions

    emolex_score = pd.Series(emotion_list).value_counts()
    if len(emolex_score) < 10:
        if not emolex_score.get("positive"): emolex_score['positive'] = 0
        if not emolex_score.get("negative"): emolex_score['negative'] = 0
        if not emolex_score.get("joy"): emolex_score['joy'] = 0
        if not emolex_score.get("trust"): emolex_score['trust'] = 0
        if not emolex_score.get("anticipation"): emolex_score['anticipation'] = 0
        if not emolex_score.get("surprise"): emolex_score['surprise'] = 0
        if not emolex_score.get("sadness"): emolex_score['sadness'] = 0
        if not emolex_score.get("anger"): emolex_score['anger'] = 0
        if not emolex_score.get("fear"): emolex_score['fear'] = 0
        if not emolex_score.get("disgust"): emolex_score['disgust'] = 0
            
    return emolex_score


def extractPredict(extract_afinn):
    bias = 4.3978664
    m1 = -0.07766214369543656
    m2 = -0.0007021349133656005
    m3 = 0.07456878634737804

    result = extract_afinn['word_length'] * m1 + extract_afinn['text_length'] * m2 + extract_afinn['sentiment_score'] * m3 + bias
    
    return result


def extractChart(extract_emolex):
    df = pd.DataFrame(dict(
        r=[extract_emolex['positive'], extract_emolex['negative'], extract_emolex['joy'], extract_emolex['trust'], extract_emolex['anticipation'], extract_emolex['surprise'], extract_emolex['sadness'], extract_emolex['anger'], extract_emolex['fear'], extract_emolex['disgust']],
        theta=['positive', 'negative', 'joy', 'trust', 'anticipation', 'surprise', 'sadness', 'anger', 'fear', 'disgust']))
    fig = px.line_polar(df, r='r', theta='theta', line_close=True)
    fig.show()
    #fig.write_image("C:/Users/heohy/Desktop/Project/api-server/react-server/public/img/fig1.png")
    
    return

@app.route("/textmining", methods=["POST"])
def textmining():
    req = json.loads(request.get_data(), encoding = "UTF-8")
    res_item = {
        'pretreatment': "test1",
        'word_length': "test2",
        'text_length': "test3",
        'afinn_score': "test4",
        'emolex_score': "test5",
        'predict_score': "test6"
    }

    review_str = req['review']

    lemmatize = lemmatizer(review_str)
    extract_afinn = extractAfinn(str(lemmatize), review_str)
    extract_afinn

    extract_emolex = extractEmolex(str(review_str))
    extract_emolex

    extract_predict = extractPredict(extract_afinn)
    extractChart(extract_emolex)

    print(extract_afinn)
    print(extract_emolex)
    print(extract_predict)

    res_item['pretreatment'] = str(extract_afinn['sentiment_word'])
    res_item['word_length'] = extract_afinn['word_length']
    res_item['text_length'] = extract_afinn['text_length']
    res_item['afinn_score'] = extract_afinn['sentiment_score']
    res_item['emolex_score'] = str(dict(extract_emolex))
    res_item['predict_score'] = extract_predict

    return jsonify(res_item) 


if __name__=='__main__':
    app.run()