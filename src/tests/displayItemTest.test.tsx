import { render, screen } from '@testing-library/react';
import DisplayItems from '../client/assets/components/displayItem';
import React from 'react';
import { type Item } from '../client/assets/components/interfaces';
import '@testing-library/jest-dom';

describe('DisplayItems component', () => {
	const data: Item[] = [
		{
			id: '1',
			title: 'test1',
			price: 'price1',
			description: 'description1',
			category: 'test',
		},
		{
			id: '2',
			title: 'test2',
			price: 'price2',
			description: 'description2',
			category: 'test2',
		},
	];

	const testFilter: string = data[1].category;

	test('does not render data when no data is provided', () => {
		render(<DisplayItems data={[]} filter={'null'} />);
		const testItem = screen.queryByText('test1');
		expect(testItem).toBeNull();
	});

	test('does render data', () => {
		render(<DisplayItems data={data} filter={'null'} />);
		const testItem = screen.getByText('test1');
		// idk if i should pass more than one .getByText() elements
		expect(testItem).toBeInTheDocument();
	});

	test('filters correctly data and displays it', () => {
		render(<DisplayItems data={data} filter={testFilter} />);
		expect(screen.queryByText('test1')).toBeNull();
		expect(screen.getByText('test2')).toBeInTheDocument();
	});
});
