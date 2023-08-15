import './App.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './components';
import Header from './components/header';
import User from './components/user';
import Account from './components/account';
import LayoutHoc from './components/hoc';
import 'bootstrap/dist/css/bootstrap.css';
import ErrorPage from './components/errorpage';
import React from 'react';
import { MainContext } from './context';
import { getAccountsSchema, getUserSchema } from './api/services';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.userData = {
        classList: {
          mainWrapper: 'tabs-display users-display',
          searchWrapper: 'searchbox',
          tabsWrapper: 'tabs-ui'
        },
        configs: {
          tabs: [
            {
              "name": "All Users",
              "id": "all_users"
            },
            {
              "name": "My Team Users",
              "id": "Sankalp"
            }
          ]
        }
    };
    this.accountData = {
      classList: {
        mainWrapper: 'tabs-display account-display',
        searchWrapper: 'searchbox',
        tabsWrapper: 'tabs-ui'
      }
    };

    this.state = {
      designType: 'grid-view',
      usersPageSchema: this.userData,
      accountsPageSchema: this.accountData
    }
  }

  componentDidMount = async () => {
    let usersSchema = await getUserSchema();
    let accountsSchema = await getAccountsSchema();

    const usersUpdatedSchema = _.merge(usersSchema, this.state.usersPageSchema);
    const accountsUpdatedSchema = _.merge(accountsSchema, this.state.accountsPageSchema);

    this.setState({
      usersPageSchema: usersUpdatedSchema,
      accountsPageSchema: accountsUpdatedSchema
    });
  }

  toggleDesignType = (e) => {
    const str = e.currentTarget.className;
    this.setState(() => ({
      designType: str.includes('grid') ? 'grid-view' : ''
    }));
  }

  render() {
    if(this.state.usersPageSchema.configs.search && this.state.accountsPageSchema.heading) {
      const UserComponent = LayoutHoc(User, this.state.usersPageSchema);
      const AccountComponent = LayoutHoc(Account, this.state.accountsPageSchema);

      return (
          <div className="TubeoraApp align-left">
            <MainContext.Provider value={{designType: this.state.designType, setDesignType: this.toggleDesignType}}>
            <BrowserRouter>
              <Header/>
                <Routes>
                    <Route path="/" exact element={<Main/>} />
                    <Route path="/users" exact element={<UserComponent/>} />
                    <Route path="/accounts" exact element={<AccountComponent/>} />
                    <Route path="*" element={<ErrorPage error={'Page not found'}/>} />
                </Routes>
            </BrowserRouter>
            </MainContext.Provider>
        </div>
      );
    }
    else {
      return (
        <div className="TubeoraApp align-left">
          <span>Loading...</span>
        </div>
    );
    }
  }
}

export default App;