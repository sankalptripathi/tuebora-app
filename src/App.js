import './App.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './components';
import Header from './components/header';
import User from './components/user';
import Account from './components/account';
import LayoutHoc from './components/hoc';
import 'bootstrap/dist/css/bootstrap.css';
import ErrorPage from './components/errorpage';
import React, { Suspense } from 'react';
import { MainContext } from './context';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.userData = {
      classList: {
        mainWrapper: 'tabs-display users-display',
        searchWrapper: 'searchbox',
        tabsWrapper: 'tabs-ui'
      },
      compHeading: "Users Management",
      tabsConfig: [
        {
          "name": "All Users",
          "id": "all_users"
        },
        {
          "name": "My Team Users",
          "id": "Sankalp"
        }
      ]
  };
    this.accountData = {
      classList: {
        mainWrapper: 'tabs-display account-display',
        searchWrapper: 'searchbox',
        tabsWrapper: 'tabs-ui'
      },
      compHeading: "Accounts Management",
      tabsConfig: [
        {
          "name": "All Accounts",
          "id": "all_accounts"
        },
        {
          "name": "Orphaned Accounts",
          "id": "orphaned_accounts"
        }
      ]
    };

    this.state = {
      designType: 'grid-view'
    }
  }

  toggleDesignType = (e) => {
    const str = e.currentTarget.className;
    this.setState(() => ({
      designType: str.includes('grid') ? 'grid-view' : ''
    }));
  }

  render() {
    const UserComponent = LayoutHoc(User, this.userData);
    const AccountComponent = LayoutHoc(Account, this.accountData);

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
}

export default App;