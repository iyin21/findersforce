import { TextInput } from "@mantine/core"

interface props {
    label: string,
    value: string
}

const inputStyle: {} = {
    input: {
        border: "1px solid rgba(15, 13, 0, 0.1)",
        height: "64px",
        width: "500px",
        marginBottom: "27px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        padding: "23px",
        fontSize: "16px",
    },
    label: {
        color: "#0F0D00",
        fontSize: "16px",
        fontWeight: "bolder",
    },
}

const InputText: React.FC<props> = ({ label, value }) => {
    return (
        <TextInput
            label={label}
            disabled
            readOnly
            value={value}
            styles={() => inputStyle}
        />
    )
}

export default InputText
