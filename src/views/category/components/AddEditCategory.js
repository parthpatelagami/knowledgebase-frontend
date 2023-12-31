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
  FormGroup,
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
import {
  createNewCategory,
  editCategory,
  getAllCategory,
  checkCategoryMapping,
} from "../store/action";
import { checkCategory } from "../../../redux/action";

const MySwal = withReactContent(Swal);

const AddEditCategory = ({
  type,
  setShowAddCategoryModal,
  rowInfo,
  setFormAction,
  toggleAddCategoryModal,
}) => {
  // ** Set Schema
  const AddEditCategorySchema = yup
    .object()
    .shape({
      name: yup
        .string()
        .required("Name is required.")
        .min(4, "Name should be atleast 4 characters.")
        .test(
          "Duplicate-Category",
          "Category Name already exist",
          async function (value) {
            if (value) {
              try {
                const categoryId =
                  type === "edit-category" ? rowInfo.category_id : null;
                const response = await dispatch(
                  checkCategory({ name: value, id: categoryId })
                ).unwrap();
                if (response.success === true) {
                  return false;
                } else {
                  return true;
                }
              } catch (error) {
                return false;
              }
            }
            return true;
          }
        ),
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
      name: "",
      description: "",
      status: 1,
    },
    mode: "onChange",
    resolver: yupResolver(AddEditCategorySchema),
  });

  // ** Hooks & States
  const dispatch = useDispatch();
  const [isFormSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    if (type === "edit-category") {
      reset({
        name: rowInfo.name,
        status: rowInfo.status,
        description: rowInfo.description,
      });
    }
  }, [type]);

  const onSubmit = async (event) => {
    try {
      switch (type) {
        case "add-category":
          dispatch(createNewCategory(event)).unwrap();
          MySwal.fire({
            title: `Successfully Created!`,
            text: "Category has been added successfully.!",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
          setFormSubmitting(false);
          setFormAction(null);
          dispatch(getAllCategory());
          break;
        case "edit-category":
          const category_id = rowInfo.category_id;
          const response = await dispatch(
            checkCategoryMapping(category_id)
          ).unwrap();
          if (response.success === true && event.status === 0) {
            setFormAction(null);

            MySwal.fire({
              icon: "error",
              title: "Oops!",
              text: "One or more selected categories are mapped with a sub-category.",
            });
            return;
          }
          await dispatch(editCategory({ event, category_id })).unwrap();
          MySwal.fire({
            title: `Successfully Updated!`,
            text: "Category has been updated successfully.!",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
          setFormSubmitting(false);
          setFormAction(null);
          dispatch(getAllCategory());
          break;
        default:
      }
      toggleAddCategoryModal();
      setFormSubmitting(false);
      reset({
        name: "",
        description: "",
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <ErrorBoundary>
      <Fragment>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className='gy-1 pt-75'>
            <Col md={6} xs={12}>
              <Label className='form-label' htmlFor='name'>
                Name<span style={{ color: "red" }}> * </span>
              </Label>
              <Controller
                control={control}
                id='name'
                name='name'
                render={({ field }) => (
                  <Input
                    id='name'
                    placeholder='Enter Category Name'
                    className={errors.name ? "is-invalid" : ""}
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <FormFeedback>{errors.name.message}</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' htmlFor='status'>
                Status<span style={{ color: "red" }}> * </span>
              </Label>
              <Controller
                control={control}
                id='status'
                name='status'
                render={({ field }) => (
                  <FormGroup className='mb-0' switch>
                    <Input
                      type='switch'
                      id='statusSwitch'
                      role='switch'
                      checked={field.value === 1}
                      onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                    />
                    <Label check htmlFor='statusSwitch'>
                      {field.value === 1 ? "Active" : "Inactive"}
                    </Label>
                  </FormGroup>
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' htmlFor='description'>
                Description
              </Label>
              <Controller
                control={control}
                id='description'
                name='description'
                render={({ field }) => (
                  <Input
                    id='description'
                    type='textarea'
                    placeholder='Enter Category Name'
                    {...field}
                  />
                )}
              />
            </Col>

            <Col xs={12} className='text-center mt-2 pt-50'>
              {!isFormSubmitting ? (
                <Button className='me-1' type='submit' color='primary'>
                  Submit
                </Button>
              ) : (
                <Button color='primary' disabled className='me-1'>
                  <Spinner size='sm' />
                  <span className='ms-50'>Submitted...</span>
                </Button>
              )}
              <Button
                type='button'
                color='warning'
                outline
                onClick={() => {
                  setShowAddCategoryModal(false);
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

export default AddEditCategory;
