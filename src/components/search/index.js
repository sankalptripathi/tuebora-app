import React from "react";

export default class Searchbox extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
    return(
            <div className="searchboxWrapper ht-35">
                <input type="text" name="searchbox" placeholder="Search" />
            </div>
        );
    }
}