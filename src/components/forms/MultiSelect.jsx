import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import React from 'react'

const MultiSelect = ({ dropdownList, value, onChange, placeholder }) => {

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
                <InputLabel id="demo-multiple-name-label">{placeholder}</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    onChange={onChange}
                    value={value}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {dropdownList.map((name) => (
                        <MenuItem
                            key={name.optionValue}
                            value={name.id}>
                            {name.optionLabel}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default MultiSelect