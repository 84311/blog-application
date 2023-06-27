import React, {useRef} from 'react';
import {Button, Col, Dropdown, Form, FormControl, Row} from 'react-bootstrap';

const SearchBar = ({setSearchQuery, setSortBy}) => {
  const searchQueryRef = useRef("");

  const handleSortChange = (e) => {
    setSortBy(e);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchQueryRef.current.value);
  };

  return (
    <Row className="my-4 p-3 bg-light rounded-5">
      <Col md={6}>
        <Form onSubmit={handleSearchSubmit} className="d-flex">
          <FormControl
            type="text"
            className="me-2"
            placeholder="Search"
            ref={searchQueryRef}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </Col>
      <Col md={6} className="d-flex align-items-center justify-content-end mt-3 mt-md-0">
        <Dropdown onSelect={handleSortChange}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sort By
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="ALPHABETICALLY_ASC">Alphabetically Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="ALPHABETICALLY_DESC">Alphabetically Descending</Dropdown.Item>
            <Dropdown.Item eventKey="DATE_ASC">Date Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="DATE_DESC">Date Descending (default)</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>

  );
};

export default SearchBar;
