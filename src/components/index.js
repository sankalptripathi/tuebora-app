import React from "react";
import { Link } from "react-router-dom";

export default class Main extends React.Component {
    render() {
        return(
            <div>
                Go to <Link to="/users">Users management</Link> page or <Link to="/accounts">Accounts management</Link> page.
            </div>
        );
    }
}