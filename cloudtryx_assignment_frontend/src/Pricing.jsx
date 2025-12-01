import { useState } from "react";
import { Subscription } from "./Subscription";
import { Link } from "react-router";


export const Pricing = ()=>{
    const [segment,setSegment] = useState('monthly');
    const [product,setProduct] = useState(null);
    const [offers,setOffers] = useState([
        {
            tier:'Free',
            popular: false,
            price: {monthly:'$0',annually:'$0'},
            services: ['Free e-mail alerts','3-minute checks','Automatic data enrichment','10 monitors','Up to 3 seats'],
            capability: 'For your Hobby projects'
        },
        {
            tier: 'Pro',
            popular: true,
            price: {monthly:'$85',annually:'$1000'},
            services: ['Unlimited phone calls','30 second checks','Single-user account','20 monitors','Up to 6 seats'],
            capability: 'Great for small business'
        },
        {
            tier: 'Enterprise',
            popular: false,
            price: {monthly:'Custom',annually:'Custom'},
            services: ['Everything in Pro','Up to 5 team members','100 monitors', '15 status pages','200+ integrations'],
            capability: 'For multiple teams'
        }
    ]);

    return(
        // design inspired from https://dribbble.com/shots/24565088-Cashbank-Pricing-Page
        <div id="pricing-container" className="container">
            <div className="head-container">
                <h1>Plans and Pricing</h1>
                <p>Receive uinlimited credits when you pay yearly, and save on your plan.</p>
            </div>
            <div className="segment" onClick={()=>setSegment(segment=='monthly'?'annually':'monthly')}>
                <div className={'seg'}>Monthly</div>
                <div className={'seg'}>Annual <span>Save 35%</span></div>
                <div className={`seg-bg ${segment}`}></div>
            </div>
            <div className="flex-center">
                {
                    offers.map((offer,ind)=>{
                        return(
                            <div className={`pricing ${ind==offers.length-1?"dark":'light'}`} key={ind}>
                                <span>{offer.tier} {offer.popular?<span className="tag">🔥 Popular</span>:null}</span>
                                <div className="price-head">
                                    <p className="text-medium"><strong>{offer.price[segment]}</strong></p>
                                    <p className="text-small fade-text">Per user/month, billed annually</p>
                                </div>
                                <span><strong>{offer.capability}</strong></span>
                                <ul className="offer-services">
                                   {offer.services.map((serv,ind)=><li key={ind}>{serv}</li>)}
                                </ul>
                                <Link className="outline-btn" to={'/subscribe'} state={{...offer,segment}}>Get started for {offer.tier}</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}