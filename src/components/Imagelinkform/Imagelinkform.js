import React from 'react';
import './Imagelinkform.css';

const Imagelinkform =(props)=>{
	return(
		<div>
			<p className='f3'>
				{'This Magic Brain will detect faces in your pictures.'}
			</p>

			<div className='center'>
				<div className='center form pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={props.onInputchange} />
					<button className='w-30 grow f4 link ph3 white dib bg-light-purple' onClick={props.onSubmit}> Detect </button>
				</div>
			</div>
		</div>
		);
}

export default Imagelinkform;