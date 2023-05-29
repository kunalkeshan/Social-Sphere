/**
 * Admin Links Page
 */

// Dependencies
import { useEffect } from 'react';
import { Link } from '../../../../@types';
import CreateLink from '../../components/admin/CreateLink';
import AdminLink from '../../components/cards/AdminLink';
import apiService from '../../service/apiService';
import { useQuery } from 'react-query';
import { useAppDispatch } from '../../hooks/hooks';
import { updateLinks } from '../../store/features/user';
import Lottie from 'lottie-react';
import LoadingAnimationData from '../../assets/loading-paperplane.json';
import ErrorAnimationData from '../../assets/error.json';

interface FetchAdminLinksResponse {
	links: Link[];
	message: string;
}

const fetchAdminLinks = async () => {
	if (sessionStorage.getItem(`SocialSphereLoggedInUserLinks`)) {
		const data = JSON.parse(
			sessionStorage.getItem(`SocialSphereLoggedInUserLinks`) as string
		) as FetchAdminLinksResponse['links'];
		return data;
	} else {
		const response = await apiService.get<FetchAdminLinksResponse>(
			`/api/link`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						'SocialSphereUserToken'
					)}`,
				},
			}
		);
		if (response.status === 200) {
			sessionStorage.setItem(
				`SocialSphereLoggedInUserLinks`,
				JSON.stringify(response.data.links)
			);
			return response.data.links;
		}
	}
};

const Main = () => {
	const { data, error, isLoading } = useQuery('adminLinks', () =>
		fetchAdminLinks()
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (data?.length) dispatch(updateLinks(data));
	}, [data, dispatch]);

	return (
		<section className='col-span-3 md:col-span-2 md:border-r border-gray-500 px-2 md:px-8'>
			<CreateLink />
			<div className='mt-8 flex flex-col gap-8'>
				{isLoading ? (
					<>
						<Lottie
							animationData={LoadingAnimationData}
							loop={true}
							className='max-w-[80%] mx-auto'
						/>
						<p className='text-center font-heading font-bold text-xl md:text-3xl'>
							Loading links...
						</p>
					</>
				) : error ? (
					<>
						<Lottie
							animationData={ErrorAnimationData}
							loop={true}
							className='max-w-[60%] mx-auto'
						/>
						<p className='text-center font-heading font-bold text-xl md:text-3xl'>
							Unable to get your links at the moment!
						</p>
						<button>Try again!</button>
					</>
				) : data?.length ? (
					data.map((link, index) => (
						<AdminLink key={index} {...link} index={index} />
					))
				) : (
					<>
						<p className='text-center font-heading font-bold text-xl md:text-3xl'>
							You haven't created any links yet! Create a link to
							get started.
						</p>
					</>
				)}
			</div>
		</section>
	);
};

export default Main;
