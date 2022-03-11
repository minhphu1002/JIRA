/* eslint-disable react-hooks/exhaustive-deps */
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import * as Yup from "yup";
import { EDIT_PROJECT } from "../../../redux/constants/Cyberbugs/Cyberbugs";

function FormEditProject(props) {
  const arrCategory = useSelector((state) => state.CategoryReducer.arrCategory);
  const dispatch = useDispatch();
  const { values, handleChange, handleSubmit, setFieldValue } = props;

  useEffect(() => {
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", submitFunction: handleSubmit });
  }, [dispatch, handleSubmit]);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <form className="container-fuild" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              value={values.id}
              disabled
              className="form-control"
              name="id"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              onChange={handleChange}
              value={values.projectName}
              className="form-control"
              name="projectName"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              onChange={handleChange}
              className="form-control"
              name="categoryId"
              value={values.categoryId}
            >
              {arrCategory.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description"
              value={values.description}
              init={{
                selector: "textarea#myTextArea",

                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor |alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const editProjectForm = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    const { projectEdit } = props;

    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: EDIT_PROJECT,
      projectEdit: values,
    });
  },
  displayName: "EditProJect",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(editProjectForm);
