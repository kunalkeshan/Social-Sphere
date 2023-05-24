import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/material';

const CreateLink = () => {
	const [isInEdit, setIsInEdit] = useState(false);
	const [input, setInput] = useState({ title: '', description: '', url: '' });

	const handleInput =
		(prop: keyof typeof input) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInput((prev) => {
				return { ...prev, [prop]: e.target.value };
			});
		};

	return (
		<div>
			{!isInEdit ? (
				<button
					onClick={() => setIsInEdit(true)}
					className='px-8 py-4 border-2 border-white font-heading w-full font-semibold hover:bg-white hover:text-primary transition-all'
				>
					Add Link
				</button>
			) : (
				<div className='px-8 py-4 border-2 border-white text-white'>
					<div className='flex items-center justify-between'>
						<p className='font-heading font-bold'>Edit URL</p>
						<Button onClick={() => setIsInEdit(false)}>
							<CloseIcon className='text-white' />
						</Button>
					</div>
					<Box
						component='form'
						noValidate
						sx={{ mt: 2, fontFamily: 'Inter' }}
						className='grid grid-cols-1 gap-4'
					>
						<input
							type='text'
							placeholder='Title'
							required
							className='px-4 py-2 rounded bg-white text-primary placeholder:text-primary outline-none focus:border-black border-2 border-white'
							value={input['title']}
							onChange={handleInput('title')}
						/>
						<input
							type='text'
							placeholder='Description'
							required
							className='px-4 py-2 rounded bg-white text-primary placeholder:text-primary outline-none focus:border-black border-2 border-white'
							value={input['description']}
							onChange={handleInput('description')}
						/>
						<input
							type='text'
							placeholder='URL'
							required
							className='px-4 py-2 rounded bg-white text-primary placeholder:text-primary outline-none focus:border-black border-2 border-white'
							value={input['url']}
							onChange={handleInput('url')}
						/>
						<button
							type='submit'
							className='px-4 text-white my-4 w-full py-2 border-2 border-white font-heading font-semibold hover:bg-white hover:text-primary transition-all'
						>
							Add
						</button>
					</Box>
				</div>
			)}
		</div>
	);
};

export default CreateLink;
