import React from 'react';
import ReactDOM from 'react-dom';


class Message extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: []
        }
        localStorage.setItem('state', this.state.messages);
    }

    addMessage() {
        var msg = this.refs.myMessage.value;
        var arr = this.state.messages;
        arr.push(msg);
        this.setState({ messages: arr });
        this.refs.myMessage.value = '';
        localStorage.setItem('state', JSON.stringify(this.state.messages));
    }

    updateMessage2(message, index) {
        //console.log(message)
        //console.log(index)
        var arr = JSON.parse(localStorage.getItem('state'))
        arr[index] = message;
        this.setState({ messages: arr });
        localStorage.setItem('state', JSON.stringify(arr));
    }


    deleteMessage(index) {
        if (window.confirm("Delete ? ")) {
            var arr = JSON.parse(localStorage.getItem('state'))
            arr.splice(index, 1);
            this.setState({ messages: arr });
            localStorage.setItem('state', JSON.stringify(arr));
        }

    }

    render() {

        return (
            <div>
                <h3>Add your message..</h3>
                <div>
                    {this.state.messages.map((message, i) =>
                        <YourMessage deleteMessage={this.deleteMessage.bind(this)}
                            updateMessage2={this.updateMessage2.bind(this)} className="col-md-12"
                            key={i} index={i} textMessage={message} />
                    )}
                </div>
                <div className="col-md-12" style={{ backgroundColor: '#e2e2e2' }}>
                    <div className="form-group">
                        <label>Message : </label>
                        <textarea style={{maxWidth:'100%'}} type="text" ref="myMessage" className="form-control"
                            placeholder="Message" />
                    </div>

                    <button type="submit" onClick={this.addMessage.bind(this)}
                        className="btn btn-primary pull-right">Add</button>
                    <div className="col-md-12">&nbsp;</div>
                </div>
            </div>
        )
    }
}

class YourMessage extends React.Component {

    constructor() {
        super();
        this.showEdit = false;
    }

    removeMessage() {
        console.log("Removing message..")
        this.props.deleteMessage(this.props.index)
        this.showEdit = false;
        this.setState({ showEdit: this.showEdit })
    }

    showTextBox() {
        this.showEdit = !this.showEdit;
        this.setState({ showEdit: this.showEdit })
    }

     updateMessage1(message, index) {
        this.showEdit = !this.showEdit;
        this.setState({ showEdit: this.showEdit })
        this.props.updateMessage2(message, index)
    }


    render() {
        return (
            <div>
                <div className="col-md-12" style={{ backgroundColor: 'lightGrey', color: '#fff' }}>
                    <div>
                        <p>
                            <span title="remove" style={{ color: 'red', cursor: 'pointer' }}
                                className="pull-right glyphicon glyphicon-remove"
                                onClick={this.removeMessage.bind(this)}></span>

                            <span className="pull-right">&nbsp;&nbsp;&nbsp;</span>

                            <span title="edit" style={{ color: 'black', cursor: 'pointer' }}
                                className="pull-right glyphicon glyphicon-edit" 
                                onClick={this.showTextBox.bind(this)}></span>
                        </p>
                        <p style={{ color: 'blue', cursor: 'pointer' }}>
                            {this.showEdit ? <TextBox updateMessage1 ={this.updateMessage1.bind(this)} index={this.props.index} textMessage={this.props.textMessage} /> : this.props.index + 1 + '. Message : ' + this.props.textMessage}
                        </p>
                    </div>
                </div>
                <br></br>
                <hr></hr>
            </div>
        )
    }
}

class TextBox extends React.Component {

    constructor(props) {
        super(props);
    }

    update() {
        var msg = this.refs.editableMessage.value;
        this.props.updateMessage1(msg, this.props.index)
    }

    render() {
        return (
            <div>
                <input type="text" ref="editableMessage" defaultValue={this.props.textMessage}
                    style={{ width: '400px' }} />&nbsp;&nbsp;&nbsp;
                <span onClick={this.update.bind(this)} title="edit" style={{ color: 'green', fontStyle: 'bold', cursor: 'pointer' }}
                    className="glyphicon glyphicon-ok" ></span>
            </div>
        )
    }
}
export default Message;


























      /*  <div>
          <button className="btn btn-primary">Button</button>
           <ul>
              <li><a href="/#/home">Home</a></li>
              <li><a href="/#/about">About</a></li>
              <li><a href="/#/contact">Contact</a></li>
           </ul>
     	
          {this.props.children}
        </div>*/