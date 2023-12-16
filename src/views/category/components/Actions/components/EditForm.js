// React Imports
import React, { useState } from "react";

// ** Reactstrap Component Imports
import { Modal, ModalHeader, ModalBody } from "reactstrap";

// ** Sub Component Import
import AddEditCategory from "../../AddEditCategory";

const EditForm = ({
  componentIndex,
  selectedAction,
  rowInfo,
  setFormAction,
}) => {
  // ** State
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  // ** Toggle Modal
  const toggleAddCategoryModal = () => {
    setShowAddCategoryModal(!showAddCategoryModal);
  };

  return (
    <Modal
      scrollable
      className={"modal-dialog-centered modal-lg"}
      isOpen={componentIndex === selectedAction}
      toggleAddCategoryModal={toggleAddCategoryModal}
      backdrop='static'
    >
      <ModalHeader onClick={() => setFormAction(null)}>
        Edit Category
      </ModalHeader>
      <ModalBody>
        <AddEditCategory
          type='edit-category'
          setShowAddCategoryModal={setShowAddCategoryModal}
          rowInfo={rowInfo}
          setFormAction={setFormAction}
        />
      </ModalBody>
    </Modal>
  );
};
export default EditForm;
