import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuCyberbugs() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/img.jpg")} alt="alt" />
        </div>
        <div className="account-info">
          <p>MRX</p>
          <p>Front End Dev</p>
        </div>
      </div>

      <div className="control">
        <div className="control_item">
          <i className="fa fa-list" />
          <NavLink
            activeClassName="active font-weight-bold"
            to="/projectmanagement"
          >
            Project Management
          </NavLink>
        </div>

        <div className="control_item">
          <i className="fa fa-user" />
          <NavLink
            activeClassName="active font-weight-bold"
            to="/usermanagement"
          >
            User Management
          </NavLink>
        </div>

        <div className="control_item">
          <i className="fa fa-cog" />
          <NavLink
            activeClassName="active font-weight-bold"
            to="/createproject"
          >
            New Project
          </NavLink>
        </div>
      </div>

      <div className="feature">
        <div className="control_item">
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>

        <div className="control_item">
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>

        <div className="control_item">
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>

        <div className="control_item">
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>

        <div className="control_item">
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
