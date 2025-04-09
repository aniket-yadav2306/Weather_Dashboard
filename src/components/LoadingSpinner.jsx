import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;