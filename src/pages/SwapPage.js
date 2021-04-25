import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import BookAPI from '../api/BookAPI';
import { fetchUserByID } from '../api/UserAPI';
import UserContext from '../contexts/UserContext';
import { Link } from 'react-router-dom';

function SwapPage() {

  const userContext = React.useContext(UserContext);

  const [Swaps, setSwaps] = useState([])

  useEffect(() => {
    getSwaps()
  }, [userContext.user])

  async function getSwaps() {
    if (userContext.user) {
        let my_swap_list = await BookAPI.fetchSwapList()
        let swap_array = await Promise.all(my_swap_list.map(async (swap) => {
          let book1_detail = await getBook(swap.book1)
          let book2_detail = await getBook(swap.book2)
          swap.book1 = book1_detail
          swap.book2 = book2_detail
          if (swap.user1 === userContext.user.id) {
            let response = await fetchUserByID(swap.user2)
            let data = await response.json()
            swap["email"] = data.email
          } else {
            let response = await fetchUserByID(swap.user1)
            let data = await response.json()
            swap["email"] = data.email
          }
          return swap
        }))
        console.log(swap_array)
        setSwaps(swap_array)
    }
  }

  async function getBook(book_id) {
    let book_detail = await BookAPI.fetchBookByID(book_id)
    return book_detail
  }

  async function handleButtonClickAccept(swap_id, status) {
    await BookAPI.editSwap(swap_id, {"status": status})
    getSwaps()
  }

  async function handleButtonClickDelete(swap_id) {
    await BookAPI.deleteSwap(swap_id)
    getSwaps()
  }

  function renderStatus(swap) {
    if (swap.status === "Accepted") {
      return `Swap Accepted. Email ${swap.email} to arrange a swap.`
    } else {
      return swap.status
    }
  }

  function renderSwapList() {
    let tableData = Swaps.map((item, index) => {
     return (
       <tbody>
        {(item.user1 === userContext.user.id)?
          <tr key={index}>
            <td><Link to={`books/${item.book1.id}`}>{item.book1.title}</Link></td>
            <td><Link to={`books/${item.book2.id}`}>{item.book2.title}</Link></td>
            <td>{renderStatus(item)}</td>
            <td>
              {item.status !== "Accepted" ?
              <p></p>
              : <div>
                <Button id={item.id} onClick={() => handleButtonClickAccept(item.id, "Complete")}>Swap Complete</Button>
                <Button id={item.id} onClick={() => handleButtonClickDelete(item.id)}>Cancel Swap</Button>
              </div>
              }
            </td>
          </tr>
          :
          <tr key={index}>
            <td><Link to={`books/${item.book2.id}`}>{item.book2.title}</Link></td>
            <td><Link to={`books/${item.book1.id}`}>{item.book1.title}</Link></td>
            <td>{renderStatus(item)}</td>
            <td>
              {item.status !== "Accepted" ?
              <div>
                <Button id={item.id} onClick={() => handleButtonClickAccept(item.id, "Accepted")}>Accept Swap</Button>
                <Button id={item.id} onClick={() => handleButtonClickDelete(item.id)}>Decline Swap</Button>
              </div> 
              : <div>
              <Button id={item.id} onClick={() => handleButtonClickAccept(item.id, "Complete")}>Swap Complete</Button>
              <Button id={item.id} onClick={() => handleButtonClickDelete(item.id)}>Cancel Swap</Button>
            </div>
              }
            </td>
          </tr>
        }
      </tbody>
     )})
    return tableData
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Your Book</th>
            <th>Proposed Swap</th>
            <th>Status</th>
            <th>Accept / Decline</th>
          </tr>
        </thead>
          {renderSwapList()}
      </Table>
    </div>
  );
}

export default SwapPage;