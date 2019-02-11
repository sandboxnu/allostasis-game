import React, { Component } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const SERVER_URL = 'https://api.sandboxneu.com/test';

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textContents: "",
        };
    }

    componentDidMount() {
        axios.get(`${SERVER_URL}/experiment`)
            .then(response => {
                console.log(response);
                this.setState({textContents: response.data});
                document.getElementById("textContents").value = response.data;
            })
            .catch(error => console.log(error));
    }

    uploadToServer = () => {
        console.log(this.state.textContents);
        const file = new File([this.state.textContents], 'config.json');

        const formData = new FormData();
        formData.append('file', file);

        axios.post(`${SERVER_URL}/experiment`, formData)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="launchScreen">
                <textarea id="textContents" onChange={this.handleChange.bind(this)}>{this.textContents}</textarea>
                <a className="button" onClick={this.uploadToServer} role="button">Upload Config</a>
            </div>
        );
    }

    handleChange(e) {
        this.setState({textContents: e.target.value});
    }
}

export default AdminPanel;
