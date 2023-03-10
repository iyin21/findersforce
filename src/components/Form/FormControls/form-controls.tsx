/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import { Field } from "formik"
import Input from "../../Core/Input/Input"
import styles from "./select.module.scss"

interface IinputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    control: "input" | "select" | "textarea"
    suffixIcon?: JSX.Element
    prefixIcon?: JSX.Element
    error?: boolean
    enablereinitialize?: boolean
    onClick?: (value: any) => void
    validate?: (value: any) => string | any
    classNames?: {
        input?: string
        mainRoot?: string
        wrapperRoot: string
        wrapper?: string
    }
}

interface ISelectProps {
    name?: string
    className?: string
    children: React.ReactNode
    value?: string
}

function InputProp(props: IinputProps) {
    const {
        suffixIcon,
        prefixIcon,
        classNames,
        name,
        type,
        enablereinitialize,
        onClick,
        disabled,
    } = props

    return (
        <Field name={name}>
            {({ field, meta, form }: any) => (
                <div
                    className={`flex flex-col w-full ${classNames?.wrapper} ${
                        form.touched[name as string] &&
                        form.errors[name as string]
                            ? "border-red-100"
                            : ""
                    } `}
                >
                    <Input
                        {...field}
                        {...props}
                        prefixIcon={prefixIcon}
                        suffixIcon={suffixIcon}
                        onClick={onClick}
                        className={`bg-white-100 h-14 flex items-center placeholder:bg-black-60 rounded-[10px] outline-none w-full  ${
                            disabled ? "bg-black-20 cursor-not-allowed" : ""
                        } `}
                        type={type}
                        error={
                            form.touched[name as string] &&
                            form.errors[name as string]
                        }
                        enablereinitialize={enablereinitialize}
                    />
                    {meta.touched && meta.error && (
                        <div className="text-red-100 my-2 text-lg">
                            {meta.error}
                        </div>
                    )}
                </div>
            )}
        </Field>
    )
}
function TextAreaProp(props: IinputProps) {
    const { classNames, name, onClick, disabled } = props

    return (
        <Field name={name}>
            {({ field, meta, form }: any) => (
                <div>
                    <div
                        className={`flex flex-col w-full border border-black-10  rounded-[10px]  h-20 px-2 ${
                            classNames?.wrapper
                        } ${
                            form.touched[name as string] &&
                            form.errors[name as string]
                                ? "border-red-100"
                                : ""
                        } `}
                    >
                        <textarea
                            {...field}
                            {...props}
                            onClick={onClick}
                            className={`bg-white-100 h-20 flex items-center placeholder:bg-black-60 outline-none w-full pt-2  ${
                                disabled ? "bg-black-20 cursor-not-allowed" : ""
                            } `}
                            // type={type}
                            // eslint-disable-next-line react/no-unknown-property
                            error={
                                form.touched[name as string] &&
                                form.errors[name as string]
                            }
                            rows={5}
                        />
                    </div>
                    {meta.touched && meta.error && (
                        <div className="text-red-100 items-center text-lg ">
                            {meta.error}
                        </div>
                    )}
                </div>
            )}
        </Field>
    )
}

function SelectInput(props: ISelectProps) {
    const { className, name, children, ...rest } = props

    return (
        <>
            {/* <Field name={name} as="select">
                {children}
            </Field> */}
            <Field name={name}>
                {({ field, meta }: any) => (
                    <div className={`flex flex-col ${className} `}>
                        <select
                            {...field}
                            {...props}
                            {...rest}
                            className={`border-solid border border-black-10  p-4 rounded w-full outline-none ${className}  bg-red ${
                                styles["select"]
                            } ${
                                meta.touched && meta.error
                                    ? "border border-red-100"
                                    : ""
                            }`}
                            defaultValue={meta.initialValue}
                        >
                            {children}
                        </select>
                        {meta.touched && meta.error && (
                            <div className="text-red-100 my-2 text-lg">
                                {meta.error}
                            </div>
                        )}
                    </div>
                )}
            </Field>
        </>
    )
}

export default function FormikControls({ control, ...rest }: IinputProps) {
    switch (control) {
        case "input":
            return <InputProp control="select" {...rest} />
        case "textarea":
            return <TextAreaProp control="select" {...rest} />
        case "select":
            // @ts-expect-error
            return <SelectInput {...rest} />
        default:
            return null
    }
}
