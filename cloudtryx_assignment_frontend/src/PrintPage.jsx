import { useMemo, useState } from "react";



export const PrintPage = ()=>{
    const [billingData, setBillingData] = useState([]);
    const [inputData,setInputData] = useState({
        ind:0,product_name:'',qty:1,price:0,amount:0
    });
    const [action,setAction] = useState('add');

    const handleInput = ()=>{
        setBillingData([...billingData,inputData]);
        setInputData({product_name:'',qty:1,price:0,amount:0});
    }
    const handleEdit = ()=>{
        let data = billingData;
        data[inputData.ind] = inputData;
        setBillingData([...data]);
        setInputData({product_name:'',qty:1,price:0,amount:0});
        setAction('add');
    }

    const deleteItem = (ind)=>{
        setBillingData(billingData.filter((item,key)=>key!=ind));
    }
    
    const finalPrice = useMemo(()=>{
        let tot_qty=0;
        let tot_price=0;
        let tot_amount=0;
        let after_gst = 0;
        billingData.forEach((item,key)=>{
            tot_qty += item.qty;
            tot_price += item.price;
            tot_amount += item.amount;
        });
        after_gst = tot_amount + tot_amount*0.18
        return {tot_qty,tot_price,tot_amount,after_gst}
    },[billingData]);

    const printBill = ()=>{
        window.print();
    }
    
    return( 
        <div id="print-page-container" className="container">
            <h2>Sample Billing page</h2>
            <div className="billing-container">
                <h4>GST Bill</h4>
                <label htmlFor="">Name: <strong>Tushar Dasare</strong></label><br />
                <label htmlFor="">Email: <strong>tushardasare1701@gmail.com</strong></label><br /><br />

                <div className="flex-form">
                    <label htmlFor="product_name">
                        <span>Product Name: </span>
                        <input type="text" id="product_name" name="product_name" value={inputData.product_name} onChange={(e)=>setInputData({...inputData,[e.target.name]:e.target.value})} placeholder="Product Name"/>
                    </label>
                    <label htmlFor="qty">
                        <span>Quantity: </span>
                        <input type="number" id="qty" name="qty" value={inputData.qty} onChange={(e)=>setInputData({...inputData,[e.target.name]:parseInt(e.target.value)})} placeholder="Quantity"/>
                    </label>
                    <label htmlFor="price">
                        <span>Price: </span>
                        <input type="number" id="price" name="price" value={inputData.price} onChange={(e)=>setInputData({...inputData,[e.target.name]:parseInt(e.target.value),amount:inputData.qty*e.target.value})} placeholder="Price"/>
                    </label>
                    {
                        action=='add'?<button onClick={handleInput}>Add Item</button>:
                        <button onClick={handleEdit}>Edit item</button>
                    }
                    
                </div>

                <table style={{width:"100%",borderCollapse:'collapse',border:"1px solid #eee"}}>
                    <thead>
                        <tr>
                            <th>S.no.</th>
                            <th>Product Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billingData.map((data,ind)=>{
                            return(
                                <tr key={ind} style={{textAlign:'center'}}>
                                    <td>{ind+1}</td>
                                    <td onClick={()=>{setInputData({...data,ind});setAction('edit')}}>{data.product_name}</td>
                                    <td>{data.qty}</td>
                                    <td>{data.price}</td>
                                    <td>{data.amount}</td>
                                    <td><button className="link" onClick={()=>deleteItem(ind)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot style={{border:"1px solid #eee"}}>
                        <tr>
                            <th>Total</th>
                            <th>----------</th>
                            <th>{finalPrice.tot_qty}</th>
                            <th>{finalPrice.tot_price}</th>
                            <th>{finalPrice.tot_amount}</th>
                        </tr>
                    </tfoot>
                </table>
                <div className="flex-end">
                   <p><strong>Final Amount (18% GST): {finalPrice.after_gst}</strong></p> <button onClick={printBill}>Print</button>
                </div>
            </div>
        </div>
    );
}