import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import CricketerScreen from "./Screens/CricketerScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import CricketerListScreen from "./Screens/CricketerListScreen";
import CricketerEditScreen from "./Screens/CricketerEditScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route
            path="/admin/cricketerlist"
            component={CricketerListScreen}
            exact
          />
          <Route
            path="/admin/cricketerlist/:pageNumber"
            component={CricketerListScreen}
            exact
          />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/admin/cricketer/:id/edit"
            component={CricketerEditScreen}
          />
          <Route path="/cricketer/:id" component={CricketerScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
          />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>

      <Footer />
    </Router>
  );
};
export default App;
