import React from "react";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { MainContext } from "../../context";
import Pagination from "react-bootstrap/Pagination";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
        }
    }

    componentDidMount = () => {
        const usersData = this.props.data.getUsersFromDb();
        this.setState({
            usersData: this.props.data.usersData,
            accountsData: this.props.data.accountsData
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
                            return (
                                <Tab eventKey={item.id} title={item.name} key={i}>
                                    {
                                        (this.props.data.usersData.length > 0) 
                                        ?
                                        (this.props.data.usersData.map((user, c) => 
                                        <Card className={`${context.designType}`} key={c}>
                                            <Card.Body>
                                            <Card.Title className="card-title">{user.firstName}</Card.Title>
                                            <Card.Text>
                                                <strong>Manager: </strong>{user.manager.name},&nbsp; 
                                                <strong>Employee Id: </strong>{user.employeeId}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Address: </strong><br/>
                                                {user.address.address}<br/>
                                                {user.address.city},&nbsp;{user.address.state}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Contact details: </strong><br/>
                                                {user.email}<br/>
                                                {user.phone}
                                            </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        ))
                                        :
                                        <h6 className="no-records-card">No records found!</h6>   
                                    }
                                </Tab>
                            )
                        })
                    }
                </Tabs>
                <div className="paginationWrapper">
                    <Pagination size="sm">
                    {
                        this.props.data &&
                        this.props.data.usersData &&
                        this.props.data.usersData.map((item, i) => {
                            return (
                                <Pagination.Item 
                                    onClick={(e, i) => this.props.data.handlePageSwitch(e, i)}
                                    key={i+1} 
                                    active={(i+1) === this.props.data.activePage}
                                    tabIndex={i+1}
                                >
                                    {i+1}
                                </Pagination.Item>
                            )
                        })
                    }    
                    </Pagination>
                </div>
            </div>
            }
            </MainContext.Consumer>
        );
    }
}