import React from 'react'

const Rank=({name,entries})=>{
//	console.log('tank',{entries});
	console.log({name},{entries});
	return (
		<div>
			<div className='white f3'>
				{`${name},your current entries count is ...`}
			</div>
			<div className='white f3'>
				{entries}
			</div>
		</div>
	);
}

export default Rank;