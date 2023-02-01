import React, { useCallback } from 'react';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

// Material-ui
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, TextField } from '@material-ui/core';

// Styles
import JPAutoCompleteStyle from 'v4.0/jp-core/components/jp-autocomplete/jp-autocomplete-style.js';

// Icons
import CloseIcon from '@material-ui/icons/Close';

export default function JPAutocomplete(props) {
  const {
    id,
    label,
    multiple,
    limitTags,
    renderOption,
    selectOnFocus,
    clearOnBlur,
    handleHomeEndKeys,
    onBlur,
    options,
    defaultValue,
    filterSelectedOptions,
    renderTags,
    freeSolo,
    loading,
    loadingText,
    onSearch,
    placeholder,
    noOptionsText,
    disabled,
    value,
    inputValue,
    onInputChange
  } = props;

  const filterOptions = createFilterOptions({
    ignoreCase: true
  });
  //#region Other hooks
  const classes = makeStyles(JPAutoCompleteStyle)(props);
  //#endregion

  //#region Render functions
  function renderInput(params) {
    return <TextField onChange={onSearch} {...params} label={label} placeholder={placeholder} />;
  }

  const renderInputCallback = useCallback(renderInput, []);
  //#endregion

  return (
    <Autocomplete
      value={value}
      disabled={disabled}
      multiple={multiple}
      onInputChange={onInputChange}
      inputValue={inputValue}
      limitTags={limitTags}
      defaultValue={defaultValue}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name || ''}
      options={options || []}
      classes={{
        clearIndicator: classes.clearIndicator
      }}
      filterSelectedOptions={filterSelectedOptions}
      closeIcon={
        <CloseIcon
          id="clear"
          classes={{
            root: classes.clearIndicator
          }}
        />
      }
      filterOptions={filterOptions}
      onChange={(_, data) => {
        props.onChange(data);
      }}
      id={id}
      freeSolo={freeSolo}
      onBlur={onBlur}
      selectOnFocus={selectOnFocus}
      clearOnBlur={clearOnBlur}
      handleHomeEndKeys={handleHomeEndKeys}
      renderOption={renderOption}
      renderTags={renderTags}
      renderInput={renderInputCallback}
      loadingText={loadingText}
      loading={loading}
      noOptionsText={noOptionsText}
    />
  );
}

JPAutocomplete.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  limitTags: PropTypes.number,
  renderTags: PropTypes.func,
  renderOption: PropTypes.func,
  getOptionLabel: PropTypes.func,
  selectOnFocus: PropTypes.bool,
  clearOnBlur: PropTypes.bool,
  handleHomeEndKeys: PropTypes.bool,
  options: PropTypes.array,
  onChange: PropTypes.func,
  freeSolo: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.bool,
  inputValue: PropTypes.bool,
  onInputChange: PropTypes.func
};
