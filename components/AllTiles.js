export function AllTiles({ options, value, filterSetter, placeholder = '' }) {
  return (
    <select
      className={placeholder}
      value={value}
      onChange={(e) => {
        filterSetter(e.target.value);
      }}
    >
      <option value={''}>{placeholder}</option>;
      {options.map((option) => {
        return (
          <option key={option.id} value={option.day}>
            {option.day}
          </option>
        );
      })}
    </select>
  );
}
