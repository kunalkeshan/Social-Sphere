/**
 * Admin Create New Link Component
 */

// Dependencies
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { updateLinks } from '../../store/features/user';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import apiService from '../../service/apiService';
import { Link } from '../../../../@types';
import { toast } from 'react-hot-toast';

interface CreateNewLinkResponse {
	link: Link;
	message: string;
}

const CreateLink = () => {
	const [isInEdit, setIsInEdit] = useState(false);
	const [input, setInput] = useState({ title: '', description: '', url: '' });

	const dispatch = useAppDispatch();
	const { links } = useAppSelector((state) => state.user);

	const handleInput =
		(prop: keyof typeof input) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInput((prev) => {
				return { ...prev, [prop]: e.target.value };
			});
		};

	const handleCreateNewLink = async (
		e: React.ChangeEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		try {
			const response = await apiService.post<CreateNewLinkResponse>(
				'/api/link',
				{ ...input },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'SocialSphereUserToken'
						)}`,
					},
				}
			);
			if (response.status === 201) {
				toast.success('New Link created successfully!');
				dispatch(updateLinks([...(links ?? []), response.data.link]));
				setTimeout(() => {
					setIsInEdit(false);
				}, 500);
			}
		} catch (error) {
			toast.error('Something went wrong, try again later!');
		}
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
					<form
						className='grid grid-cols-1 gap-4 mt-2 font-["Inter"]'
						onSubmit={handleCreateNewLink}
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
					</form>
				</div>
			)}
		</div>
	);
};

export default CreateLink;
