import React from "react";

export default class Searchbox extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            allowedFields: []
        }
    }
    componentDidMount = async () => {
        const allowedFields = this.props.data.data.configs
                                && this.props.data.data.configs.search && 
                                this.props.data.data.configs.search.allowedFields;
        this.setState({
            allowedFields
        });
    }
    render() {
    return(
        (this.props.data.entityName === "users") 
        ?
        <div className="searchboxWrapper ht-35">
            <input type={this.props.data.data.configs.search.type} 
            name={this.props.data.data.configs.search.name} 
            placeholder={this.props.data.data.configs.search && 
                this.props.data.data.configs.search.placeholder}
            onChange={(e, allowedFields) => {
                this.props.data.searchTextHandler(e, this.state.allowedFields)
            }} 
            value={this.searchTextString}
            ref={this.props.data.searchFieldRef}
            />
        </div>
        :
        <div className="searchboxWrapper ht-35">
            <input type={this.props.data.data.configs.search.type}
            name={this.props.data.data.configs.search.name}
            placeholder={this.props.data.data.configs.search && 
                this.props.data.data.configs.search.placeholder}
            onChange={(e, allowedFields) => {
                this.props.data.searchTextHandlerAccount(e, this.state.allowedFields)
            }} 
            value={this.searchTextString}
            ref={this.props.data.searchFieldRef}
            />
        </div>
        );
    }
}