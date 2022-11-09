import * as React from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

import useOnClickOutside from '@/hooks/useClickOutside';
import useToggle from '@/hooks/useToggle';

import './Autocomplete.scoped.scss';
import { Option } from '@/types';

interface Props {
  options: Option[];
  onHandleSelect: (value: number) => void;
  selectedYear: number | null;
}

function Authocomplete({ options, onHandleSelect, selectedYear }: Props) {
  const [isShown, toggleIsShown, setIsShown] = useToggle();
  const divRef = React.useRef<HTMLInputElement>(null);
  const [year, setYear] = React.useState('');

  React.useEffect(() => {
    if (selectedYear) {
      setYear(selectedYear.toString());
    }
  }, [selectedYear]);

  useOnClickOutside(divRef, () => {
    setIsShown(false);
  });

  const filteredOptions = React.useMemo(
    () => options.filter((option) => option.value.toString().startsWith(year)),
    [year, options]
  );

  const onHandleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = ev.target.valueAsNumber;
    if (Number.isNaN(inputValue) && inputValue) {
      return;
    }
    setYear(inputValue.toString());
  };

  const onOptionSelect = (option: Option) => {
    onHandleSelect(option.value);
    setYear(option.value.toString());
    toggleIsShown();
  };
  return (
    <section className="root" ref={divRef}>
      <section className="search-container">
        <input
          type="number"
          onChange={onHandleChange}
          placeholder="Enter Year To Start The Search!"
          className="input"
          value={year}
          onClick={() => setIsShown(true)}
        />
        <FaSearch className="search-icon" />
      </section>
      {isShown && (
        <section className="autocomplete-container">
          {filteredOptions.map((option) => (
            <div
              role="button"
              key={option.key}
              className="option-item"
              onClick={() => onOptionSelect(option)}
              tabIndex={0}
            >
              {option.value.toString()}
            </div>
          ))}
        </section>
      )}
    </section>
  );
}
export default Authocomplete;
