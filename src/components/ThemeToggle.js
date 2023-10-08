import { useTheme } from 'next-themes';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'; // Import the default styles for react-toggle

function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className='toggleSwitch'>
      <Toggle
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <span>Toggle Theme</span>
    </div>
  );
}

export default ToggleTheme;
// Yay
