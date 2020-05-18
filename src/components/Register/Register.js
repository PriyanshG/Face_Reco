import React from 'react'

class Register extends React.Component{


	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
		}
	}
	onemailchange=(event)=>{

		console.log(event.target.value);
		this.setState(Object.assign(this.state,{email:event.target.value}));
	}

	onpasswordchange=(event)=>{
		//console.log('111');
		console.log(event.target.value);
		this.setState(Object.assign(this.state,{password:event.target.value}));
	}

	onnamechange=(event)=>{
		//console.log('111');
		console.log(event.target.value);
		this.setState(Object.assign(this.state,{name:event.target.value}));
	}

	onformsubmit=(event)=>{
		event.preventDefault();
	}


	onregisterin=(event)=>{
		//e.preventDefault();
		//console.log(this.state,'sffd');
		fetch('https://mighty-escarpment-70042.herokuapp.com/register',{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.email,
				name:this.state.name,
				password:this.state.password
			}),
		})
		.then(response=>response.json())
		.then(user=>{
			console.log(user);
			if(user.id){
				this.props.loaduser(user);
			this.props.onroutechanges('home');
			}
		})
		//.catch(console.log('unable to register'));

	} 

	render(){
	//console.log('sdf');
	return(
	<article className="br ba dark-gray shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
			<main className="pa4 black-80">
			  <form className="measure " onSubmit={this.onformsubmit}>
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			       <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
			        <input 
			          onChange={this.onnamechange}
			          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			          type="text" 
			          name="full_name"  
			          id="name"
			         />
			      </div>
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
			      <input 
			       onClick={this.onregisterin}
			       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
			       type="submit" 
			       value="Register"
			      />
			    </div>
			   
			  </form>
			</main>
	</article>
	)};

}

export default Register;