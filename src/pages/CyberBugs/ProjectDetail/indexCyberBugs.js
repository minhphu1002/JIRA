import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentMain from "../../../components/Cyberbugs/Main/ContentMain";
import InfoMain from "../../../components/Cyberbugs/Main/InfoMain";
import HeaderMain from "../../../components/Cyberbugs/Main/HeaderMain";

import { GET_PROJECT_DETAIL_SAGA } from "../../../redux/constants/Cyberbugs/Cyberbugs";

export default function IndexCyberBugs(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let projectId = props.match.params.projectId;
    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId: projectId,
    });
  }, [dispatch, props.match.params.projectId]);

  return (
    <div className="main ml-5 mt-4">
      <HeaderMain projectDetail={projectDetail} />
      <InfoMain projectDetail={projectDetail} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
