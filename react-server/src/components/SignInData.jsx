import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { SignInDataQuery } from '../lib/SignInDataQuery';

import '../css/SignInData.css';

const style = {
    height: 55,
    border: "1px solid white",
    margin: 10,
};

class SignInData extends React.Component {
    constructor(props) {
        super(props);
        
        this.data = [];
        this.state = {
            table_category: "pure_review",
            items: Array.from({ length: 30 }),
            hasMore: true
        }

        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loadReviewQuery = this.loadReviewQuery.bind(this);
    }

    async loadReviewQuery() {
        this.data = await SignInDataQuery(this.state);
        this.state.items = this.data[0].slice(0, this.state.items.length);
        
        for (let i=0; i<this.state.items.length; i++) {
            document.getElementById(i+"0").innerHTML = this.state.items[i][0];
            document.getElementById(i+"1").innerHTML = this.state.items[i][1];
            document.getElementById(i+"2").innerHTML = this.state.items[i][2];
            document.getElementById(i+"3").innerHTML = this.state.items[i][3].substr(0, 10);
            document.getElementById(i+"4").innerHTML = this.state.items[i][4]
            document.getElementById(i+"5").innerHTML = this.state.items[i][5].substr(0, 40) + "...";
            document.getElementById(i+"6").innerHTML = this.state.items[i][6];
            document.getElementById(i+"7").innerHTML = this.state.items[i][7].substr(0, 10);
        }
    }

    fetchMoreData = () => {
        if (this.state.items.length >= 500) {
            this.setState({ hasMore: false });

            return
        }

        setTimeout(() => {
            this.setState({
                items: this.state.items.concat(Array.from({ length: 20 }))
            });
        }, 500);
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
 
        this.setState({
            table_category: value
        });
    }

    render() {
        this.loadReviewQuery();

        return (
            <>
                <div className="title_box row">
                    <p className="inner_title_box col s10">
                        <h3>분석 데이터</h3>
                    </p>
                    <p className="radio_box col s2">
                        <label>
                            <input 
                                type="radio"
                                name="data"
                                id="data"
                                value="pure_review"
                                onChange={this.handleInputChange} />
                            <span> </span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="data"
                                id="data"
                                value="pure_extract_review"
                                onChange={this.handleInputChange} />
                            <span> </span>
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="data"
                                id="data"
                                value="lemmatize_review"
                                onChange={this.handleInputChange} />
                            <span> </span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="data"
                                id="data"
                                value="afinn_review"
                                onChange={this.handleInputChange} />
                            <span> </span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="data"
                                id="data"
                                value="emolex_review"
                                onChange={this.handleInputChange} />
                            <span> </span>
                        </label>
                    </p>
                </div>


                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }>
                    
                    {this.state.items.map((i, index) => (
                        <div className="row" style={style} key={index}>
                            <p className="col s1" id={index + "0"}>{index}</p>
                            <p className="col s1" id={index + "1"}>country</p>
                            <p className="col s2" id={index + "2"}>restaurant</p>
                            <p className="col s2" id={index + "3"}>title</p>
                            <p className="col s1" id={index + "4"}>rating</p>
                            <p className="col s3" id={index + "5"}>content</p>
                            <p className="col s1" id={index + "6"}>date</p>
                            <p className="col s1" id={index + "7"}>lang</p>
                        </div>
                    ))}

                </InfiniteScroll>
            </>
        )
    }
}

export default SignInData;