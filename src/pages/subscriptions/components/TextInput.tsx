import { TextInput } from "@mantine/core"

interface props {
    label: string,
    value: string,
    rightSection?: JSX.Element
}

const inputStyle: {} = {
    input: {
        border: "1px solid rgba(15, 13, 0, 0.1)",
        height: "60px",
        width: "400px",
        marginBottom: "14px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        padding: "20px",
        fontSize: "14px",
    },
    label: {
        color: "#0F0D00",
        fontSize: "14px",
        fontWeight: "bolder",
    },
}

const InputText: React.FC<props> = ({ label, value, rightSection, }) => {
    return (
        <TextInput
            label={label}
            value={value}
            rightSection={rightSection}
            disabled
            readOnly
            styles={() => inputStyle}
        />
    )
}

export default InputText
