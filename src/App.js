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

    this.state = {
      designType: 'grid-view',
      usersPageSchema: {},
      accountsPageSchema: {}
    }
  }

  componentDidMount = async () => {
    let usersSchema = await getUserSchema();
    let accountsSchema = await getAccountsSchema();

    this.setState({
      usersPageSchema: usersSchema,
      accountsPageSchema: accountsSchema
    });
  }

  toggleDesignType = (e) => {
    const str = e.currentTarget.className;
    this.setState(() => ({
      designType: str.includes('grid') ? 'grid-view' : ''
    }));
  }

  render() {
    if(this.state.usersPageSchema && this.state.usersPageSchema.configs && this.state.usersPageSchema.configs.search && this.state.accountsPageSchema.heading) {
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