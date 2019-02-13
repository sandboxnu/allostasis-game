import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-jsonschema-form';
import './AdminPanel.css';
import schema from './ConfigValuesSchema.json';

const SERVER_URL = 'https://api.sandboxneu.com/test';

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema,
            formData: undefined
        };
    }

    componentDidMount() {
        axios.get(`${SERVER_URL}/experiment`)
            .then(response => {
                console.log(response.data);
                this.setState({formData: response.data});
            })
            .catch(error => console.log(error));
    }

    uploadToServer = () => {
        console.log(this.state.formData);
        const file = new File([this.state.textContents], 'config.json');

        const formData = new FormData();
        formData.append('file', file);

        axios.post(`${SERVER_URL}/experiment`, formData)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    onSubmit = ({formData}, e) => {
        const file = new File([JSON.stringify(formData)], 'config.json');

        const form = new FormData();
        form.append('file', file);
        axios.post(`${SERVER_URL}/experiment`, form)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <Form schema={this.state.schema}
                formData={this.state.formData}
                onSubmit={this.onSubmit} />
        );
    }
}

export default AdminPanel;
