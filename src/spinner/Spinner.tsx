import img from '../assets/images/spinner-png.gif';

const Spinner = () => {
	return (
		<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '720px', width: '1065px'}}>
			<img src={img} alt="Spinner" style={{ width: '150px', objectFit: 'cover', height: '150px' }} />
		</div>
	);
};

export default Spinner;
