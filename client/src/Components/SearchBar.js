import React from 'react';
import { FaSearch, FaArrowUp, FaArrowDown, FaFilter } from 'react-icons/fa';
import './scss/searchBar/searchBar.scss';
import { Button } from 'react-bootstrap';

const SearchBar = ({ searchTerm, onSearch, selectedCategory, onSort }) => {
  const handleSearch = () => {
    onSearch({ term: searchTerm, category: selectedCategory });
  };

  const handleSort = (order) => {
    switch (order) {
      case 'asc':
        break;
      case 'desc':
        break;
      case 'priceHigh':
        onSort('priceHigh');
        break;
      case 'priceLow':
        onSort('priceLow');
        break;
      default:
        break;
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onSearch({ term: e.target.value, category: selectedCategory })}
      />
    <Button className='category'>
      Category <FaFilter />
      <select
    value={selectedCategory}
    onChange={(e) => onSearch({ term: searchTerm, category: e.target.value })}
  >
    <option value="All">All</option>
    <option value="Vechiles and Parts">Vechiles and Parts</option>
    <option value="Computers and Consoles">Computers and Consoles</option>
    <option value="Headphones">Headphones</option>
    <option value="Keyboards and Mouses">Keyboards and Mouses</option>
    <option value="TVs">TVs</option>
    <option value="Tables">Tables</option>
  </select>
    </Button>
      <div className="sort-options">
        <Button className='price' onClick={() => handleSort('priceHigh')}>
          Price<FaArrowUp />
        </Button>
        <Button className='price' onClick={() => handleSort('priceLow')}>
          Price<FaArrowDown />
        </Button>

  </div>

</div>
);
};

export default SearchBar;