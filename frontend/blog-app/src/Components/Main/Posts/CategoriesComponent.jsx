import {Button} from "react-bootstrap";
import {useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {DeleteConfirmationModalComponent} from "../Utils/DeleteConfirmationModalComponent";
import {addCategoryRequest, getCategoriesRequest, removeCategoryRequest} from "../../../service";

export const CategoriesComponent = ({categoriesData}) => {
  const [categories, setCategories] = useState(categoriesData);
  const [categoryAdding, setCategoryAdding] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const categoryInputRef = useRef(null);

  const handleDeleteConfirmation = (id) => {
    setShowConfirmation(true);
    setCategoryToDeleteId(id);
  };

  const handleDeleteCategory = () => {
    setShowConfirmation(false);
    removeCategoryRequest(categoryToDeleteId)
      .then(() => updateCategories())
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setCategoryToDeleteId(null);
  };

  const addCategory = () => {
    let categoryName = categoryAdding && categoryInputRef.current.value
      ? categoryInputRef.current.value : false;

    if (categoryAdding && categoryName) {
      addCategoryRequest(categoryName)
        .then(() => updateCategories())

      categoryInputRef.current.value = "";
      setCategoryAdding(false);
    } else {
      setCategoryAdding(true);
    }
  };

  return (
    <>
      <div className="row bg-light rounded-5 p-3 my-lg-4 ms-lg-3 mb-4">
        <div>
          <h3>Categories</h3>
          <ul>
            {
              categories.map((category) => (
                <li className="categories" key={category.id}>
                  {category.name}
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="ms-3 delete-btn"
                    onClick={() => handleDeleteConfirmation(category.id)}
                  />
                </li>
              ))
            }
          </ul>
          {categoryAdding && (
            <input ref={categoryInputRef} type="text" className="mb-2" autoFocus/>
          )}
          <Button
            variant="success"
            onClick={addCategory}
          >
            Add Category
          </Button>
          <DeleteConfirmationModalComponent
            show={showConfirmation}
            onHide={handleCancelDelete}
            onConfirm={handleDeleteCategory}
          />
        </div>
      </div>
    </>
  )

  function updateCategories() {
    getCategoriesRequest().then(r => {
      setCategories(r.data);
    });
  }
}