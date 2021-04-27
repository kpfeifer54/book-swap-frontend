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
      <DropdownButton className="App-button" id="dropdown-item-button" title={props.list_type} onSelect={(e) => props.handleSelect(e)}>
        {Lists.map((item, index) => (
        <Dropdown.Item key={index} eventKey={item.list_name_encoded}>{item.display_name}</Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}

export default BestSellers;