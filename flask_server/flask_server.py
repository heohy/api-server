import os
import json

import pymysql

from flask import Flask
from flask import request
from flask import jsonify
from flask import make_response
from flask_cors import CORS, cross_origin, logging


###MYSQL Connection 연결
conn = pymysql.connect(
    host="localhost",
    port=3306,
    user="root",
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



if __name__=='__main__':
    app.run()