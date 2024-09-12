import { Checkbox, FormControl, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react'
import { IoIosInformationCircle } from 'react-icons/io';
import IoIosInformationCircleCustom from './IoIosInformationCircleCustom';
const MultiSelectDropdownlist = ({ dropdownlist, value, onChange, placeholder, required ,tooltipMessage }) => {
  const MenuProps = {
      PaperProps: {
          style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
          },
      },
  };
  return (
      <>
          <FormControl sx={{ m: 1, width: 300 }}>
          <label htmlFor="input">
              {placeholder}
              <span className={required}></span>
                <span>
                    <IoIosInformationCircleCustom tooltipMessage={tooltipMessage}/>
                </span>
          </label>
              <Select 
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  onChange={onChange}
                  value={value || []}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                  renderValue={(selected) => selected.join(', ')}
              >
                  {dropdownlist.map((name) => (
                      <MenuItem key={name.optionValue} value={name.optionValue}>
                      <Checkbox checked={value.includes(name.optionValue)}/> 
                      <ListItemText primary={name.optionLabel}/>   
                      </MenuItem>
                  ))}
              </Select>
          </FormControl>
      </>
  )
}


export default MultiSelectDropdownlist;
