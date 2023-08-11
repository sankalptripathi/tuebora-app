import React from "react";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { getAccounts } from "../../api/services";
import { MainContext } from "../../context";

export default class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compData: this.props.data,
            accountsData: [],
            designType: "grid-view"
        }
    }

    componentDidMount = async () => {
        const accountsData = await getAccounts();
        this.setState({
            accountsData: accountsData
        });
    }

    render() {
        return(
            <MainContext.Consumer>
            {(context) =>
                <div className="displayLayout ht-500">
                <Tabs defaultActiveKey={"all_accounts"}>
                    {
                    this.state.compData.data.tabsConfig.map((item, i) => {
                    return (<Tab eventKey={item.id} title={item.name} key={i}>
                        {
                            (this.state.accountsData.length > 0) &&
                            (this.state.accountsData.map((account) => 
                            <Card className={`${context.designType}`}>
                            <Card.Body className="accounts">
                                <Card.Title className="card-title">{account.title}</Card.Title>
                                <Card.Text>
                                    <strong>Body: </strong>
                                        {account.body}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Contact details: </strong>
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