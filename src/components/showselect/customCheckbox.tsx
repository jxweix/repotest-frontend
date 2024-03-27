import React from "react";
import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";
import { CheckIcon } from './checkIcon'

const checkbox = tv({
    slots: {
        base: "border-default hover:bg-default-200 border-[1px] p-4",
        content: "text-black"
    },
    variants: {
        isSelected: {
            true: {
                base: "border-violet-700 bg-violet-300 hover:bg-cyan-200 hover:border-violet-500 border-[1px]",
                content: "text-black-foreground pl-1"
            }
        },
        isFocusVisible: {
            true: {
                base: "outline-none ring- ring-focus ring-offset-2 ring-offset-background",
            }
        }
    }
})

export const CustomCheckbox = (props:any) => {
    const {
        children,
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps,
    } = useCheckbox({
        ...props
    })

    const styles = checkbox({ isSelected, isFocusVisible })

    return (
        <label {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <Chip
                classNames={{
                     base: styles.base(),
                    content: styles.content(),
                }}
                color="success"
                startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
                variant="faded"
                // {...getLabelProps()}
            >
                {children ? children : isSelected ? "Enabled" : "Disabled"}
            </Chip>
        </label>
    );
}
