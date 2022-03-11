import React from "react";

export default function InfoMain(props) {
  return (
    <>
      <h3 className="text-warning">{props.projectDetail.projectName}</h3>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input placeholder="Search something..." className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {props.projectDetail.members?.map((member, index) => {
            return (
              <div key={index} className="avatar">
                <img src={member.avatar} alt="1" />
              </div>
            );
          })}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
