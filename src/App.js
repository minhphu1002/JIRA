import React from "react";
import { Switch } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Modal from "./HOC/Modal/Modal";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import DrawerCyberBugs from "./HOC/CyberBugs/DrawerCyberBugs";
import IndexCyberBugs from "./pages/CyberBugs/ProjectDetail/indexCyberBugs";
import SignUpCyberBugs from "./pages/CyberBugs/SignUpCyberBugs/SignUpCyberBugs";
import UserManagement from "./pages/CyberBugs/UserManagement/UserManagement";

function App() {
  return (
    <>
      <Modal />
      <LoadingComponent />
      <DrawerCyberBugs />
      <Switch>
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <UserLoginTemplate exact path="/signup" Component={SignUpCyberBugs} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={IndexCyberBugs} />
        <UserLoginTemplate exact path="/" Component={LoginCyberBugs} />
        <CyberbugsTemplate
          exact
          path="/projectdetail/:projectId"
          Component={IndexCyberBugs}
        />

        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />

        <CyberbugsTemplate
          exact
          path="/usermanagement"
          Component={UserManagement}
        />
        <CyberbugsTemplate exact path="/" component={IndexCyberBugs} />
      </Switch>
    </>
  );
}

export default App;
