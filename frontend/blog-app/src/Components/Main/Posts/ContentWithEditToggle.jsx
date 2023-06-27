import {useRef} from "react";
import {Button, Col, Row} from "react-bootstrap";

export const ContentWithEditToggle = ({content, isContentEditing, setIsContentEditing, handleContentSaveChanges}) => {
  const contentInput = useRef(null);

  function renderEditContentInputOrContent() {
    return <div>
      {isContentEditing ? (
        <textarea
          ref={contentInput}
          className="w-100"
          rows={15}
          defaultValue={content}
          autoFocus
        />
      ) : (
        <>
          {
            <p dangerouslySetInnerHTML={{__html: content.replaceAll("\n", "</br>")}}></p>
          }
        </>
      )}
    </div>;
  }

  function renderEditControlButtons() {
    return <Row>
      <Col>
        {isContentEditing ? (
          <>
            <Button
              className="me-2 mt-2"
              variant="danger"
              onClick={() => {
                setIsContentEditing(false)
              }}>
              Delete changes
            </Button>
            <Button
              className="mt-2"
              variant="success"
              onClick={() => handleContentSaveChanges(contentInput.current.value)}>
              Save changes
            </Button>
          </>
        ) : (
          <Button
            className="mt-2"
            variant="dark"
            onClick={() => setIsContentEditing(true)}
          >
            Edit
          </Button>
        )}
      </Col>
    </Row>;
  }

  return (
    <>
      {renderEditContentInputOrContent()}
      {renderEditControlButtons()}
    </>
  )
}