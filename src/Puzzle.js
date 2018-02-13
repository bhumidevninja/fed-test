import React, { Component } from 'react';
import _ from 'lodash';
import DragSortableList from 'react-drag-sortable';


class Puzzle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            puzzleArray: []
        };
    }

    componentWillMount() {
        if (this.props.puzzleSize) {
            this.generateRandomData(this.props.puzzleSize);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.puzzleSize !== nextProps.puzzleSize) {
            this.generateRandomData(nextProps.puzzleSize);
        }
    }

    generateRandomData = (size) => {
        const items = _.times(size * size, n => n + 1);
        const solvedPuzzleArray = _.cloneDeep(items);
        const puzzleArray = _.shuffle(items);
        this.setState({ puzzleArray, solvedPuzzleArray })
    };

    onSort = (sortedArray) => {
        const puzzleArray = sortedArray.map(v => v.value);
        this.setState({
            puzzleArray
        }, () => {
            this.checkPuzzleSolution();
        });
    };

    checkPuzzleSolution = () => {
        const { puzzleArray, solvedPuzzleArray } = this.state;
        if (_.isEqual(puzzleArray, solvedPuzzleArray)) {
            window.alert('welcome to the team!');
        }
    };

    render() {
        let { puzzleSize } = this.props;

        if (!puzzleSize) {
            return <div />;
        }
        puzzleSize = Number(puzzleSize);
        const { puzzleArray } = this.state;
        const grid = puzzleArray.map(value => ({
            content: (<div className="col grid-item">{value}</div>),
            value
        }));
        const puzzleBoxSize = puzzleSize * 65;
        return (
            <div className="puzzle-container" style={{ width: puzzleBoxSize, height: puzzleBoxSize }}>
                <DragSortableList items={grid} dropBackTransitionDuration={0.3} onSort={this.onSort} type="grid"/>
            </div>
        );
    }
}

export default Puzzle;
