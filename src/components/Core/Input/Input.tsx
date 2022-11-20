/* eslint-disable react/display-name */
import React, { ForwardedRef } from "react"

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    control: string
    suffixIcon?: JSX.Element
    prefixIcon?: JSX.Element
    error?: boolean;
    classNames?: {
        root?: string
        input?: string
    }
}

/**
 *
 * @param {Object} - Inputprops
 * @return {JsxElement}
 */
const Input = React.forwardRef(
    (
        {
            control,
            error,
            className,
            classNames,
            prefixIcon,
            suffixIcon,
            ...rest
        }: IInputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <div
                className={`px-2 md:px-4  flex items-center border border-black-10 h-12 md:h-14 rounded${
                    error ? "border border-red-100" : ""
                } ${className} ${classNames?.root}`}
            >
                <span className="mr-2">{prefixIcon}</span>
                <input
                    className="w-full outline-none input bg-transparent"
                    {...rest}
                    ref={ref}
                />
                <span>{suffixIcon}</span>
            </div>
        )
    }
)

export default Input
