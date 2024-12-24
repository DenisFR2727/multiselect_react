import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import Modal from "./Modal.tsx";

type Options = Array<number>;

function MultiSelect() {
  const [selectOption, setSelectOption] = useState<Options>([]);
  const [isOption, setIsOption] = useState<boolean>(false);
  const [isVisibleOption, setIsVisible] = useState<boolean>(false);
  const [availableOptions, setAvailableOptions] = useState<Options>(
    Array.from({ length: 7 }, (_, index) => index + 1)
  );
  const focusSelect = useRef<null>(null);

  const addOption = (option: number): void => {
    console.log(option);
    setIsOption(true);
    setSelectOption((prevOption: any) => [...prevOption, option]);
    setAvailableOptions((prevAvailable: any) =>
      prevAvailable.filter((item: number) => item !== option)
    );
    if (focusSelect.current) {
      setIsVisible(false);
    }
    console.log(selectOption);
  };
  const deleteOption = (option: number): void => {
    setSelectOption((prevSelectedOption: any) =>
      prevSelectedOption.filter((opt: number) => opt !== option)
    );
    setAvailableOptions((prevAvailable: any) =>
      [...prevAvailable, option].sort((a, b) => a - b)
    );
  };
  const handleFocus = (): void => {
    if (focusSelect.current) {
      setIsVisible(true);
    }
  };
  const closeModal = (): void => {
    setIsVisible(false);
  };
  return (
    <div id="overlays-root" className="select__multiselect">
      <div className="select__search">
        {isOption && (
          <div className="selet__list">
            {selectOption.map((option: number) => (
              <p key={option} className="selet__option">
                Option {option}{" "}
                <FontAwesomeIcon
                  className="faCircleXmark "
                  icon={faCircleXmark}
                  onClick={() => deleteOption(option)}
                />
              </p>
            ))}
          </div>
        )}
        <input
          ref={focusSelect}
          onFocus={handleFocus}
          type="text"
          placeholder="Select"
          autoComplete="off"
        />
        <FontAwesomeIcon className="faSortDown" icon={faSortDown} />
      </div>
      {isVisibleOption && (
        <Modal onClose={closeModal}>
          <ul>
            {availableOptions.map((option: number, index: number) => (
              <li onClick={() => addOption(option)} key={index}>
                Option {option}
              </li>
            ))}
            {availableOptions.length === 0 && (
              <span className="select__no-options">No Options Available</span>
            )}
          </ul>
        </Modal>
      )}
    </div>
  );
}
export default MultiSelect;
