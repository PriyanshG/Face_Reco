import React from 'react'

const Facerecognition=({imageurl})=>{
	return(
		<div className="center ma">
			<div className='absolute mt2'>
				<img alt='loading' src={imageurl} width='500x' height='auto' />
			</div>
		</div>
	);
}
export default Facerecognition;