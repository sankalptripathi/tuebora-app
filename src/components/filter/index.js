import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";
import { getUsers } from "../../api/services";

export default class FilterDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            managerName: '',
            usersList: [],
            cities: [],
            selectedCity: ''
        }
    }

    componentDidMount = async () => {
        const users = await this.props.data.getUsersFromDb();
        this.setState({
            usersList: this.props.data.usersData
        });
        this.getCitiesOfUsers(this.props.data.usersData);
    }

    getCitiesOfUsers = (users) => {
        const citiesArr = users.map(u => u.address.city);
        this.setState({
            cities: citiesArr,
            selectedCity: citiesArr[0]
        });
    }

    handleManagerName = (e) => {
        this.setState({
            managerName: e.target.value
        });
    }

    changeValue = (city) => {
        // debugger;
        const cityFormat = city.split("/")[1];
        this.setState({
            selectedCity: cityFormat
        }, () => {
            const filteredUsersFromCity = this.props.data.usersData.filter(user => {
                return (user.address.city === this.state.selectedCity)
            });
            console.log(filteredUsersFromCity);     // giving filtered users on selecting city
            this.props.data.getUsersFromDb();
        });
    }

    render() {
    return(
            <div className="filterDropdownWrapper ht-35">
                <DropdownButton variant="info" id="filterDropdown" title="Filter By" size="sm" autoClose="outside">
                    <Dropdown.ItemText style={{fontSize: '12px'}}>Location</Dropdown.ItemText>
                        <DropdownButton variant="default" 
                        id="filterDropdownLocation" 
                        title={this.state.selectedCity} 
                        onSelect={this.changeValue} 
                        size="sm">
                            {
                                this.state.cities.map(city => {
                                    return (<Dropdown.Item href={`#/${city}`}>
                                                {city}
                                            </Dropdown.Item>)
                                })
                            }
                        </DropdownButton>
                    <Dropdown.ItemText style={{fontSize: '12px'}}>Manager</Dropdown.ItemText>
                    <Dropdown.Item>
                        <input type="text" name="managerName" onChange={this.handleManagerName} value={this.state.managerName} />
                    </Dropdown.Item>
                </DropdownButton>
            </div>
        );
    }
}