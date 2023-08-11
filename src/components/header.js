import Button from "react-bootstrap/button";
import React from "react";
import { NavLink } from "react-router-dom";

export default class Header extends React.Component {
    render() {
    return (
        <div className="main-nav component align-left">
            <ul className="navigation">
                <li><NavLink to="/"><Button variant="info" size="sm">Home</Button></NavLink></li>
                <li><NavLink to="/users"><Button variant="info" size="sm">User</Button></NavLink></li>
                <li><NavLink to="/accounts"><Button variant="info" size="sm">Account</Button></NavLink></li>
            </ul>
        </div>
        );
    }
}