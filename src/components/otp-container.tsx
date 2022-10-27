import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Button from "./button";

const OtpContainer = ({ handleSubmit }: { handleSubmit: (values: any) => void }) => {
    const value = ['one', 'two', 'three', 'four', 'five'];
    const otpForm = useForm({
        initialValues: {
            'one': '',
            'two': '',
            'three': '',
            'four': '',
            'five': ''
        },
        validate: {
            'one': (value) => ( isNaN(Number(value)) ? 'Invalid pin' : null ),
            'two': (value) => ( isNaN(Number(value)) ? 'Invalid pin' : null ),
            'three': (value) => ( isNaN(Number(value)) ? 'Invalid pin' : null ),
            'four': (value) => ( isNaN(Number(value)) ? 'Invalid pin' : null ),
            'five': (value) => ( isNaN(Number(value)) ? 'Invalid pin' : null )
        }
    })

    const inputContainer =  value.map(num => {
        return (
            <TextInput 
                placeholder="0"
                label=""
                key={num}
                withAsterisk
                required
                autoComplete="false"
                {...otpForm.getInputProps(`${num}`)}
                styles={() => ({
                    innerInput: {
                        color: "rgba(15, 13, 0, 0.8)",
                        fontSize: "16px",
                        paddingTop: "7px",
                        '&::placeholder': {
                            color: "gray",
                            fontSize: '16px',
                            lineHeight: '19px'
                        }
                    },
                    input: {
                        marginTop: '10px',
                        border: '1px solid rgba(15, 13, 0, 0.1)',
                        height: '64px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }
                })}
            />
        );
    });

    return (
        <form onSubmit={otpForm.onSubmit(values => handleSubmit(values))}>
            <div className="grid grid-cols-5 w-full mb-[50px] gap-x-4">
                {inputContainer}
            </div>
            <Button buttonText="Reset password"/>
        </form>
    );
}

export default OtpContainer;