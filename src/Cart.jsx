import { useState } from 'react';
import PropType from 'prop-types';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Cart({data,menuTotal,upCartsQty,deleteCart,createOrders}) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <button type="button" className="btn btn-outline-secondary position-relative" onClick={handleShow}>
    <i className="bi bi-cart fs-5"></i>
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {data.length}
    <span className="visually-hidden">unread messages</span>
  </span>
</button>
      <Offcanvas show={show} onHide={handleClose}  placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>購物車</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={data.length === 0 ? 'd-block' : 'd-none'}>
          <h2>購物車內，目前無商品加入!</h2>
        </Offcanvas.Body>
        <Offcanvas.Body className={data.length !== 0 ? 'd-block' : 'd-none'}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" width="50">操作</th>
              <th scope="col">品項</th>
              <th scope="col">描述</th>
              <th scope="col" width="90">數量</th>
              <th scope="col">單價</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
              <td><button type="button" className="btn btn-sm"
              onClick={() => deleteCart(item)}>x</button></td>
              <td>{item.name}</td>
              <td><small>{item.description}</small></td>
              <td>
                <select className="form-select" value={item.qty} onChange={(e) => {
                  let newQty = parseInt(e.target.value);
                  upCartsQty({...item, qty: newQty});
                }}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </td>
              <td>{item.price}</td>
              <td>{item.price * item.qty}</td>
            </tr>
            ))}
            
          </tbody>
        </table>
        <div className="text-end mb-3">
          <h5>總計: <span>${menuTotal}</span></h5>
        </div>
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="備註"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="text-end">
          <button className="btn btn-primary"
          onClick={() => {
            createOrders([
              {
                orderId: new Date().getTime(),
                carts: data,
                message: text,
                total: menuTotal,
              },
            ]);
            alert('送出訂單完成!');
            setText('');
            handleClose();
            setTimeout(() => {
              const totalPageHeight = document.documentElement.scrollHeight;
              window.scrollBy(0,totalPageHeight);
            },250);
            
          }}>送出</button>
        </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
Cart.propTypes = {
  data: PropType.array,
  menuTotal: PropType.number,
  upCartsQty: PropType.func,
  deleteCart: PropType.func,
  createOrders: PropType.func,
}
export default Cart