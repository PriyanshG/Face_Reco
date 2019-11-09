import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Imagelinkform from './components/Imagelinkform/Imagelinkform';
import Rank from './components/Rank/Rank';
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
		}
	}

	onInputchange=(event)=>{
		this.setState({input:event.target.value});
		console.log(event.target.value);
		console.log(this.state.input);
	}


	onSubmit=()=>{
		console.log('click');
		this.setState({imageurl:this.state.input});
			app.models.predict("a403429f2ddf4b49b307e318f00e528b", 
				this.state.input)
			.then (function(response) {
			     console.log(response.outputs[0].data.regions[0].region_info.bounding_box); // do something with response
			    },
			    function(err) {
			      // there was an error
			    }
			  );
	}
	render(){
	  return (
	    <div className="App">
	    <Particles  className='particles'
		      params={partilesoptions}
		    />
	     <Navigation />
	     <Logo/>
	     <Rank/>
	     <Imagelinkform onInputchange={this.onInputchange} onSubmit={this.onSubmit}/>
	     <Facerecognition imageurl={this.state.imageurl}/>
	    </div>
	  );
	}
}

export default App;
