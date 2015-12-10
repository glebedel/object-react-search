import React from 'react';

export default class SearchBar extends React.Component{
    static defaultProps = {placeholder: ["Search..."]}
    static propTypes = {
    }
    constructor(props){
        super(props);
    }
    handleChange = () => {
        this.props.onUserInput(this.refs.filterTextInput.value);
    }
    manageSubmit(e) {
        e.preventDefault();
        return false;
    }
    componentDidMount(){
        this.refs.filterTextInput.value = this.props.filterText;
    }
    render() {
        return (
            <form
                onSubmit={this.manageSubmit}
                className="searchbar-form"
                >
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    //value={this.props.filterText}
                    ref="filterTextInput" onChange={this.handleChange}
                    className="SearchApp-searchbar form-control search-query"
                    />
            </form>
        );
    }
}