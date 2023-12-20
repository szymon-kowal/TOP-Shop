import React from 'react';
import type { Item } from './interfaces';
interface DisplayProps {
	data: Item[];
	filter: string;
}

const DisplayItems: React.FC<DisplayProps> = ({ data, filter }) => {
	return (
		<>
			{data.map(item => {
				if (filter !== 'null') {
					if (item.category !== filter) {
						return null;
					}
				}

				return (
					<div className="dataItem" key={item.id}>
						<div className="title">{item.title}</div>
						<div className="price">{item.price}</div>
						<div className="description">{item.description}</div>
						<img
							src={item.image}
							alt={item.title}
							width={100}
							height={100}
						/>
					</div>
				);
			})}
			;
		</>
	);
};

export default DisplayItems;
