import * as React from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

import useOnClickOutside from '@/hooks/useClickOutside';
import useToggle from '@/hooks/useToggle';

import './Autocomplete.scoped.scss';
import { isNumber } from '@/utils';

interface Props {
  options: string[];
  onHandleSelect: (option: string) => void;
  value: string;
  setValue: (value: string) => void;
}

function Authocomplete({ options, onHandleSelect, value, setValue }: Props) {
  const [isShown, toggleIsShown, setIsShown] = useToggle();
  const divRef = React.useRef<HTMLInputElement>(null);

  useOnClickOutside(divRef, () => {
    setIsShown(false);
  });

  const filteredOptions = React.useMemo(
    () => options.filter((option) => option.startsWith(value)),
    [options, value]
  );

  const onHandleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = ev.target.value.trim();
    const isValid = isNumber(inputValue);
    if (!isValid && inputValue) {
      toast.error('Only Numbers allowed, Try again!');
      return;
    }
    setValue(inputValue);
  };

  const onOptionSelect = (option: string) => {
    onHandleSelect(option);
    setValue(option);
    toggleIsShown();
  };
  return (
    <section className="root" ref={divRef}>
      <section className="search-container">
        <input
          onChange={onHandleChange}
          placeholder="Enter Year To Start The Search!"
          className="input"
          value={value}
          onClick={() => setIsShown(true)}
        />
        <FaSearch className="search-icon" />
      </section>
      {isShown && (
        <section className="autocomplete-container">
          {filteredOptions.map((option) => (
            <div
              role="button"
              key={option}
              className="option-item"
              onClick={() => onOptionSelect(option)}
              tabIndex={0}
            >
              {option}
            </div>
          ))}
        </section>
      )}
    </section>
  );
}
export default Authocomplete;
