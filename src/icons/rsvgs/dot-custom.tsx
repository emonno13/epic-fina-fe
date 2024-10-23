export const DotCustomIcon = ({ color }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill={color} fillOpacity="0.2"/>
      <circle cx="8" cy="8" r="6" fill={color} fillOpacity="0.4"/>
      <circle cx="8" cy="8" r="4" fill={color} fillOpacity="1" />
    </svg>

  );
};