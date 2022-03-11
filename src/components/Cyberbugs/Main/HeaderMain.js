import React from "react";

export default function HeaderMain(props) {
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">{props.projectDetail.projectName}</li>
        </ol>
      </nav>
    </div>
  );
}
