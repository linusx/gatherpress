import React from 'react';
import AttendeeList from './AttendeeList';

const AttendanceListContent = ({ items, activeValue }) => {
	const renderedItems = items.map( ( item, index ) => {
		const { title, value } = item;
		const active = ( value === activeValue ) ? 'active' : 'hidden';

		return (
			<div
				key={index}
				className={`gp-attendance-list__items gp-attendance-list__${active}`}
				id={`gp-attendance-${value}`}
				role="tabpanel"
				aria-labelledby={`gp-attendance-${value}-tab`}
			>
				<AttendeeList value={value} />
			</div>
		);
	});

	return (
		<div className="gp-attendance-list__container">
			{renderedItems}
		</div>
	);
};

export default AttendanceListContent;