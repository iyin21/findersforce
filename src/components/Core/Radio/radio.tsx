import React, { ReactElement } from "react"

export interface RadioButtonProps {
    id: string
    name: string
    label: ReactElement<any, any> | string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    checked?: boolean
    value?: string
}

const RadioButton = ({
    id,
    name,
    onChange,
    value,
    checked,
    label,
}: RadioButtonProps) => {
    return (
        <div className="flex items-center mr-4 mb-3">
            <input
                type="radio"
                className="hidden"
                id={id}
                name={name}
                onChange={onChange}
                checked={checked}
                value={value}
            />
            <label
                htmlFor={id}
                className="flex items-center gap-1 cursor-pointer text-lg"
            >
                <span className="w-6 h-6 md:w-8 md:h-8 inline-block mr-2 rounded-full border border-black-20 flex-no-shrink radio_span"></span>
                {label}
            </label>
        </div>
    )
}

export default RadioButton
