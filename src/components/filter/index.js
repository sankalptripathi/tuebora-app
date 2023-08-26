import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";
import _ from "lodash";

export default class FilterDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            managerName: '',
            usersList: [],
            cities: [],
        }
    }

    componentDidMount = async () => {
        const users = await this.props.data.getUsersFromDb();
        const accounts = await this.props.data.getAccountsFromDb();
        this.setState({
            usersList: this.props.data.usersData,
            accountsList: this.props.data.accountsData
        });
        this.props.data.getCitiesOfUsers(this.props.data.usersData);
        this.props.data.getCreatedDatesOfAccounts(this.props.data.accountsData);
    }

    render() {
    const selectedCityHash = document.location.href.indexOf('#') > -1 ? document.location.href.split('#')[1].substring(1) : '';
    const accountCreatedDate = document.location.href.indexOf('#') > -1 ? document.location.href.split('#')[1].substring(1) : '';

    return(
            <div className="filterDropdownWrapper ht-35">
                {
                    this.props.data.entityName === 'users' ?
                    <DropdownButton variant="info" id="filterDropdown" title="Filter By" size="sm" autoClose="outside">
                        <Dropdown.ItemText style={{fontSize: '12px'}}>
                            {this.props.data.data.configs.search && 
                            this.props.data.data.configs.search.allowedFilters[0].label}
                        </Dropdown.ItemText>
                        <DropdownButton variant="default" 
                        id="filterDropdownLocation"
                        name={this.props.data.data.configs.search.allowedFilters[0].name} 
                        title={selectedCityHash ? this.props.data.selectedCity : "Select City"} 
                        onSelect={
                            this.props.data.selectCity
                        }
                        size="sm"
                        ref={this.props.data.selectCityRef}
                        >
                            {
                                selectedCityHash !== '' &&
                                <Dropdown.Item eventKey={"Select City"} href="#/" key={0}>Select City</Dropdown.Item>
                            }
                            {
                                this.props.data.citiesList.map((city, i) => {
                                return (<Dropdown.Item eventKey={city} href={`#/${city}`} key={i}>
                                        {city}
                                    </Dropdown.Item>)
                                })
                            }
                        </DropdownButton>
                    <Dropdown.ItemText style={{fontSize: '12px'}}>
                        {
                            this.props.data.data.configs.search && 
                            this.props.data.data.configs.search.allowedFilters[1].label
                        }
                    </Dropdown.ItemText>
                    <Dropdown.Item>
                        <input 
                            ref={this.props.data.inputManagerRef}
                            type={`${this.props.data.data.configs.search.allowedFilters[1].type}`}
                            name={`${this.props.data.data.configs.search.allowedFilters[1].name}`}
                            value={this.props.data.managersData} 
                            onChange={(e) => this.props.data.inputManagerName(e)} 
                            // onKeyDown={this.props.data.detectKeyDown} 
                        />
                    </Dropdown.Item>
                </DropdownButton>
                :
                <DropdownButton variant="info" id="filterDropdown" title="Filter By" size="sm" autoClose="outside">
                        <Dropdown.ItemText style={{fontSize: '12px'}}>
                            {
                            this.props.data.data.configs.search && 
                            this.props.data.data.configs.search.allowedFilters[0].label
                            }
                        </Dropdown.ItemText>
                        <Dropdown.Item>
                            <input 
                                // ref={this.props.data.inputAccountCreatedDateRef}
                                type={`${this.props.data.data.configs.search.allowedFilters[0].type}`}
                                name={`${this.props.data.data.configs.search.allowedFilters[0].name}`}
                                // value={} 
                                // onChange={(e) => this.props.data} 
                            />
                        </Dropdown.Item>
                        <Dropdown.ItemText style={{fontSize: '12px'}}>
                            {
                                this.props.data.data.configs.search && 
                                this.props.data.data.configs.search.allowedFilters[1].label
                            }
                        </Dropdown.ItemText>
                        <Dropdown.Item>
                            <input 
                                ref={this.props.data.inputAccountIdRef}
                                type={`${this.props.data.data.configs.search.allowedFilters[1].type}`}
                                name={`${this.props.data.data.configs.search.allowedFilters[1].name}`}
                                value={this.props.data.inputAccountId} 
                                onChange={(e) => this.props.data.inputAccountIdHandler(e)} 
                            />
                        </Dropdown.Item>
                </DropdownButton>
                }
            </div>
        );
    }
}