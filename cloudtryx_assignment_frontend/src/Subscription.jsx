import { useLocation } from "react-router";


export const Subscription = ()=>{
    const location = useLocation();
    const product = location.state;

    return (
        <div id="subscription-container">
            <div className="container">
                <h2>Subscribe</h2>
                    <div className="flex-between">
                        <div className="price-head">
                            <span>{product.tier} Tier {product.popular?<span className="tag">🔥 Popular</span>:null}</span>
                            <p className="text-small fade-text">Per user/month, billed annually</p>
                        </div>
                        <p className="text-medium"><strong>{product.price[product.segment]}</strong></p>
                    </div>
                    <span><strong>{product.capability}</strong></span>
                    <ul className="offer-services">
                        {product.services.map((serv,ind)=><li key={ind}>{serv}</li>)}
                    </ul>
                    <button className="outline-btn" onClick={()=>{}}>Subscribe {product.tier} Tier</button>
                
            </div>
        </div>
    );
}