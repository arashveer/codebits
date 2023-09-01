import * as React from "react";

export interface IDropDownProps {
  activeItem: String;
  setActiveItem: (lang: String) => void;
  items: String[];
}

export function DropDown(props: IDropDownProps) {
  const [isLanguageDropDownActive, setIsLanguageDropDownActive] =
    React.useState<boolean>(false);

  return (
    <div className="dropdown-selector">
      <button
        aria-expanded={isLanguageDropDownActive}
        onClick={() => {
          setIsLanguageDropDownActive((val) => !val);
        }}
      >
        {props.activeItem}
      </button>
      <div aria-hidden={!isLanguageDropDownActive} className="aria-hidable">
        {props.items.map((item) => (
          <button
            onClick={() => {
              props.setActiveItem(item);
              setIsLanguageDropDownActive(false);
            }}
          >
            {item === "cpp" ? "C++" : item}
          </button>
        ))}
      </div>
    </div>
  );
}
