import React from 'react';
import axios from 'axios';

class JokesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jokes: []
        }
    }

    componentDidMount = () => {
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        
        axios.get('http://localhost:3300/api/jokes', requestOptions)
            .then(response => {
                this.setState({jokes: response.data})
                console.log('jokes', this.state.jokes)
            })
            .catch(err => {
                if(err) {
                    alert('You are not authorized to view this content.');
                    this.props.history.push('/login')
                }
            })
    }

    render() {
        if (this.state.jokes.length > 0) {

            return(
                <div>
                    <h1>Jokes List</h1>
                    <div className="jokeContainer">
                    {this.state.jokes.map(joke => 
                        <div key={joke.setup} className="jokeBox">
                            <p className="underline">Joke ID: {joke.id}</p>
                            <p>Category: {joke.type}</p>
                            <p className="bold">{joke.setup}</p>
                            <p className="italic">{joke.punchline}</p>
                        </div>
                        )}
                        </div>
                </div>
            )
        } else {
            return (<div>Loading...</div>)
        }
    }
}

export default JokesList;