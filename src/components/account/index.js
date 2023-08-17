import React from "react";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { MainContext } from "../../context";
import Pagination from "react-bootstrap/Pagination";
import PaginationUI from "../pagination";

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountsData: [],
            activeCard: null
        }
    }

    componentDidMount = () => {
        const accountsData = this.props.data.getAccountsFromDb();
        this.setState({
            accountsData: this.props.data.accountsData
        });
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
                <Tabs defaultActiveKey="all_accounts" onSelect={this.props.data.filterTabHandlerAccounts}>
                    {
                        this.props.data.data.configs.tabs.map((item, i) => {
                            return (
                                <Tab eventKey={item.id} title={item.name} key={i}>
                                    {
                                        (this.props.data.accountsData.length > 0) 
                                        ?
                                        (this.props.data.accountsData.map((account, c) => 
                                        <Card className={`${context.designType} ${this.state.activeCard === account.id ? 'active' : ''}`} key={c} onClick={() => this.addActiveClass(account.id)}>
                                            <Card.Body className="account-card-body">
                                                <Card.Title className="card-title">{account.name}</Card.Title>
                                                <Card.Text>
                                                    <strong>Company : </strong>&nbsp;{account.company}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Created Date : </strong>&nbsp;
                                                    {account.createdDate}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Created by : </strong>&nbsp;
                                                    {account.createdBy}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Account type : </strong>&nbsp;
                                                    {account.orphaned ? 
                                                    "Orphaned" : 
                                                    "Normal"}
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
                    {/* <PaginationUI entityName={this.props.data.entityName} tabName={this.props.data.currentTab} pageLimit={this.state.limit} /> */}
                </div>
            </div>
            }
            </MainContext.Consumer>
        );
    }
}