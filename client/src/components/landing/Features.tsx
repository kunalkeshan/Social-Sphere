/**
 * Features Section - Landing Page
 */

const Features = () => {
	const FEATURES = [
		{
			title: 'Custom Links: Personalize Your Page',
			description:
				'Personalize your page with custom links for a unique online presence.',
			image: '/features-link.svg',
		},
		{
			title: 'Personal Profile Page: Showcase Your Identity',
			description:
				'Create a personalized profile page to showcase your online identity and social media links.',
			image: '/features-profile.svg',
		},
		{
			title: 'Custom Links: Personalize Your Page',
			description:
				"Gain valuable insights with upcoming analytics features to track your page's performance.",
			image: '/features-analytics.svg',
		},
	];

	return (
		<section className='max-w-screen-2xl mx-auto grid mt-8 md:mt-16'>
			<h2 className='font-heading text-5xl text-center md:text-left'>
				Features
			</h2>
			<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-center md:text-left'>
				{FEATURES.map((feature) => (
					<div className='w-full group border-2 border-primary px-8 py-6 hover:scale-[1.01] transition-all'>
						<div className='max-w-[240px] mx-auto grayscale group-hover:grayscale-0 transition-all'>
							<img
								src={feature.image}
								alt={feature.title}
								className='w-full h-auto object-contain'
							/>
						</div>
						<h3 className='mt-4 font-heading text-3xl font-semibold'>
							{feature.title}
						</h3>
						<p className='mt-8 text-xl'>{feature.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Features;
