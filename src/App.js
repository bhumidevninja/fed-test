import React, {Component} from 'react';
import Puzzle from './Puzzle';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            puzzleSize: 3
        };
    }

    handleChange = (e) => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    };

    render() {
        const { puzzleSize } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <div className="form-group">
                        <label>Puzzle size:</label>
                        <input type="number" min={1} max={8} name="puzzleSize" value={puzzleSize} onChange={this.handleChange}/>
                    </div>
                </header>
                <div className="App-container">
                    <Puzzle puzzleSize={puzzleSize} />
                </div>
            </div>
        );
    }
}

export default App;
