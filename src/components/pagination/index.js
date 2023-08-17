import React from "react";
import _ from "lodash";
import Pagination from "react-bootstrap/Pagination";
import { getUsers } from "../../api/services";

export default class PaginationUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: []
        }
    }

    componentDidMount = async () => {
        const allRecords = await getUsers(this.props.data.data.currentTab, this.props.data.data.limit);
        this.setState({
           usersList: allRecords
        });
    }

    render() {
    return(
        <div className="paginationWrapper">
            {
                this.state.usersList.length &&
                this.state.usersList.map((item, i) => {
                    return (
                        <Pagination.Item 
                            onClick={(e, i) => this.props.data.data.handlePageSwitch(e, i+1)}
                            key={i+1} 
                            active={(i+1) === this.props.data.data.activePage}
                            tabIndex={i+1}
                        >
                            {i+1}
                        </Pagination.Item>
                    )
                })
            }    
        </div>
        );
    }
}