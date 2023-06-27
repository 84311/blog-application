import {Button, Col, Row} from "react-bootstrap";
import {useRef, useState} from "react";
import {addPostRequest} from "../../../service";

export const AddPostComponent = ({setSortBy}) => {
  const [isPostAdding, setIsPostAdding] = useState(false);

  const titleInput = useRef(null);
  const contentInput = useRef(null);

  const addNewPost = () => {
    if (isPostAdding && titleInput.current.value && contentInput.current.value) {
      addPostRequest({
        title: titleInput.current.value,
        content: contentInput.current.value,
        postType: "NORMAL"
      })
        .then(() => {
          setIsPostAdding(false)
          setSortBy("DATE_DESC");
        });

    } else {
      setIsPostAdding(true);
    }
  }

  function renderInputs() {
    return <>
      <h2>
        <input
          ref={titleInput}
          type="text"
          className="me-3"
          placeholder="Post Title..."
          autoFocus
        />
      </h2>

      <textarea
        ref={contentInput}
        className="w-100"
        rows={15}
        placeholder="Post Content..."
      />
    </>
  }

  return (
    <>
      <Row className="bg-light rounded-5 p-3">
        <Col>
          {isPostAdding ? (
            <>
              {renderInputs()}

              <Button
                className="me-2"
                variant="danger"
                onClick={() => {
                  setIsPostAdding(false);
                  titleInput.current.value = "";
                  contentInput.current.value = "";
                }}
              >
                Close Without Adding
              </Button>

              <Button onClick={addNewPost} variant="success">
                Add Post
              </Button>

            </>
          ) : (
            <Button onClick={addNewPost} className="w-100 btn-lg" variant="success">+ Add Post</Button>
          )}
        </Col>
      </Row>
    </>
  )
}
