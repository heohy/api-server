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
        const data = await SignInDataQuery(this.state);
        this.data = data;      // data는 lib에서 받아온 데이터

        //console.log(data);
        //console.log(this.state.items);
        //console.log(this.data);
        return
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
        let qwer = this.data[0];

        console.log(typeof(qwer));
        console.log(qwer);
        return (
            <>
                <div className="title_box row">
                    <p className="inner_title_box col s10">
                        <h3>pure_review</h3>
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

                <hr />

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
                            <p className="col s1">{index}</p>
                            <p className="col s1">country</p>
                            <p className="col s2">restaurant</p>
                            <p className="col s2">title</p>
                            <p className="col s1">rating</p>
                            <p className="col s3">content</p>
                            <p className="col s1">date</p>
                            <p className="col s1">lang</p>
                        </div>
                    ))}

                </InfiniteScroll>
            </>
        )
    }
}

export default SignInData;