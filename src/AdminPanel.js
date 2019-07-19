import React, { Component } from 'react';
import Form from 'react-jsonschema-form-bs4';
import Fetch from 'react-fetch-component';
import Axios from 'axios';
import Beforeunload from 'react-beforeunload';
import fileDownload from 'js-file-download';
import schema from './ConfigValuesSchema';
import Login from './Login';
import ServerUtils from './ServerUtils';


const SERVER_URL = ServerUtils.getServerUrl();

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configOnServer: {},
      formData: {},
      authenticated: false,
      password: null,
    };
  }

  onSubmit({ formData }) {
    const file = new File([JSON.stringify(formData)], 'config.json');
    const { password } = this.state;
    const form = new FormData();
    form.append('file', file);
    Axios.post(`${SERVER_URL}/experiment`, form, {
      auth: {
        username: '',
        password,
      },
    }).then(() => this.setState({ configOnServer: formData }))
      .catch(error => console.log(error));
  }

  onChange({ formData }) {
    this.setState({
      formData,
    });
  }

  onServerData(data) {
    this.setState({
      configOnServer: data,
      formData: data,
    });
  }

  onClose(e) {
    const { configOnServer, formData } = this.state;
    if (JSON.stringify(configOnServer) !== JSON.stringify(formData)) {
      e.preventDefault();
      return 'You have unsaved changes';
    }
    return null;
  }

  onPassword(password) {
    this.setState({
      authenticated: true,
      password,
    });
  }

  downloadData() {
    const { password } = this.state;
    Axios.get(`${SERVER_URL}/data`, {
      auth: {
        username: '',
        password,
      },
      responseType: 'arraybuffer',
    }).then(data => fileDownload(data.data, "data.zip"))
      .catch(error => console.log(error));
  }

  renderPanel() {
    const { formData } = this.state;
    return (
      <div className="panel container" style={{paddingTop: 25, paddingBottom: 25}}>
        <h2>Download collected data</h2>
        <button onClick={() => { this.downloadData(); }} type="button" className="btn btn-primary" style={{marginTop: 5, marginBottom: 20}}>
          <i className="fas fa-download" />
          {' '}
          Download collected data
        </button>
        <hr/>
        <h2>Configure Experiment</h2>
        <Form
          className="configForm"
          schema={schema}
          formData={formData}
          onChange={f => this.onChange(f)}
          onSubmit={f => this.onSubmit(f)}
        />
      </div>
    );
  }

  render() {
    const { authenticated } = this.state;
    if (!authenticated) {
      return (
        <div>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"/>
          <Login onPassword={p => this.onPassword(p)} />
        </div>
      );
    }
    return (
      <div>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"/>
        <Beforeunload onBeforeunload={e => this.onClose(e)}>
          <Fetch url={`${SERVER_URL}/experiment`} as="json" onDataChange={d => this.onServerData(d)}>
            {() => this.renderPanel()}
          </Fetch>
        </Beforeunload>
      </div>
    );
  }
}


export default AdminPanel;