import { TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import Button from "../../components/Core/Buttons/Button"

const OtpContainer = ({
    handleSubmit,
    defaultStyle = false,
    text = "Reset Password",
    isSubmitting
}: {
    handleSubmit: (values: any) => void
    defaultStyle?: boolean
    text?: string
    isSubmitting?: boolean
}) => {
    const value: string[] = ["one", "two", "three", "four", "five"]
    const otpForm = useForm({
        initialValues: {
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
        },
        validate: {
            one: (value) => (isNaN(Number(value)) ? "Invalid pin" : null),
            two: (value) => (isNaN(Number(value)) ? "Invalid pin" : null),
            three: (value) => (isNaN(Number(value)) ? "Invalid pin" : null),
            four: (value) => (isNaN(Number(value)) ? "Invalid pin" : null),
            five: (value) => (isNaN(Number(value)) ? "Invalid pin" : null),
        },
    })

    const inputContainer = value.map((num) => {
        return (
            <TextInput
                placeholder="0"
                label=""
                key={num}
                required
                autoComplete="false"
                {...otpForm.getInputProps(`${num}`)}
                styles={() => ({
                    innerInput: {
                        color: "rgba(15, 13, 0, 0.8)",
                        fontSize: "16px",
                        paddingTop: "7px",
                        "&::placeholder": {
                            color: "gray",
                            fontSize: "16px",
                            lineHeight: "19px",
                        },
                    },
                    input: {
                        border: "1px solid rgba(15, 13, 0, 0.1)",
                        height: "64px",
                        borderRadius: "10px",
                        textAlign: "center",
                    },
                })}
            />
        )
    })

    return (
        <form onSubmit={otpForm.onSubmit((values) => handleSubmit(values))}>
            <div className="grid grid-cols-5 w-full mb-[50px] gap-x-4">
                {inputContainer}
            </div>
            <Button
                variant="primary"
                type="submit"
                style={
                    !isSubmitting
                        ? {
                              backgroundColor: "rgba(254, 215, 10, 1)",
                          }
                        : {
                              backgroundColor: "rgba(254, 215, 10, 1)",
                              opacity: "0.7",
                          }
                }
                className={
                    !defaultStyle
                        ? "text-black-100 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                        : "text-black-100 absolute bottom-12 bg-yellow-100 font-bold text-base w-[90%] text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                }
            >
                {!isSubmitting ? <>{text}</> : "Loading..."}
            </Button>
        </form>
    )
}

export default OtpContainer
