import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import BookAPI from '../api/BookAPI';
import UserContext from '../contexts/UserContext';

function SwapPage(props) {

  const userContext = React.useContext(UserContext);

  const [Swaps, setSwaps] = useState([])

  async function getSwaps() {
    if (userContext.user) {
        let my_swap_list = await BookAPI.fetchSwapList()
        let swap_array = await Promise.all(my_swap_list.map(async (swap) => {
          let book1_detail = await getBook(swap.book1)
          let book2_detail = await getBook(swap.book2)
          swap.book1 = book1_detail
          swap.book2 = book2_detail
          return swap
        }))
        setSwaps(swap_array)
    }
  }

  async function getBook(book_id) {
    let book_detail = await BookAPI.fetchBooksByID(book_id)
    return book_detail
  }
  
  useEffect(() => {
    getSwaps()
  }, [userContext.user])

  async function handleButtonClickAccept(swap_id, status) {
    await BookAPI.editSwap(swap_id, {"status": status})
    getSwaps()
  }

  async function handleButtonClickDelete(swap_id) {
    await BookAPI.deleteSwap(swap_id)
    getSwaps()
    }

  function renderSwapList() {
    
    let tableData = Swaps.map((item) => {
     return (
          <tr>
            <td>{item.book1.title}</td>
            <td>{item.book2.title}</td>
            <td>{item.status}</td>
            {(item.user2 == userContext.user.id) 
            ? (<td><Button id={item.id} onClick={() => handleButtonClickAccept(item.id, "Accepted")}>Accept Swap</Button></td>)
            : <td>Pending</td>}
            {(item.user2 == userContext.user.id) 
            ? (<td><Button id={item.id} onClick={() => handleButtonClickDelete(item.id)}>Decline Swap</Button></td>)
            : <td></td>}
          </tr>
     )
    }) 
    return tableData
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Book1</th>
            <th>Book2</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderSwapList()}
        </tbody>
      </Table>
    </div>
  );
}

export default SwapPage;