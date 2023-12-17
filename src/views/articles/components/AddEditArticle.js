
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Label,
  FormFeedback,
  Spinner,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Custom Componenets
import InputPasswordToggle from "@components/input-password-toggle";
import ErrorBoundary from "@components/ErrorBoundary";
import { showNotifications } from "@components/Notifications";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

// ** Actions
import { createNewArticle, editUser, getAllArticles } from "../store/action";
import { checkEmailID, getAllRoles } from "../../../redux/action";
import EditorUncontrolled from "../../../@core/components/draftWysiwyg/EditorUncontrolled";
import FileUploaderMultiple from "../../../@core/components/fileuploader";
import { getUUID } from "../store/action";
import {getAllCategory} from "../../category/store/action"

const MySwal = withReactContent(Swal);

const AddEditUser = ({
  type,
  setShowAddUserModal,
  rowInfo,
  setFormAction,
  toggleAddUserModal,
}) => {
  // ** Set Schema
  const AddEditUserSchema = yup
    .object()
    .shape({
      articleName: yup
        .string()
        .required("Article Name is required.")
        .min(4, "Article Name should be atleast 4 characters."),
      category: yup.string().required("Category is required."),
      subCategory: yup.string().required("Sub Category is required."),
    })
    .required();

  // ** Hook
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      articleName: "",
      category: "",
      subCategory: "",
      articleDescription: "",
      articleAttachment: "",
      status: "",
    },
    mode: "onChange",
    resolver: yupResolver(AddEditUserSchema),
  });

  // ** Hooks & States
  const dispatch = useDispatch();
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const [categorys, setCategory] = useState([]);
  const [subCategorys, setSubCategory] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [UUID, setUUID] = useState("");
  const [userId, setUserId] = useState(0);
  const [files, setFiles] = useState([])
  const [filesName, setFilesName] = useState([])

  const handleContentChange = (htmlValue) => {
    setEditorContent(htmlValue);
  };

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await dispatch(getAllCategory()).unwrap();
        const categoryOptions = response.filter((r) => r.status === 1)
        .map((r) => ({
          value: r.category_id,
          label: r.name,
        }));
        setCategory(categoryOptions);
      } catch (error) {
        showNotifications({
          type: "error",
          title: "Oops! Something went wrong!",
          message: `We cannot fetch category data, please try again or contact support.`,
        });
      }
    }
    async function fetchSubCategory() {
      try {
        const response = await dispatch(getAllRoles()).unwrap();
        const subCategory = response.role;
        const subCategoryOptions = subCategory.map((r) => ({
          value: r.role_id,
          label: r.role_name,
        }));
        setSubCategory(subCategoryOptions);
      } catch (error) {
        showNotifications({
          type: "error",
          title: "Oops! Something went wrong!",
          message: `We cannot fetch sub category data, please try again or contact support.`,
        });
      }
    }
    fetchCategory();
    fetchSubCategory();
    getRandomUUID();
    getCurrentUserId();

    function getCurrentUserId() {
        const userId = localStorage.getItem('userId') || ''
        setUserId(parseInt(userId))
    }

    function getRandomUUID() {
        if(type == 'add-article') {
            const uuid=crypto.randomUUID();
            if(uuid !=undefined) {
                setUUID(uuid)
            }
        }
    }
    
  }, []);

  useEffect(() => {
    if (type === "edit-user") {
      reset({
        articleName: rowInfo.Name,
        role: rowInfo.role,
        role: rowInfo.role_id,
        category: rowInfo.Category_id
      });
    }
  }, [type]);

  const onSubmit = async (event) => {
    event.uuid = UUID;
    event.userId = userId;
    event.Attachments = filesName;
    console.log(filesName)
    try {
      switch (type) {
        case "add-article":
          dispatch(createNewArticle(event)).unwrap();
          MySwal.fire({
            title: `Successfully Created!`,
            text: "Article has been added successfully.!",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
          setFormSubmitting(false);
          setFormAction(null);
          dispatch(getAllArticles());
          break;
        case "edit-user":
          const user_id = rowInfo.user_id;
          await dispatch(editUser({ event, user_id })).unwrap();
          MySwal.fire({
            title: `Successfully Updated!`,
            text: "User has been updated successfully.!",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
          setFormSubmitting(false);
          setFormAction(null);
          dispatch(getAllArticles());
          break;
        default:
      }
      toggleAddUserModal();
      setFormSubmitting(false);
      reset({
        articleName: "",
        category: "",
        subCategory: "",
        articleDescription: "",
        articleAttachment: "",
        status: "",
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <ErrorBoundary>
      <Fragment>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="gy-1 pt-75">
            <Col md={12} xs={12}>
              <Label className="form-label" htmlFor="ArticleName">
                Article Name<span style={{ color: "red" }}> * </span>
              </Label>
              <Controller
                control={control}
                id="articleName"
                name="articleName"
                render={({ field }) => (
                  <Input
                    id="articleName"
                    placeholder="Enter Article Name"
                    className={errors.articleName ? "is-invalid" : ""}
                    {...field}
                  />
                )}
              />
              {errors.articleName && (
                <FormFeedback>{errors.articleName.message}</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" htmlFor="Category">
                Category<span style={{ color: "red" }}> * </span>
              </Label>
              <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    isClearable
                    inputId="category"
                    className={`react-select ${
                      errors.category ? `is-invalid` : ``
                    }`}
                    inputRef={ref}
                    theme={selectThemeColors}
                    placeholder="Select Category"
                    options={categorys}
                    classNamePrefix="select"
                    value={categorys.find((c) => c.value === value) || ""}
                    onChange={(val) => {
                      const value = val ? val.value : "";
                      onChange(value);
                    }}
                    isOptionDisabled={(option) => option.isdisabled}
                  />
                )}
              />
              {errors.category && (
                <FormFeedback>{errors.category.message}</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" htmlFor="SubCategory">
                Sub-Category<span style={{ color: "red" }}> * </span>
              </Label>
              <Controller
                control={control}
                name="subCategory"
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    isClearable
                    inputId="subCategory"
                    className={`react-select ${
                      errors.subCategory ? `is-invalid` : ``
                    }`}
                    inputRef={ref}
                    theme={selectThemeColors}
                    placeholder="Select Sub-Category"
                    options={subCategorys}
                    classNamePrefix="select"
                    value={subCategorys.find((c) => c.value === value) || ""}
                    onChange={(val) => {
                      const value = val ? val.value : "";
                      onChange(value);
                    }}
                    isOptionDisabled={(option) => option.isdisabled}
                  />
                )}
              />
              {errors.subCategory && (
                <FormFeedback>{errors.subCategory.message}</FormFeedback>
              )}
            </Col>
            <Col md={12} xs={12}>
              <Label className="form-label" htmlFor="Status">
                Status<span style={{ color: "red" }}> * </span>
              </Label>
              <Controller
                control={control}
                name="status"
                render={({ field: { onChange, value } }) => (
                  <div className="form-check form-switch">
                    <Input
                      type="switch"
                      name="customSwitch"
                      id="exampleCustomSwitch"
                      onChange={(e) => {
                        onChange(e.target.checked ? 1 : 0);
                      }}
                      defaultChecked={value === 1}
                    />
                  </div>
                )}
              />
            </Col>
            <Col md={12} xs={12}>
              <Label className="form-label" htmlFor="ArticleDescription">
                Article Description<span style={{ color: "red" }}> * </span>
              </Label>
              <Controller
                control={control}
                name="articleDescription"
                render={({ field: { onChange, value, ref } }) => (
                  <EditorUncontrolled
                    onContentChange={(content) => {
                      handleContentChange(content);
                      onChange(content);
                    }}
                    value={value}
                    error={errors.articleAttachment}
                  />
                )}
              />
            </Col>
            <Col md={12} xs={12}>
              <Label className="form-label" htmlFor="FileUpload">
                File Upload<span style={{ color: "red" }}> * </span>
              </Label>
              <Controller
                control={control}
                name="articleAttachment"
                render={({ field: { onChange, value, ref } }) => (
                  <FileUploaderMultiple uuid={UUID} files={files} setFiles={setFiles} filesName={filesName} setFilesName={setFilesName}/>
                )}
              />

              {errors.role && (
                <FormFeedback>{errors.role.message}</FormFeedback>
              )}
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              {!isFormSubmitting ? (
                <Button className="me-1" type="submit" color="primary">
                  Submit
                </Button>
              ) : (
                <Button color="primary" disabled className="me-1">
                  <Spinner size="sm" />
                  <span className="ms-50">Submitted...</span>
                </Button>
              )}
              <Button
                type="button"
                color="warning"
                outline
                onClick={() => {
                  setShowAddUserModal(false);
                  setFormAction(null);
                }}
              >
                Close
              </Button>
            </Col>
          </Row>
          </Form>
      </Fragment>
    </ErrorBoundary>
  );
};

export default AddEditUser;
