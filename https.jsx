import React from 'react';
import axios from 'axios';
class Http extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: []
        }
    }

    getData() {
        var mythis = this;
        var getData = axios({
            method: 'GET',
            url: 'http://localhost:1080/api/getQuestionnaire',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            responseType: 'application/json'
        })
        getData.then(function (response) {
            mythis.state.messages = response.data.message;
            mythis.setState({ messages: mythis.state.messages});
        })
        getData.catch(function (error) {
            console.log(error);
        });
    }
    render() {
        return (
            <div>
                <h1>HTTP Requests.</h1>
                <p>url: 'http://localhost:1080/api/getQuestionnaire',</p>
                <button className="btn btn btn-info" onClick={this.getData.bind(this)} >Get Data</button>
                <div>
                    {this.state.messages.map((message, i) =>
                        <YourMessage className="col-md-12"
                            key={i} index={i} textMessage={message} />
                    )}
                </div>
            </div>
        )
    }
}


class YourMessage extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: 'lightGrey', fontStyle: 'italic', marginTop: '10px' }}>
                <div style={{ padding: '15px' }}>
                    <p> <strong>Id : </strong>{this.props.textMessage.id}</p>
                    <p> <strong>Question : </strong>{this.props.textMessage.question}</p>
                    <p> <strong>Details : </strong>{this.props.textMessage.detail}</p>
                    <p> <strong>Intro : </strong>{this.props.textMessage.intro}</p>
                </div>
            </div>
        )
    }
}

export default Http;