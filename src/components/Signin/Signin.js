import React from 'react';

class Signin extends React.Component{
	
	constructor(props){
		super(props);
		this.state={
			signinemail:'',
			signinpassword:'',
		}
	}
	onemailchange=(event)=>{

		this.setState(Object.assign(this.state,{signinemail:event.target.value}));
	}

	onpasswordchange=(event)=>{
		//console.log('111');
		this.setState(Object.assign(this.state,{signinpassword:event.target.value}));
	}

	onformsubmit=(e)=>{
		e.preventDefault();
	}
	onsubmitsignin=(e)=>{
		//e.preventDefault();
		//console.log(this.state,'sffd');
		fetch('http://localhost:3000/signin',{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.signinemail,
				password:this.state.signinpassword
			}),
		})
		.then(response=>response.json())
		.then(user=>{
		//	console.log(data);
			if(user.id){
				this.props.loaduser(user);
			this.props.onroutechanges('home');
			}
		})

	} 

	render(){
		const{onroutechanges}=this.props;
	return(
	<article className="br ba dark-gray shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
			<main className="pa4 black-80">
	  <form className="measure" onSubmit={this.onformsubmit}>
	    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
	      <div className="mt3">
	        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
	        <input 
				onChange={this.onemailchange} 
				className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				type="email" 
				name="email-address"  
				id="email-address"
			/>
	      </div>
	      <div className="mv3">
	        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
	        <input 
				onChange={this.onpasswordchange}
				className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				type="password" 
				name="password"  
				id="password"
			/>
	      </div>

	    </fieldset>
	    <div className="">
	      <input onClick={this.onsubmitsignin}
	       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
	    </div>
	    <div className="lh-copy mt3">
	      <p onClick={()=>onroutechanges('register')} href="#0" className="f6 link dim black db pointer">Register</p>
	     
	    </div>
	  </form>
	</main>
</article>
	)};
}

export default Signin;
