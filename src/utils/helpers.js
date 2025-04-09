/**
 * Formats a temperature value to rounded integer
 * @param {number} temp - Temperature value
 * @returns {string} Formatted temperature
 */
export function formatTemperature(temp) {
    return `${Math.round(temp)}°C`;
  }
  
  /**
   * Capitalizes the first letter of each word in a string
   * @param {string} str - Input string
   * @returns {string} String with first letter of each word capitalized
   */
  export function capitalizeWords(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  /**
   * Formats a unix timestamp to a readable date string
   * @param {number} timestamp - Unix timestamp in seconds
   * @returns {string} Formatted date string
   */
  export function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
  
  /**
   * Formats a unix timestamp to a readable time string
   * @param {number} timestamp - Unix timestamp in seconds
   * @returns {string} Formatted time string
   */
  export function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }