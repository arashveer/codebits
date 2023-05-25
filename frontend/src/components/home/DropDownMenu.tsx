import React from "react";
import "../../styles/app.css";
import { EditorFont } from "./Home";
import { LanguageSupport } from "@codemirror/language";
import { languageSwitch, languages } from "../../utils/languages";
import { langs } from "@uiw/codemirror-extensions-langs";

interface Props {
  fontSize: EditorFont;
  setFontSize: (size: EditorFont) => void;
  setEditorLanguage: (lang: String) => void;
}

export default function DropDownMenu(props: Props) {
  const dropDownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const fontSizes = [EditorFont.SMALL, EditorFont.MEDIUM, EditorFont.LARGE];

  const toggleFilters = () => {
    if (dropDownRef.current && buttonRef.current) {
      let attribValue =
        dropDownRef.current.getAttribute("aria-hidden") === "true";

      dropDownRef.current.setAttribute("aria-hidden", !attribValue + "");
      buttonRef.current.setAttribute("aria-expanded", attribValue + "");

      if (attribValue) {
        // Detect clicks outside of filter box
        window.addEventListener("click", toggleEventHandler);
      } else {
        window.removeEventListener("click", toggleEventHandler);
      }
    }
  };
  const toggleEventHandler = React.useCallback((e: MouseEvent) => {
    /* useCallback so function doesnt change in re-renders
       otherwise our add/remove eventListeners will go haywire */
    /* whitelisted with if-else loop:
		   1. The menu box
		   2. The button which is toggle
		   3. Close-icon in Multiselect
		   add more for exceptions */
    if (
      !dropDownRef.current?.contains(e.target as Node) &&
      !buttonRef.current?.contains(e.target as Node)
    ) {
      toggleFilters();
    }
  }, []);

  return (
    <>
      <div className="menu-container">
        <button
          ref={buttonRef}
          aria-expanded="false"
          className="settings-button"
          onClick={() => {
            toggleFilters();
          }}
          title="Settings"
        >
          <div className="settings-icon" />
        </button>
        <div ref={dropDownRef} aria-hidden="true" className="menu">
          <div className="lang-flexbox">
            <div>Language</div>
            <div className="flex">
              <select
                onChange={(val) => {
                  props.setEditorLanguage(val.target.value);
                }}
                className="lang-dropdown"
              >
                {languages.map((item) => (
                  <option>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="font-flexbox">
            <div>Font Size</div>

            <div className="btn-group">
              {fontSizes.map((fontSize) => (
                <button
                  aria-selected={props.fontSize === fontSize}
                  onClick={() => {
                    console.log(fontSize);
                    props.setFontSize(fontSize);
                  }}
                >
                  <span style={{ fontSize: fontSize }}>aA</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
