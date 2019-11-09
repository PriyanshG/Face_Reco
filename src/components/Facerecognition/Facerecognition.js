import React from 'react'
import './Facerecognition.css'

const Facerecognition=({imageurl,box})=>{
	return(
		<div className="center ma">
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageurl} width='500x' height='auto' />
				<div className='bounding-box' style={{top:box.topro,right:box.rightco,bottom:box.bottomro,left:box.leftco}}>
				</div>	
			</div>
		</div>
	);
}
export default Facerecognition;