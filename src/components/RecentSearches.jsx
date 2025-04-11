import './RecentSearches.css';

const RecentSearches = ({ searches, onSelectSearch, onClearSearches }) => {
  return (
    <div className="recent-searches">
      <div className="searches-header">
        <h3>Recent Searches</h3>
        {searches.length > 0 && (
          <button 
            className="clear-searches-btn" 
            onClick={onClearSearches}
            aria-label="Clear recent searches"
          >
            Clear All
          </button>
        )}
      </div>
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