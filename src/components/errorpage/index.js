import React from "react";

export default class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
    return(
        <h5>
            Error: {this.props.error}
        </h5>
        );
    }
}