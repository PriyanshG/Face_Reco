import React from 'react';

const Navigation=({onroutechanges,issigned})=>{
	
		if(issigned){
			
			return(
				<nav style={{display:'flex',justifyContent:'flex-end'}}>
				<p onClick={()=>onroutechanges('signin')} className='f3 link dim black underline pa3 pointer'> Sign Out </p> 
				</nav> 
			);
		}
		else{
			return(
			<nav style={{display:'flex',justifyContent:'flex-end'}}>
				<p onClick={()=>onroutechanges('signin')} className='f3 link dim black underline pa3 pointer'> Sign In</p> 
				<p onClick={()=>onroutechanges('register')} className='f3 link dim black underline pa3 pointer'> Register</p> 
			</nav> 
			);
		}
	
}

export default Navigation;
