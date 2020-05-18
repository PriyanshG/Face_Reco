import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Imagelinkform from './components/Imagelinkform/Imagelinkform';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Facerecognition from './components/Facerecognition/Facerecognition';
import Particles from 'react-particles-js';
import 'tachyons'


const partilesoptions={
	    		particles: {

	    			line_linked: {
	    				shadow: {
	    					enable: true,
	    					color: "#3CA9D1",
	    					blur: 5
	    				}
	    			}
	    		}
	    
	     

}


const intialstate={
			input:'',
			imageurl:'', 
			box:{},
			route:'signin',
			issigned:false,

			user:{
				id:'',
				name:'',
				email:'',
				entries:0,
				joined:'',
			}
	}
class App extends Component{

	constructor(){
		super();
		this.state=intialstate;
	}

	loaduser=(data)=>{
		this.setState(Object.assign(this.state.user,{
			id:data.id,
			name:data.name,
			email:data.email,
			entries:data.entries,
			joined:data.joined
			}))
	}
	calculatefacelocation=(data)=>{
			const clarifaiface=data.outputs[0].data.regions[0].region_info.bounding_box;
			const image=document.getElementById('inputimage');
			const width=Number(image.width);
			const height=Number(image.height);
			return {
				leftco:clarifaiface.left_col*width,
				topro:clarifaiface.top_row*height,
				rightco:width-clarifaiface.right_col*width,
				bottomro:height-clarifaiface.bottom_row*height,
			}

	}
	onInputchange=(event)=>{
		this.setState({input:event.target.value});
	}


	displayfacebox=(box)=>{
		this.setState({box:box});
	}
	onSubmit=()=>{
		if(this.state.input.length){
		this.setState({imageurl:this.state.input});
			fetch('https://mighty-escarpment-70042.herokuapp.com/imageurl',{
				method:'post',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
					input:this.state.input
				})
			})
			.then(response=>response.json())
			.then (response=>{
				if(response){
					fetch('https://mighty-escarpment-70042.herokuapp.com/image',{
						method:'put',
						headers:{'Content-Type':'application/json'},
						body:JSON.stringify({
							id:this.state.user.id
						})
					})
					.then(response=>response.json())
					.then(count=>{
						this.setState(Object.assign(this.state.user,{entries:count}))

					})
				}			

			this.displayfacebox(this.calculatefacelocation(response))
			})
		}
	}


	onroutechanges=(route)=>{
		if(route==='home'){

			this.setState(Object.assign(this.state,{issigned:true}))
		}
		else{
			this.setState(Object.assign(this.state,intialstate));
			this.setState(Object.assign(this.state,{issigned:false}))
		}
		this.setState(Object.assign(this.state,{route:route}));
	}

	onsignout=(route)=>{
		this.setState({route:'route'});
	}
	render(){
	  return (

	    <div className="App">
	  	
	    <Particles  className='particles'
		      params={partilesoptions}
		    />

		<Navigation onroutechanges={this.onroutechanges} issigned={this.state.issigned} />
		
		  {
		  	this.state.route==='home'
		  	?<div>
			     <Logo/>
			     <Rank name={this.state.user.name} entries={this.state.user.entries}/>
			     <Imagelinkform onInputchange={this.onInputchange}  onSubmit={this.onSubmit}/>
			     <Facerecognition box={this.state.box} imageurl={this.state.imageurl}/>
			   </div>
		  	:(
		  		this.state.route==='signin'
		  		?<Signin loaduser={this.loaduser} onroutechanges={this.onroutechanges}/>
		  		:<Register loaduser={this.loaduser} onroutechanges={this.onroutechanges}/>
			)
		  }  
	    </div>
	  );
	}
}

export default App;
