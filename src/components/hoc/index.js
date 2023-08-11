import React from "react";
import Searchbox from "../search";
import FilterDropdown from "../filter";
import LayoutToggler from "../toggler";
import { getAccounts, getUsers } from "../../api/services";

export default function LayoutHoc(CompName, data) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: data,
                usersData: [],
                accountsData: [],
                getUsersFromDb: this.getUsersFromDb,
                filterTabHandler: this.filterTabHandler
            }
            this.searchFormRef = React.createRef();
        }
        getUsersFromDb = async () => {
            const usersData = await getUsers();
            this.setState({
                usersData: usersData,
            });
        }
        getAccountsFromDb = async () => {
            const accountsData = await getAccounts();
            this.setState({
                accountsData: accountsData
            });
        }
        filterTabHandler = async (mgr) => {
            const filterResults = await getUsers(mgr);
            this.setState({
                usersData: filterResults
            });
        }
        render() {
            return (
                <div className="hoc-wrapper">
                    <h6 className="main-heading">{this.state.data.compHeading}</h6>
                    <div className="search-comp component">
                        <form ref={this.searchFormRef}>
                            <Searchbox/>
                            <FilterDropdown data={this.state}/>
                        </form>
                    </div>
                    <div className="tabs-comp component">
                        <div className="layoutTogglerWrapper align-right">
                            <LayoutToggler/>
                        </div>
                        <div className="layoutDisplayWrapper align-left">
                            <CompName data={this.state} {...this.props} />
                        </div>
                    </div>
                </div>
            );
        }
    }
}