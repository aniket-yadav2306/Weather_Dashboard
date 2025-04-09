import './ThemeToggle.css';

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;