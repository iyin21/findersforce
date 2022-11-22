import { Text } from "@mantine/core"
import styles from "../profile.module.scss"

export const requirements = [
    { re: /[a-z]/, label: "A Lowercase letter (a)" },
    { re: /[A-Z]/, label: "An Uppercase letter (A)" },
    {
        re: /[$&+,:;=?@#|'<>.^*()%!-]/,
        label: "A special character letter (!@#)",
    },
    { re: /[0-9]/, label: "A number (1)" },
]

const CheckBox = ({ check }: { check: boolean }) => {
    return (
        <div>
            <label className={styles["container"]}>
                <input type="checkbox" checked={check} readOnly />
                <span className={styles["checkmark"]}></span>
            </label>
        </div>
    )
}

export const PasswordRequirement = ({
    meets,
    label,
}: {
    meets: boolean
    label: string
}) => {
    return (
        <Text
            color={meets ? "teal" : "red"}
            sx={{ display: "flex", alignItems: "center" }}
            mt={7}
            size="sm"
        >
            {meets ? <CheckBox check={true} /> : <CheckBox check={false} />}{" "}
            <span className="ml-2.5 pt-4">{label}</span>
        </Text>
    )
}

export const getStrength = (password: string) => {
    let multiplier = password.length > 5 ? 0 : 1

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1
        }
    })

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10)
}
