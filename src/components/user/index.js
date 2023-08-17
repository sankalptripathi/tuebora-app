import React from "react";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { MainContext } from "../../context";
import PaginationUI from "../pagination";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
            steps: 4,
            activeCard: null
        }    
    }

    addActiveClass = (id) => {
        this.setState({
            activeCard: id
        });
    }

    render() {
        return(
            <MainContext.Consumer>
            {(context) =>
            <div className="displayLayout ht-500">
                <Tabs defaultActiveKey="all_users" onSelect={this.props.data.filterTabHandler}>
                    {
                        this.props.data.data.configs.tabs.map((item, i) => {
                            let usersDisplay = this.props.data.usersData.map((user, c) => {
                                
                                let list = [];
                                for(let c=1; c <= this.state.steps; c++) {
                                    list.push(<li className={(user.provisioning === c) ? 'active' : ''}></li>);
                                }
                                
                                return (
                                    <Card className={`${context.designType} ${this.state.activeCard === user.employeeId ? 'active' : ''}`} key={c} onClick={() => this.addActiveClass(user.employeeId)}>
                                        <Card.Body>
                                        <Card.Title className="card-title">{user.firstName}</Card.Title>
                                        <Card.Text>
                                            <strong>Manager : </strong>&nbsp;{user.manager && user.manager.name},&nbsp; 
                                            <strong>Employee Id : </strong>&nbsp;{user.employeeId}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>City : </strong>&nbsp;{user.address && user.address.city}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>User Provisioning Status</strong><br/>
                                            <ul className="progressbar">
                                                {
                                                    list
                                                }
                                            </ul>
                                        </Card.Text>
                                        <Card.Text>
                                            <span style={{fontWeight: '1000px'}}>Permissions : </span>&nbsp;<br/>
                                            <ul>
                                                {user.permissions && user.permissions.map(p => <li>{p}</li>)}
                                            </ul>
                                        </Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                            });
                            return (
                                <Tab eventKey={item.id} title={item.name} key={i}>
                                    {
                                        (this.props.data.usersData.length > 0) 
                                        ?
                                        usersDisplay
                                        :
                                        <h6 className="no-records-card">No records found!</h6>   
                                    }
                                </Tab>
                            )
                        })
                    }
                </Tabs>
                <div className="pagination">
                    {/* <PaginationUI 
                        data={this.props}
                    /> */}
                </div>
            </div>
            }
            </MainContext.Consumer>
        );
    }
}