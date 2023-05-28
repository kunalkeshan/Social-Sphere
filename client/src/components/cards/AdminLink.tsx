import React, { useState, useRef, useEffect } from 'react';
import { Link as ILink } from '../../../../@types';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

interface PublicLinkProps extends ILink {
	index: number;
}

const AdminLink: React.FC<PublicLinkProps> = ({
	description,
	title,
	url,
	index,
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
						onClick={() => handleEditable('title')(false)}
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
						onClick={() => handleEditable('description')(false)}
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
						onClick={() => handleEditable('url')(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default AdminLink;
