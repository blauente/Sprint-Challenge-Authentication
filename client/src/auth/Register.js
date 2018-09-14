import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    changeHandler = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
    }

    submitForm = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3300/api/register', this.state)
            .then(response => {
                localStorage.setItem('username', this.state.username);
                localStorage.setItem('jwt', response.data.token);
                this.props.history.push('/jokes');
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.submitForm} method="post">
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}

export default Register;
