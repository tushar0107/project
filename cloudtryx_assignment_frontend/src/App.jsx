import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, Router, Routes } from 'react-router'
import { Login } from './Login'
import { PrintPage } from './PrintPage'
import { Pricing } from './Pricing'
import { Subscription } from './Subscription'

export const AppContext = React.createContext({});

function App() {
	const [authenticated,setAuthenticated] = useState(false);
	const [tokens,setTokens] = useState(null);

	useEffect(()=>{
		let cookies_array = document.cookie.split("; ");
		if(cookies_array){
			let cookie_string = cookies_array.filter(e=>e.startsWith('auth_token'))[0];
			if(cookie_string){
				let token = JSON.parse(cookie_string.split('auth_token=')[1]);
				if(token){
					setTokens(token);
					setAuthenticated(true);
				}
			}
		}
	},[]);

	const logout = ()=>{
		setAuthenticated(false);
		document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	}


	return (
		<AppContext.Provider value={{authenticated,setAuthenticated,tokens,setTokens}}>
			<header>
				<ol className='list'>
					<li className='li-item'>
						{authenticated?
						<button onClick={()=>logout()}>Logout</button>:
						<Link to={'/login'} className='btn'>Login</Link>}
					</li>
					<li className='li-item'>
						<Link to={'/print-page'} className='btn'>Print Page</Link>
					</li>
					<li className='li-item'>
						<Link to={'/pricing'} className='btn'>Pricing</Link>
					</li>
				</ol>
			</header>
			<main>
				<Routes>
					<Route path='/' Component={Login}/>
					<Route path='/login' Component={Login}/>
					<Route path='/print-page' Component={PrintPage}/>
					<Route path='/pricing' Component={Pricing}/>
					<Route path='/subscribe' Component={Subscription}/>
				</Routes>
			</main>
		</AppContext.Provider>
	)
}

export default App
