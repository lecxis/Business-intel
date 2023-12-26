import React from "react";
import { Route, redirect, Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
/*const PrivateRoutes = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Navigate to="/login" />
      )
    }
  />
);*/

// nbew method

const PrivateRoutes = (auth) => {
  //let auth = {'token':true}
return (
  auth.isAuthenticated === true ? <Outlet/> : <Navigate to='/login'/>
  )
}
PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoutes);