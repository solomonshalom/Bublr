import { useTheme } from 'next-themes';
import { Toggle } from '@skiff-org/skiff-ui';

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
    </div>
  );
}

export default ToggleTheme;
