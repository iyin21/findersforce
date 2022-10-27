import { TimeInput } from "@mantine/dates"

interface ITimeProps {
    placeholder?: string
    label?: string
    name?: string
    required?: boolean
    value?: any
    onChange?: (value: Date) => void
    className?: string
    format?: string
}

const TimePicker = ({
    placeholder,
    label,
    name,
    required,
    value,
    onChange,
    className,
}: ITimeProps) => {
    return (
        <div>
            <TimeInput
                data-testid="time-picker"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                label={label}
                name={name}
                required={required}
                format={"12" || "24"}
                classNames={{
                    input: "w-full h-14 pt-2 px-4 border border-neutral-40 rounded",
                    defaultVariant: "text-neutral-80",
                    filledVariant: "text-neutral-80",
                    wrapper: "text-neutral-80",
                }}
                className={className}
                clearable
                amLabel="am"
                pmLabel="pm"
            />
        </div>
    )
}

export default TimePicker
