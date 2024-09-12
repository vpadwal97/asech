import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { useNavigate } from "react-router-dom";
import noIMGpng from "../../assets/noIMGSq.png";

const AutocompleteCustome = ({
  suggestionList,
  className,
  placeholder,
  setSValue,
}) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleClickView = (productnavName, product) => {
    navigate(`/product/${productnavName}`, {
      state: { productnavName, pdata: product },
    });
  };

  const getSuggestions = (value) => {
    // setSValue('');
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? suggestionList.map((suggestion) => suggestion.prodName)
      : suggestionList.filter(
          (suggestion) =>
            suggestion.prodName.toLowerCase().slice(0, inputLength) ===
            inputValue
        );
  };

  // const getSuggestionValue = (suggestion) => suggestion.prodName;
  const getSuggestionValue = (suggestion) => {
    // setSValue(suggestion.id);
    handleClickView(suggestion.productnavName, suggestion);
    return suggestion.prodName;
  };

  const renderSuggestion = (suggestion, { search }) => {
    const suggestionText = suggestion.prodName;
    const parts = search
      ? suggestionText.split(new RegExp(`(${search})`, "gi"))
      : suggestionText;
    return (
      <div className="d-flex justify-content-between align-items-center">
        <div className="px-2 text-break font-12 fw-normal">
          {parts.map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
              part
            ) : (
              <span className="fw-bold" key={index}>
                {part}
              </span>
            )
          )}
        </div>
        {suggestion.prodImage[0].src && (
          <img
            src={suggestion.prodImage[0].src}
            alt={suggestion.prodName}
            className=""
            style={{
              maxWidth: "40px",
              maxHeight: "40px",
            }}
            onError={(event) => {
              event.target.src = noIMGpng;
            }}
          />
        )}
      </div>
    );
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    setSValue(newValue);
    if (event.keyCode == 13) {
      navigate(`/product/${newValue}`, {
        state: { newValue, pdata: {} },
      })
    }
  };

  // const onKeyDown = (e) => {
  //   if (e.keyCode === 13) { // 13 is the keycode for Enter key
  //     let sval = e.target.value;
  //     navigate(`/product/${e.target.value}`, {
  //       state: { sval , pdata: {} },
  //     });
  //   }
  // };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    className: className,
    placeholder: placeholder,
    value,
    onChange,
    // onKeyDown,
  };

  // Finally, render it!
  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </>
  );
};

export default AutocompleteCustome;
