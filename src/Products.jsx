import PropType from 'prop-types';
import { useState } from 'react';
function Products({data, addCarts}) {
    const [productId, setProductId] = useState('');
    return (
        <>
            <div className='row row-cols-3 my-3 g-4'>
                {data.map((item) => (
                    <div className="col" key={item.id}>
                    <div className="card">
                        <img src={item.imageUrl} className="img-fluid " alt="card" style={{height: '467px',objectFit:'cover'}} />
                        <div className="card-body">
                            <h6 className="card-title">{item.name}
                            <span className="float-end">$ {item.price}</span>
                            </h6>
                            <p>{item.description}</p>
                            <button type="button" href="#" className="btn btn-outline-success w-100"
                            onClick={() => {
                                addCarts({...item,qty: 1});
                                setProductId(item.id);
                                setTimeout(() => {
                                    setProductId('');
                                },1000);
                            }} disabled={productId === item.id}>加入購物車</button>
                        </div>
                    </div>
                </div>
                ))}
                
            </div>
        </>
    )
}
Products.propTypes = {
    data: PropType.array,
    addCarts: PropType.func,
  }
export default Products;