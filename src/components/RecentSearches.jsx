import './RecentSearches.css';

const RecentSearches = ({ searches, onSelectSearch }) => {
  return (
    <div className="recent-searches">
      <h3>Recent Searches</h3>
      <div className="search-history">
        {searches.map((city, index) => (
          <button
            key={index}
            className="history-item"
            onClick={() => onSelectSearch(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;