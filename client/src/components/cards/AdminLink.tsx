/**
 * Link Component - Admin
 */

// Dependencies
import React, { useState, useRef, useEffect } from 'react';
import { Link as ILink } from '../../../../@types';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import apiService from '../../service/apiService';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { updateLinks } from '../../store/features/user';

interface PublicLinkProps extends ILink {
	index: number;
}

interface DeleteLinkResponse {
	message: string;
}

const AdminLink: React.FC<PublicLinkProps> = ({
	description,
	title,
	url,
	index,
	_id,
}) => {
	const [editable, setEditable] = useState({
		title: false,
		description: false,
		url: false,
	});
	const [input, setInput] = useState({ title, description, url });

	const inputTitleRef = useRef<HTMLInputElement | null>(null);
	const inputDescriptionRef = useRef<HTMLInputElement | null>(null);
	const inputUrlRef = useRef<HTMLInputElement | null>(null);

	const dispatch = useAppDispatch();
	const { links } = useAppSelector((state) => state.user);

	const handleInput =
		(prop: keyof typeof input) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInput((prev) => {
				return { ...prev, [prop]: e.target.value };
			});
		};

	const handleEditable =
		(props: keyof typeof editable) => (value: boolean) => {
			setEditable((prev) => {
				return { ...prev, [props]: value };
			});
		};

	const handleEditLink = (props: keyof typeof input) => async () => {
		try {
			if (input[props].length === 0) {
				toast.error(`${props} cannot be empty!`);
				if (props === 'title') {
					inputTitleRef.current?.focus();
				} else if (props === 'description') {
					inputDescriptionRef.current?.focus();
				} else if (props === 'url') {
					inputUrlRef.current?.focus();
				}
				handleEditable(props)(true);
				return;
			}
			const response = await apiService.put(
				'/api/link',
				{ id: _id, key: props, value: input[props] },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'SocialSphereUserToken'
						)}`,
					},
				}
			);
			if (response.status === 200) {
				const updatedLinks = links?.map((link) => {
					if (link._id === _id) {
						link = { ...link, ...input };
					}
					return link;
				});
				dispatch(updateLinks(updatedLinks as ILink[]));
			}
		} catch (error) {
			toast('Something went wrong. Try again later.');
		}
	};

	const handleDeleteLink = async () => {
		try {
			const response = await apiService.delete<DeleteLinkResponse>(
				'/api/link',
				{
					data: { id: _id },
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'SocialSphereUserToken'
						)}`,
					},
				}
			);

			if (response.status === 200) {
				toast.success('Link deleted successfully!');
				const updatedLinks = links?.filter((link) => link._id !== _id);
				dispatch(updateLinks(updatedLinks as ILink[]));
			}
		} catch (error) {
			if (isAxiosError(error)) {
				if (
					error.response?.data.message === 'link/link-does-not-exist'
				) {
					toast.error('Link does not exist. Reload the page.');
				} else {
					toast('Something went wrong. Try again later.');
				}
			} else {
				toast('Something went wrong. Try again later.');
			}
		}
	};

	useEffect(() => {
		if (editable.title) {
			inputTitleRef.current?.focus();
		} else if (editable.description) {
			inputDescriptionRef.current?.focus();
		} else if (editable.url) {
			inputUrlRef.current?.focus();
		}
	}, [editable]);

	return (
		<div className='flex flex-col px-8 py-4 border-2 border-white gap-2 w-full relative'>
			<span className='absolute bg-white font-heading font-bold text-lg -top-2 -left-2 text-primary rounded-full p-2 w-6 h-6 flex items-center justify-center -rotate-12'>
				{index + 1}
			</span>
			<span
				title='Delete Link'
				onClick={handleDeleteLink}
				className='absolute bg-white font-heading font-bold text-lg -bottom-2 -right-2 text-primary rounded-full p-2 w-6 h-6 flex items-center justify-center rotate-12 curosr-pointer hover:scale-110 transition-all cursor-pointer hover:text-red-500'
			>
				<DeleteIcon />
			</span>
			<div className='w-full flex items-center justify-between gap-2'>
				<input
					type='text'
					className='w-full outline-none bg-transparent underline underline-offset-2 decoration-gray-500 text-gray-500 focus:text-white focus:decoration-white transition-all'
					value={input.title}
					onChange={handleInput('title')}
					placeholder='Title'
					disabled={!editable.title}
					ref={inputTitleRef}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleEditLink('title')();
						}
					}}
				/>
				{!editable.title ? (
					<EditIcon
						className={
							'cursor-pointer text-gray-500 hover:text-white'
						}
						onClick={() => handleEditable('title')(true)}
					/>
				) : (
					<DoneIcon
						className={
							'cursor-pointer text-gray-500 hover:text-white'
						}
						onClick={() => {
							handleEditLink('title')();
							// handleEditable('title')(false);
						}}
					/>
				)}
			</div>
			<div className='w-full flex items-center justify-between gap-2'>
				<input
					type='text'
					className='w-full outline-none bg-transparent underline underline-offset-2 decoration-gray-500 text-gray-500 focus:text-white focus:decoration-white transition-all'
					value={input.description}
					onChange={handleInput('description')}
					placeholder='Description'
					disabled={!editable.description}
					ref={inputDescriptionRef}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleEditLink('description')();
						}
					}}
				/>
				{!editable.description ? (
					<EditIcon
						className={
							'cursor-pointer text-gray-500 hover:text-white'
						}
						onClick={() => handleEditable('description')(true)}
					/>
				) : (
					<DoneIcon
						className={
							'cursor-pointer text-gray-500 hover:text-white'
						}
						onClick={() => {
							handleEditLink('description')();
							// handleEditable('description')(false);
						}}
					/>
				)}
			</div>
			<div className='w-full flex items-center justify-between gap-2'>
				<input
					type='text'
					className='w-full outline-none bg-transparent underline underline-offset-2 decoration-gray-500 text-gray-500 focus:text-white focus:decoration-white transition-all'
					value={input.url}
					onChange={handleInput('url')}
					placeholder='URL'
					disabled={!editable.url}
					ref={inputUrlRef}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleEditLink('url')();
						}
					}}
				/>
				{!editable.url ? (
					<EditIcon
						className={
							'cursor-pointer text-gray-500 hover:text-white'
						}
						onClick={() => handleEditable('url')(true)}
					/>
				) : (
					<DoneIcon
						className={
							'cursor-pointer text-gray-500 hover:text-white'
						}
						onClick={() => {
							handleEditLink('url')();
							// handleEditable('url')(false);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default AdminLink;
