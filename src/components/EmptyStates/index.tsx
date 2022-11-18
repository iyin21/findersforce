import Button from "../../components/Core/Buttons/Button"
import EmptyApplicationImage from "../../assets/empty.svg"
import { IoMdAdd } from "react-icons/io"

export interface EmptyStateInterface {
    description: string
    buttonText: string
    handleButtonClick: () => void
}

const EmptyState = ({
    description,
    buttonText,
    handleButtonClick,
}: EmptyStateInterface) => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-32">
                <img src={EmptyApplicationImage} alt="empty application" />
                <h1 className="text-black-100 text-3xl font-creatoMedium mt-5 font-bold">
                    Nothing to see here
                </h1>
                <p className="text-black-70 text-3md font-creato mt-3">
                    {description}
                </p>
                <div className="grid grid-cols-1 w-full md:w-auto md:flex md:flex-cols  justify-center md:flex-row items-center gap-2 md:gap-5 rounded p-2 border-accent-70 mt-5">
                    <Button
                        iconLeft={<IoMdAdd />}
                        variant="primary"
                        className="font-creatoMedium px-6 py-4 w-full md:w-auto"
                        onClick={() => handleButtonClick()}
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EmptyState
