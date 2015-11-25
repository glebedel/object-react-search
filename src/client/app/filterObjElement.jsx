/**
 * Created by Guillaume on 24/11/2015.
 */
import React from 'react';
import {render} from 'react-dom';

let example = [
    {file:"a.txt", path:"/a.txt", value:3, client:"a"},
    {file:"b.txt", path:"/b.txt", value:1, client:"b"},
    {file:"d.txt", path:"/d.txt", value:8, client:"d"},
    {file:"c.txt", path:"/c.txt", value:12, client:"c"},
];

class searchBar extends React.Component{

}

class searchTable extends React.Component{
    render(){
        <div>These are the headers</div>
    }
}

class searchRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {likesCount: 0};
        this.onLike = this.onLike.bind(this);
    }

    onLike() {
        let newLikesCount = this.state.likesCount + 1;
        this.setState({likesCount: newLikesCount});
    }

    render() {
        return (
            <div>
                Likes : <span>{this.state.likesCount}</span>

                <div>
                    <button onClick={this.onLike}>Like Me</button>
                </div>
            </div>
        );
    }

}

class SearchApp extends React.Component {
    render() {
        return (
            <div>
                <h1>Test Hot Reload react</h1>

                <p>Tfw no reload!!!...</p>

                <p>What</p>
                <FilterObjElement />
            </div>
        )
    }
}

render(<SearchApp/>, document.getElementById('searchApp'));

export default FilterObjElement;