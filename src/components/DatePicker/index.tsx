import { DatePicker, DatePickerProps } from "@mantine/dates"

interface IDateProps extends DatePickerProps {
    styles?: any
}

const datePicker = ({
    placeholder,
    label,
    name,
    required,
    value,
    onChange,
    className,
    ...rest
}: IDateProps) => {
    return (
        <div>
            <DatePicker
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                label={label}
                name={name}
                required={required}
                classNames={{
                    input: "w-full h-14 px-4 border border-neutral-40 rounded",
                    defaultVariant: "text-neutral-80",
                    filledVariant: "text-neutral-80",
                    wrapper: "text-neutral-80",
                    label: "text-neutral-80 font-semibold font-sans",
                }}
                className={className}
                data-testid="date-picker"
                {...rest}
            />
        </div>
    )
}

export default datePicker
