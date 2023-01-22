import { useEffect, useState } from 'react';
import '../styles/SortBy.css';
import {
  sortByMostLikes,
  sortByNewestFirst,
} from "../redux/slice/commentsSlice";
import { useDispatch } from 'react-redux';


const SortBy = () => {
  const [isInFocus, setIsInFocus] = useState(false);
  const [selectedSortBy, setSelectedSortBy] = useState('Newest first');
  const availableSortBys = ['Newest first', 'Most Likes'];
  const dispatch = useDispatch();

  const handleOnSelectSortBy = (sortBy) => {
    setSelectedSortBy(sortBy);
    setIsInFocus(false);
  }

  useEffect(() => {
    if (selectedSortBy === 'Newest first') {
      dispatch(sortByNewestFirst());
    }

    if (selectedSortBy === 'Most Likes') {
      dispatch(sortByMostLikes());
    }
  }, [selectedSortBy]);

  return (
    <div className="sort-by">
      <button
        onClick={() => setIsInFocus((prevState) => !prevState)}
        className="btn sort-by__btn"
      >
        <ion-icon name="swap-vertical-outline"></ion-icon>
        {selectedSortBy}
      </button>

      {isInFocus && (
        <div className="sort-by__options">
          {availableSortBys.map((sortBy) => (
            <button
              onClick={() => handleOnSelectSortBy(sortBy)}
              className="btn sort-by__option"
            >
              {sortBy}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortBy;