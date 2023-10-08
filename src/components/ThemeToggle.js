import { useTheme } from 'next-themes';

function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} className='toggleButton'>
      Toggle Theme
    </button>
  );
}

export default ToggleTheme;
