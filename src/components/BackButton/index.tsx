import { BiArrowBack } from "react-icons/bi"

export interface BackButtonInterface {
    handleBackButton: () => void
}

const BackButton = ({ handleBackButton }: BackButtonInterface) => {
    return (
        <div
            className="bg-black-10 p-2 w-fit mx-4 rounded-lg relative z-20"
            onClick={() => handleBackButton()}
        >
            <BiArrowBack size={30} />
        </div>
    )
}

export default BackButton
