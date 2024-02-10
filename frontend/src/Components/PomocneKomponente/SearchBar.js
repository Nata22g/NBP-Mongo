import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    const searchQuery = e.target.value;
    onSearch(searchQuery);
  };

  return (
    <div className='d-flex justify-content-start align-items-center'>
    <input
      type="text"
      placeholder="Search..."
      defaultValue=''
      onChange={handleChange}
      style={{
        padding: '4px',
        borderRadius: '4px',
        border: '1.5px solid #000000',
        outline: 'none',
        width: '250px',
        fontSize: '17px',
      }}
    />
    <div className='m-1'>
    <SearchIcon margin={5} fontSize="large"/>
    </div>
    </div>
  );
};

export default SearchBar;