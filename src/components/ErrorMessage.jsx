import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <p className="error-text">{message}</p>
    </div>
  );
};

export default ErrorMessage;