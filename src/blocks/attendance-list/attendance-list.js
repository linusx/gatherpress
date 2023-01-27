/**
 * WordPress dependencies.
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import AttendanceList from '../../components/AttendanceList';

domReady(() => {
	const containers = document.querySelectorAll(
		`[data-gp_block_name="attendance-list"]`
	);

	for (let i = 0; i < containers.length; i++) {
		render(<AttendanceList />, containers[i]);
	}
});