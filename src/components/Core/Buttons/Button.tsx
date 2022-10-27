interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "yellow" | "danger" | "green" | "warning" | "clear"
    size?: "small" | "normal"
    iconLeft?: JSX.Element
    iconRight?: JSX.Element
    type?: "button" | "submit" | "reset"
    children: React.ReactNode
}

const Button = ({
    variant,
    size,
    iconLeft,
    iconRight,
    children,
    className,
    ...rest
}: IButtonProps) => {
    return (
        <button
            {...rest}
            className={`btn flex items-center justify-center  btn--${variant} btn--${size} ${className} py-4 px-4 md:py-4 md:px-6 `}
        >
            <span className="mr-2 lg:mr-2">{iconLeft}</span>
            {children}
            <span className="lg:ml-2">{iconRight}</span>
        </button>
    )
}

export default Button
