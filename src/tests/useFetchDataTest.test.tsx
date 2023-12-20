import { waitFor, renderHook } from '@testing-library/react';
import useFetchData from '../client/assets/components/hooks/useFetchData';
import type { Item } from '../client/assets/components/interfaces';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockData: Item[] = [
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

const mockUrl: string = 'https://example.com/api';

const axiosMockInstance = new MockAdapter(axios);

describe('useFetchData test', () => {
	test('it returns correct data and pageState before fetching', async () => {
		axiosMockInstance.onGet(mockUrl).reply(200, mockData);
		// return what we got if we go to specific url

		const { result } = renderHook(() => useFetchData(mockUrl));

		expect(result.current.data).toEqual([]);
		expect(result.current.pageState).toEqual('loading');

		await waitFor(() => {
			expect(result.current.data).toEqual(mockData);
			expect(result.current.pageState).toEqual('done');
		});

		axiosMockInstance.restore();
	});
	test('on Error returns correct pageState', () => {});
});
