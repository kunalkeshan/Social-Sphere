/**
 * Public Profile Page
 */

// Dependencies
import ShareIcon from '@mui/icons-material/Share';
import { Link, User } from '../../../@types/';
import { IconButton } from '@mui/material';
import PublicSocials from '../components/cards/PublicSocials';
import PublicLink from '../components/cards/PublicLink';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import apiService from '../service/apiService';
import Lottie from 'lottie-react';
import LoadingAnimationData from '../assets/loading-paperplane.json';
import ErrorAnimationData from '../assets/error.json';
import { toast } from 'react-hot-toast';

interface FetchPublicProfileResponse {
	links: Link[];
	user: User;
	message: string;
}

const fetchPublicProfile = async (username: string) => {
	if (sessionStorage.getItem(`SocialSphereUserPublicProfile-${username}`)) {
		const data = JSON.parse(
			sessionStorage.getItem(
				`SocialSphereUserPublicProfile-${username}`
			) as string
		) as FetchPublicProfileResponse;
		return data;
	} else {
		const response = await apiService.get<FetchPublicProfileResponse>(
			`/user/${username}`
		);
		if (response.status === 200) {
			sessionStorage.setItem(
				`SocialSphereUserPublicProfile-${username}`,
				JSON.stringify(response.data)
			);
			return response.data;
		}
	}
};

const PublicProfile = () => {
	const { username } = useParams();
	const { data, error, isLoading } = useQuery('userProfileData', () =>
		fetchPublicProfile(username as string)
	);

	console.log(data);

	const handleShareProfile = () => {
		const shareData = {
			title: `${data?.user?.fullName} - Social Sphere Profile`,
			text: data?.user?.bio,
			url: `${location.protocol}://${location.host}${location.pathname}`,
		};
		if (navigator.canShare(shareData)) {
			navigator.share(shareData);
		} else {
			toast('Browser does not support sharing.');
		}
	};

	if (error) {
		return (
			<main className='max-w-5xl mx-auto w-full px-4 py-8 grid grid-cols-1 gap-8'>
				<Lottie
					animationData={ErrorAnimationData}
					loop={true}
					className='max-w-[60%] mx-auto'
				/>
				<p className='text-center font-heading font-bold text-xl md:text-5xl'>
					Profile does not exist or something went wrong.
				</p>
				<RouterLink
					to='/'
					className='px-8 py-4 border-2 mx-auto border-white font-heading w-fit font-semibold hover:bg-white hover:text-primary transition-all'
				>
					Go back home.
				</RouterLink>
			</main>
		);
	}

	if (isLoading) {
		return (
			<main className='max-w-5xl mx-auto w-full px-4 py-8 grid grid-cols-1 gap-8'>
				<Lottie
					animationData={LoadingAnimationData}
					loop={true}
					className='max-w-[80%] mx-auto'
				/>
				<p className='text-center font-heading font-bold text-xl md:text-5xl'>
					Loading profile...
				</p>
			</main>
		);
	}

	return (
		<main className='max-w-5xl mx-auto w-full px-4 py-8 grid grid-cols-1 gap-8 min-h-screen'>
			<section className='flex items-center w-full justify-between'>
				<p className='font-heading text-3xl font-semibold'>
					{data?.user?.fullName}
				</p>
				<IconButton
					onClick={handleShareProfile}
					className='transition-all hover:!bg-white group'
					title={`Share ${data?.user?.fullName}'s Profile`}
				>
					<ShareIcon className='text-white group-hover:!text-primary transition-all' />
				</IconButton>
			</section>
			<section className='flex items-center justify-center flex-col gap-2'>
				<div className='max-w-[8rem] rounded-full overflow-hidden'>
					<img
						src={data?.user?.avatar}
						alt={data?.user?.fullName}
						className='w-full h-auto object-contain'
					/>
				</div>
				<h1 className='font-heading text-3xl'>{data?.user?.title}</h1>
				<h2 className=''>{data?.user?.bio}</h2>
			</section>
			<section className='my-8'>
				<div className='grid grid-cols-1 gap-6'>
					{data?.links && data?.links.length > 0 ? (
						data?.links.map((link, index) => (
							<PublicLink key={index} {...link} />
						))
					) : (
						<div className='text-center font-heading font-bold text-xl'>
							No public links yet!
						</div>
					)}
				</div>
			</section>
			<section className='flex items-center justify-center w-full flex-col gap-2'>
				<PublicSocials socials={data?.user?.socials} />
				<p className='font-heading text-sm font-semibold mt-auto'>
					&copy;{' '}
					<RouterLink
						to='/'
						className='hover:underline underline-offset-2'
					>
						Social Sphere
					</RouterLink>{' '}
					- {new Date().getFullYear()}
				</p>
			</section>
		</main>
	);
};

export default PublicProfile;
