import EmptyImg from "../assets/images/emptyState.png"
import { GoPlus } from "react-icons/go"

interface Props {
    showSendComplaintButton?: boolean
    handleClick?: () => void
    description: string
}
const EmptyState = ({
    handleClick,
    showSendComplaintButton,
    description,
}: Props) => {
    return (
        <div className="flex flex-col lg:px-[35%] justify-center mt-[80px] items-center px-6">
            <img src={EmptyImg} alt="" />
            <h5 className="pt-2 font-bold">Nothing to see here</h5>
            <p className="text-center body-regular">{description}</p>
            {showSendComplaintButton && (
                <button
                    data-testid="support_btn"
                    className="bg-yellow-100 rounded rounded-tr-2xl flex justify-center items-center font-bold body-medium py-4 w-full mt-6"
                    //@ts-expect-error
                    onClick={() => handleClick()}
                >
                    <GoPlus size="30px" color="black" />
                    <span className="pl-2">Send a complaint</span>
                </button>
            )}
        </div>
    )
}

export default EmptyState
