import { useTheme } from 'next-themes';

function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleSwitchStyles = {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '30px',
  };

  const sliderStyles = {
    position: 'absolute',
    cursor: 'pointer',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: '#ccc',
    borderRadius: '15px',
    transition: '0.4s',
  };

  const sliderBeforeStyles = {
    position: 'absolute',
    content: '',
    height: '26px',
    width: '26px',
    left: '4px',
    bottom: '4px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: '0.4s',
  };

  return (
    <label style={toggleSwitchStyles} className='toggleSwitch'>
      <input
        type='checkbox'
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <span style={sliderStyles} className='slider'>
        <span style={sliderBeforeStyles}></span>
      </span>
    </label>
  );
}

export default ToggleTheme;
