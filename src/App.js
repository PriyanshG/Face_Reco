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
import Clarifai from 'clarifai';
const app = new Clarifai.App({
 apiKey: '641529200e4742079d67230d6c230abc'
});


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
class App extends Component{

	constructor(){
		super();
		this.state={
			input:'',
			imageurl:'', 
			box:{},
			route:'signin',
			issigned:'false',
		}
	}


	//componentDidMount(){
	//	console.log('sdf1');
	//	fetch('http://192.168.69.21:3000')
	//		.then(response =>response.json())
	//		.then(console.log)
	//};

	calculatefacelocation=(data)=>{
			console.log(data);
			const clarifaiface=data.outputs[0].data.regions[0].region_info.bounding_box;
			const image=document.getElementById('inputimage');
			const width=Number(image.width);
			const height=Number(image.height);
			console.log(width,height);
			return {
				leftco:clarifaiface.left_col*width,
				topro:clarifaiface.top_row*height,
				rightco:width-clarifaiface.right_col*width,
				bottomro:height-clarifaiface.bottom_row*height,
			}

	}
	onInputchange=(event)=>{
		this.setState({input:event.target.value});
		console.log(event.target.value);
		console.log(this.state.input);
	}


	displayfacebox=(box)=>{
		console.log(box);
		this.setState({box:box});
	}
	onSubmit=()=>{
		console.log('click');
		this.setState({imageurl:this.state.input});
			app.models.predict("a403429f2ddf4b49b307e318f00e528b", 
				this.state.input)
			.then (response=>this.displayfacebox(this.calculatefacelocation(response)))
			.catch(err=>console.log(err));
			
	}

	onroutechanges=(route)=>{
		console.log(0,this.state.route,route,this.state.issigned);
		if(route==='home'){
			console.log('in')

			this.setState(Object.assign(this.state,{issigned:true}))
		}
		else
			this.setState(Object.assign(this.state,{issigned:false}))
		this.setState(Object.assign(this.state,{route:route}));
		console.log(1,this.state.route,this.state.issigned);
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
			     <Rank/>
			     <Imagelinkform onInputchange={this.onInputchange}  onSubmit={this.onSubmit}/>
			     <Facerecognition box={this.state.box} imageurl={this.state.imageurl}/>
			   </div>
		  	:(
		  		this.state.route==='signin'
		  		?<Signin onroutechanges={this.onroutechanges}/>
		  		:<Register onroutechanges={this.onroutechanges}/>
			)
		  }  
	    </div>
	  );
	}
}

export default App;
