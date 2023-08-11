import React from "react";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { getUsers } from "../../api/services";
import { MainContext } from "../../context";
import { Pagination } from "react-bootstrap/Pagination";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData: []
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
                        this.props.data.data.tabsConfig.map((item, i) => {
                        return (<Tab eventKey={item.id} title={item.name} key={i}>
                            {
                                (this.props.data.usersData.length > 0) &&
                                (this.props.data.usersData.map((user) => 
                                <Card className={`${context.designType}`}>
                                    <Card.Body>
                                    <Card.Title className="card-title">{user.firstName && user.lastName}</Card.Title>
                                    <Card.Text>
                                        <strong>Manager: </strong>{user.manager},&nbsp; 
                                        <strong>Employee Id: </strong>{user.id}
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
                            }
                        </Tab>)
                    })
                    }
                </Tabs>
            </div>
            }
            </MainContext.Consumer>
        );
    }
}