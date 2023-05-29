/**
 * Under Construction Component
 */

// Dependencies
import Lottie from 'lottie-react';
import UnderConstructionAnimationData from '../../assets/under-construction.json';

const UnderConstruction = () => {
	return (
		<section>
			<Lottie
				animationData={UnderConstructionAnimationData}
				loop={true}
			/>
		</section>
	);
};

export default UnderConstruction;
