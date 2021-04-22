import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import NYTimesAPI from '../../api/NYTimesAPI';

function BestSellers(props) {

  const [Lists, setLists] = useState([])

  async function getLists() {
    let cat_list = await NYTimesAPI.fetchLists()
    setLists(cat_list.results)
  }

  useEffect(() => {
    getLists()
  }, [])

  return (
    <div>
      <DropdownButton id="dropdown-item-button" title="Select List" onSelect={props.handleSelect}>
        <Dropdown.Item eventKey="all-books">User Books</Dropdown.Item>
        {Lists.map((item) => (
        <Dropdown.Item eventKey={item.list_name_encoded}>{item.display_name}</Dropdown.Item>
        ))}
    </DropdownButton>
    </div>
  );
}

export default BestSellers;