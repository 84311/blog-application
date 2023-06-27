import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {useRef} from "react";

export const PostTitleWithEditToggle = ({title, isTitleEditing, setIsTitleEditing, handleTitleSaveChanges}) => {
  const titleInput = useRef(null);

  return (
    isTitleEditing ? (
      <>
        <input
          ref={titleInput}
          type="text"
          className="me-3"
          defaultValue={title}
          autoFocus/>
        <Button
          className="me-2"
          variant="danger"
          onClick={() => {
            setIsTitleEditing(false)
          }}>
          Delete changes</Button>
        <Button
          variant="success"
          onClick={() => handleTitleSaveChanges(titleInput.current.value)}>
          Save changes</Button>
      </>
    ) : (
      <>
        {title}
        <FontAwesomeIcon
          icon={faEdit}
          className="ms-3 edit-btn"
          onClick={() => setIsTitleEditing(true)}/>
      </>
    )
  )
}