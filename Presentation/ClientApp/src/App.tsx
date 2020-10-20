import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pageComponents/Home";
import Invoices from "./pageComponents/invoices/Invoices";
import CreateInvoice from './pageComponents/invoices/CreateInvoice';
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";

import "./App.scss"

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <AuthorizeRoute path='/create' component={CreateInvoice} />
        <AuthorizeRoute path='/invoices' component={Invoices} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
