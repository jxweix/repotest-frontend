import React, { useState, FormEvent } from 'react';
import { CheckboxGroup } from "@nextui-org/react";
import { CustomCheckbox } from "./customCheckbox";

export default function showselect() {
    const [groupSelected, setGroupSelected] = useState<string[]>([]);

    const handleCheckboxChange = (value: string[]) => {
        setGroupSelected(value);
    };
    return (
        <div className="flex flex-col gap-1 w-[500px]">
            <CheckboxGroup
                className="gap-1"
                label="Select amenities"
                orientation="horizontal"
                value={groupSelected}
                // onChange={handleCheckboxChange}
            >
                <CustomCheckbox value="wifi">Wifi</CustomCheckbox>
                <CustomCheckbox value="tv">TV</CustomCheckbox>
                <CustomCheckbox value="kitchen">Kitchen</CustomCheckbox>
                <CustomCheckbox value="parking">Parking</CustomCheckbox>
                <CustomCheckbox value="pool">Pool</CustomCheckbox>
                <CustomCheckbox value="gym">Gym</CustomCheckbox>
            </CheckboxGroup>
            <p className="mt-4 ml-1 text-default-500">
                Selected: {groupSelected.join(", ")}
            </p>
        </div>
    )
}
