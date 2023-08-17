import React from "react";
import Searchbox from "../search";
import FilterDropdown from "../filter";
import LayoutToggler from "../toggler";
import { getAccounts, getUsers } from "../../api/services";
import { flattenObject } from "../helpers";

export default function LayoutHoc(CompName, data) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.searchFieldRef = React.createRef();
            this.selectCityRef = React.createRef();
            this.inputManagerRef = React.createRef();
            
            this.state = {
                searchFieldRef: this.searchFieldRef,
                selectCityRef: this.selectCityRef,
                inputManagerRef: this.inputManagerRef,
                data: data,
                usersData: [],
                accountsData: [],
                selectedCity: '',
                citiesList: [],
                managersData: [],
                currentTab: '',
                limit: 30,
                activePage: 1,
                searchTextString: '',
                entityName: '',
                getUsersFromDb: this.getUsersFromDb,
                filterTabHandler: this.filterTabHandler,
                filterTabHandlerAccounts: this.filterTabHandlerAccounts,
                getCitiesOfUsers: this.getCitiesOfUsers,
                getCreatedDatesOfAccounts: this.getCreatedDatesOfAccounts,
                selectCity: this.selectCity,
                inputManagerName: this.inputManagerName,
                searchTextHandler: this.searchTextHandler,
                getAccountsFromDb: this.getAccountsFromDb,
                handlePageSwitch: this.handlePageSwitch
            }
        }
        componentDidMount = () => {
            const entityName = (
                document.location.href.indexOf('users') > -1 ? 
                'users' : 
                document.location.href.indexOf('accounts') > -1 ? 
                'accounts' : 
            '');
            this.setState({
                entityName
            });
        }
        getUsersFromDb = async () => {
            const usersData = await getUsers(this.state.currentTab, this.state.limit);
            await this.setState({
                usersData,
            });
        }
        getAccountsFromDb = async () => {
            const accountsData = await getAccounts(this.state.currentTab, this.state.limit);
            await this.setState({
                accountsData,
            });
        }   
        handlePageSwitch = async (e, pgI) => {
            const pageIndex = pgI + 1;
            if(pageIndex) {
                this.setState({
                    activePage: pageIndex
                });
                await getUsers("", this.state.limit);
            }
        }
        filterTabHandler = async (mgr = '') => {
            this.setState({
                currentTab: mgr
            }, 
            async () => await this.getUsersFromDb());
            document.location.href = "#/";
        }
        filterTabHandlerAccounts = async (acc = '') => {
            this.setState({
                currentTab: acc
            }, 
            async () => await this.getAccountsFromDb());
            document.location.href = "#/";
        }
        getCitiesOfUsers = (users) => {
            if(users.length) {
                const citiesArr = users.map(u => u.address.city);
                const uniqueArr = [];
                for(let city of Object.values(citiesArr)) {
                    if(uniqueArr.indexOf(city) <= -1) {
                        uniqueArr.push(city);
                    }
                }
                this.setState({
                    citiesList: uniqueArr,
                    selectedCity: citiesArr[0]
                });
            }
        }
        getCreatedDatesOfAccounts = (accounts) => {
            if(accounts.length) {
                const accountsArr = accounts.map(u => u.createdDate);
                const uniqueArr = [];
                
            }
        }
        selectCity = (city) => {
            const inputManagerField = this.inputManagerRef && this.inputManagerRef.current && this.inputManagerRef.current.value;

            if(city !== "Select City") {
                this.setState({
                    selectedCity: city
                }, async () => {
                    const allUsers = await getUsers(this.state.currentTab);
                    const filteredUsersFromCity = allUsers && allUsers.filter(user => {
                        return (
                            (inputManagerField) ? 
                            (user.address.city === this.state.selectedCity && user.manager.toLowerCase() === inputManagerField.toLowerCase()) : 
                            user.address.city === this.state.selectedCity
                        )
                    });
                    console.log(filteredUsersFromCity); // giving filtered users on selecting city
                    this.setState({
                        usersData: filteredUsersFromCity
                    });
                });
            }
            else {
                this.filterTabHandler(this.state.currentTab);
            }
        }
        inputManagerName = (elem) => {
            const selectCity = this.selectCityRef && this.selectCityRef.current && this.selectCityRef.current.innerText;

            const manager = elem.target ? elem.target.value : elem.value;
            this.setState({
                managersData: manager
            }, () => {
                // console.log(managers);
                if(manager) {
                    const users = this.state.usersData.filter(u => {
                        return (
                            (manager.indexOf(u.manager.name.toLowerCase()) > -1) && 
                            (selectCity === "Select City" ? true : selectCity === u.address.city)
                        );
                    });
                    (users.length > 0) &&
                    this.setState({
                        usersData: users
                    });
                }
                else {
                    this.filterTabHandler(this.state.currentTab);
                }
            });
        }
        searchTextHandler = (elem, allowed) => {
            if(allowed) {
                let allowedFields = allowed;
                const selectCity = this.selectCityRef && this.selectCityRef.current && this.selectCityRef.current.innerText;

                const textQuery = elem.target ? elem.target.value : elem.value;
                this.setState({
                    searchTextString: textQuery
                }, () => {
                    // console.log(managers);
                    if(textQuery) {
                        let thisUserDetails = [];
                        const users = this.state.usersData && this.state.usersData.filter(u => {
                            const flatObj = flattenObject(u);
                            for(let item in flatObj) {
                                if(allowedFields.indexOf(item) > -1) {
                                    if(String(u[item]).toLowerCase() === textQuery || String(flatObj[item]).toLowerCase() === textQuery) {
                                        thisUserDetails.push(u);
                                    }
                                }
                            }

                            if(thisUserDetails.length) {
                                this.setState({
                                    usersData: thisUserDetails
                                });
                            }

                            // return (
                            //     (u.indexOf(textQuery.toLowerCase()) > -1) && 
                            //     (selectCity === "Select City" ? true : selectCity === u.address.city)
                            // );
                        });
                        // (users.length > 0) &&
                        // this.setState({
                        //     usersData: users
                        // });
                    }
                    else {
                        this.filterTabHandler(this.state.currentTab);
                    }
                });
            }
        }
        render() {
            return (
                <div className="hoc-wrapper">
                    <h6 className="main-heading">{this.state.data.heading}</h6>
                    <div className="search-comp component">
                        <form ref={this.searchFieldRef}>
                            <Searchbox data={this.state} />
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