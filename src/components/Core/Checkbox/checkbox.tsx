import React from "react"
import { FaCheck } from "react-icons/fa"

interface ICheckBoxProps {
    className?: string
    classNames?: {
        label?: string
        input?: string
        wrapper?: string
    }
    name?: string
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
    checked?: boolean
    id?: string
}

/**
 *
 * @param {object} - Inputprops
 * @return {JSXElement}
 */
export default function Checkbox({
    className,
    classNames,
    label,
    name,
    checked,
    onChange,
    value,
    id,
    ...rest
}: ICheckBoxProps): JSX.Element {
    return (
        <>
            <div
                className={`flex items-center h-6 w-fit cursor-pointer rounded-lg mb-2 ${
                    classNames?.wrapper ?? ""
                }
            `}
            >
                <input
                    type="checkbox"
                    className={` accent-black-10 focus:ring-0 outline-none cursor-pointer focus:outline-none border border-black-20 h-6 w-6 ${
                        classNames?.input || ""
                    }`}
                    {...rest}
                    id={id}
                    name={name}
                    onChange={onChange}
                    checked={checked}
                    value={value}
                />
                <label
                    htmlFor={id}
                    className={`hidden cursor-pointer border-white-100 h-6 w-6 flex items-center justify-center rounded-sm ${
                        checked ? "border-0 rounded-lg" : "border rounded-lg"
                    }`}
                >
                    <FaCheck className="checkmark text-white-100 w-full h-full p-1 lg:text-2xl" />
                </label>
                <label
                    htmlFor={id}
                    className={` font-creato ml-2 ${classNames?.label || ""}`}
                >
                    {label}
                </label>
            </div>
        </>
    )
}
