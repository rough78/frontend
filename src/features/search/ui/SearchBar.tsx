import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '@shared/assets/images/search/search.svg';
import clearIcon from '@shared/assets/images/search/search-clear.svg';
import styles from './SearchBar.module.scss';

export const SearchBar = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        <img src={searchIcon} className={styles.searchIcon} alt="검색" />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="장소 검색"
          className={styles.searchInput}
        />
        {value && (
          <button 
            type="button" 
            onClick={() => setValue('')} 
            className={styles.clearButton}
            aria-label="검색어 지우기"
          >
            <img src={clearIcon} className={styles.clearIcon} alt="지우기" />
          </button>
        )}
      </div>
    </form>
  );
}; 