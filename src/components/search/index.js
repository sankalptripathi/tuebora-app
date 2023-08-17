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
        (this.props.data.entityName === "users") ?
            <div className="searchboxWrapper ht-35">
                <input type="text" 
                name="searchbox" 
                placeholder={this.props.data.data.configs.search && 
                    this.props.data.data.configs.search.placeholder}
                onChange={(e, allowedFields) => {
                    this.props.data.searchTextHandler(e, this.state.allowedFields)
                }} 
                value={this.searchTextString}
                />
            </div>
        :
        <div className="searchboxWrapper ht-35">
            <input type="text" 
            name="searchbox" 
            placeholder={this.props.data.data.configs.search && 
                this.props.data.data.configs.search.placeholder}
            onChange={(e, allowedFields) => {
                this.props.data.searchTextHandlerAccount(e, this.state.allowedFields)
            }} 
            value={this.searchTextString}
            />
        </div>
        );
    }
}