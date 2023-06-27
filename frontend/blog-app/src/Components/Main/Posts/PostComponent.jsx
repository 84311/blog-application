import {Col, Row} from "react-bootstrap";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {DeleteConfirmationModalComponent} from "../Utils/DeleteConfirmationModalComponent";
import {PostTitleWithEditToggle} from "./PostTitleWithEditToggle";
import {ContentWithEditToggle} from "./ContentWithEditToggle";
import {dateFormatter} from "../Utils/utils";
import {editPostContentRequest, editPostTitleRequest, removePostRequest} from "../../../service";

export const PostComponent = ({postData}) => {
  const [title, setTitle] = useState(postData.title);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [content, setContent] = useState(postData.content);
  const [isContentEditing, setIsContentEditing] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [removed, setRemoved] = useState(false);

  const handleDeletePost = () => {
    setShowConfirmation(false);
    removePostRequest(postData.id)
      .then(() => setRemoved(true));
  };

  const handleTitleSaveChanges = (newTitle) => {
    setIsTitleEditing(false);
    editPostTitleRequest(postData.id, newTitle)
      .then(() => setTitle(newTitle));
  }

  const handleContentSaveChanges = (newContent) => {
    setIsContentEditing(false);
    editPostContentRequest(postData.id, newContent)
      .then(() => setContent(newContent));
  }

  return (
    <>
      {!removed &&
        <Row className="my-4 p-3 bg-light rounded-5 w-100">
          <Col md={12} className="me-3 ms-0">
            <h2 className="d-flex align-items-center">
              <PostTitleWithEditToggle
                title={title}
                isTitleEditing={isTitleEditing}
                setIsTitleEditing={setIsTitleEditing}
                handleTitleSaveChanges={handleTitleSaveChanges}/>
              {postData.postType !== "WELCOMING" &&
                <FontAwesomeIcon
                  icon={faTimes}
                  className="ms-auto delete-btn"
                  onClick={() => setShowConfirmation(true)}/>
              }
            </h2>
            <ContentWithEditToggle
              content={content}
              isContentEditing={isContentEditing}
              setIsContentEditing={setIsContentEditing}
              handleContentSaveChanges={handleContentSaveChanges}/>
          </Col>
          <Col>
            <div className="text-end">
              {dateFormatter(postData.date)}
            </div>
          </Col>

          <DeleteConfirmationModalComponent
            show={showConfirmation}
            onHide={() => setShowConfirmation(false)}
            onConfirm={handleDeletePost}/>
        </Row>
      }
    </>
  )
}
