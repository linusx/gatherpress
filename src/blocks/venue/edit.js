/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import { Listener } from '../../helpers/broadcasting';

import VenueInformation from '../../components/VenueInformation';

// import VenueInformation from './venue-info';

import MapEmbed from '../../helpers/map-embed';

const Edit = (props) => {
	const { setAttributes } = props;
	const blockProps = useBlockProps();
	const [venueId, setVenueId] = useState('');

	Listener({ setVenueId });

	useEffect(() => {
		setAttributes({
			venueId: venueId ?? '',
		});
	});

	const VenueSelector = ({ id }) => {
		const venuePost = useSelect((select) =>
			select('core').getEntityRecord('postType', 'gp_venue', id)
		);

		let jsonString = venuePost?.meta._venue_information ?? '{}';
		jsonString = '' !== jsonString ? jsonString : '{}';

		const venueInformation = JSON.parse(jsonString);
		const fullAddress = venueInformation?.fullAddress ?? '';

		const baseUrl = 'https://maps.google.com/maps';
		const params = new URLSearchParams({
			q: fullAddress,
			z: 10,
			t: 'm',
			output: 'embed',
		});
		const encodedMapURL = baseUrl + '?' + params.toString();

		const phoneNumber = venueInformation?.phoneNumber ?? '';
		const website = venueInformation?.website ?? '';
		const encodedAddressURL =
			venueInformation?.encodedAddressURL ?? encodedMapURL;
		const name =
			venuePost?.title.rendered ??
			__('No venue selected.', 'gatherpress');

		return (
			// <VenueInformation
			// 	name={name}
			// 	fullAddress={fullAddress}
			// 	phoneNumber={phoneNumber}
			// 	website={website}
			// 	encodedAddressURL={encodedAddressURL}
			// />
			<>
				<VenueInformation
					name={name}
					fullAddress={fullAddress}
					phoneNumber={phoneNumber}
					website={website}
				/>
				<MapEmbed
					location={fullAddress}
					zoom="10"
					type="m"
					height="400"
				/>
			</>
		);
	};

	return (
		<div {...blockProps}>
			<VenueSelector id={venueId} />
		</div>
	);
};

export default Edit;
