import PropType from 'prop-types';
function Orders({data}) {
    return (
        <>
        <div className='row justify-content-center'>
      <div className="col-8">
        {data?.map((items) => (
        <div className="card my-3" key={items.orderId}>
        <div className="card-body">
          <div className="card-title">
            <h5>訂單編號:{items.orderId}</h5>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">品項</th>
                  <th scope="col">數量</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                {items?.carts?.map((item) => (
                  <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.price * item.qty}</td>
                </tr>
                ))}
                
              </tbody>
            </table>
            <div className="text-end">備註: <span>{items.message}</span></div>
            <div className="text-end">
              <h5>總計: <span>${items.total}</span></h5>
            </div>
          </div>
        </div>
      </div>
        ))}
      </div>
    </div>
        </>
    )
}
Orders.propTypes = {
  data: PropType.array,
}
export default Orders;