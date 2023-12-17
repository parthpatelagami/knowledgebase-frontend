// React Imports
import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

// ** Actions
import {
  checkCategoryMapping,
  deleteCategory,
  getAllCategory,
} from "../../../store/action";

// ** Sweet Alert Import
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const DeleteForm = ({
  rowInfo,
  componentIndex,
  selectedAction,
  setFormAction,
  setShowDeleteForm,
}) => {
  // ** Hooks
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedAction === componentIndex) {
      MySwal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this category!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ms-1",
        },
        buttonsStyling: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        async preConfirm() {
          try {
            const response = await dispatch(
              checkCategoryMapping(rowInfo)
            ).unwrap();
            if (response.success === true) {
              setFormAction(null);
              MySwal.showValidationMessage(
                `Oops! One or More Selected Category is Mapped With a Sub-Category`
              );
              return;
            }
            await dispatch(deleteCategory(rowInfo)).unwrap();
            setFormAction(null);
            dispatch(getAllCategory());
            return true;
          } catch (error) {
            setFormAction(null);
            MySwal.showValidationMessage(
              `Oops! We cannot delete this category, please try again or contact support.`
            );
          }
        },
      }).then(function (result) {
        if (result.value) {
          MySwal.fire({
            icon: "success",
            title: "Deleted!",
            text: `Category has been deleted.`,
            customClass: {
              confirmButton: "btn btn-success",
            },
            allowOutsideClick: false,
          });
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          setFormAction(null);
        }
      });
    }
    if (setShowDeleteForm) setShowDeleteForm(false);
  }, [selectedAction]);

  return <Fragment></Fragment>;
};

export default DeleteForm;
