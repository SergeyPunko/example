import React, { Component, Fragment } from 'react';
import Git from './Git';

class App extends Component {
    state = {
        mail: '',
        password: ''
    }
    handle = (e) => {
        e.preventDefault();
        const { mail, password } = this.state;
        let b='';
        fetch('http://localhost:5000/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                mail,
                password
            })
        })
        .then(res=>{b=res.text()})
        .then(()=>console.log(b))
    }
    logout = ()=>{
        fetch('http://localhost:5000/logout')
        .then(res=>console.log(res.text()))
    }
    changeMail = (e) => {
        this.setState({ mail: e.target.value });
    }
    changePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {
        const { mail, password } = this.state;
        return (
            <Fragment>
                <Git />
                <form onSubmit={this.handle}>
                    <label>
                        Name
          <input type="text" name="username" value={mail} onChange={this.changeMail} />
                    </label>
                    <label>
                        password
          <input type="password" name="password" value={password} onChange={this.changePassword} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <button onClick={this.logout}>logout</button>
            </Fragment>
        );
    }
}

export default App;
