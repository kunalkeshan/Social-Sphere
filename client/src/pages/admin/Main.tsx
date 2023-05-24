import CreateLink from '../../components/admin/CreateLink';

const Main = () => {
	return (
		<div className='grid grid-cols-3 min-h-[80vh]'>
			<section className='col-span-2 border-r border-gray-500 px-8'>
				<CreateLink />
			</section>
			<section></section>
		</div>
	);
};

export default Main;
