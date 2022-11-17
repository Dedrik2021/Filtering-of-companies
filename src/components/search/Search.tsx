import {memo, FC} from 'react'

import './search.scss'

interface SearchProps {
    searchParams: null | string,
    onChangeInput: (value: React.ChangeEvent<HTMLInputElement>) => void,
}

const Search: FC<SearchProps> = memo(({searchParams, onChangeInput}) => {
	return (
		<div className='search'>
			<label className='search__label' htmlFor="search"></label>
			<input
				className='search__input'
				type="text"
				value={String(searchParams)}
				onChange={(e) => onChangeInput(e)}
				id="search"
				maxLength={5}
				name='search-input'
				placeholder='Search for PSC'
				/>
				<h1 className='search__title'>List Of Companies</h1>
		</div>
	);
})

export default Search;
