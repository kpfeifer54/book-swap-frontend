import React from 'react';
import Button from 'react-bootstrap/Button';

function SwapButtons(props) {
  //props = swap_status, my_swap, handleButtonClickAccept, handleButtonClickDelete, book_id
  function renderButtons() {
    if (!props.my_swap && props.swap_status === "Proposed") {
      //A Proposed swap by another user will return accept/decline buttons
      return (
        <div>
          <Button id={props.book_id} onClick={() => props.handleButtonClickAccept(props.book_id, "Accepted")}>Accept Swap</Button>
          <Button id={props.book_id} onClick={() => props.handleButtonClickDelete(props.book_id)}>Decline Swap</Button>
        </div> 
      )
    }
    if (props.swap_status === "Accepted") {
      //An Accepted swap returns complete and cancel buttons
      return (
        <div>
          <Button id={props.book_id} onClick={() => props.handleButtonClickAccept(props.book_id, "Complete")}>Swap Complete</Button>
          <Button id={props.book_id} onClick={() => props.handleButtonClickDelete(props.book_id)}>Cancel Swap</Button>
        </div>
      )
    }
  }

  return (
    <td>
      { renderButtons() }
    </td>
  );
}

export default SwapButtons;