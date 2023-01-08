import { Modal } from "@mantine/core"
import Button from "../../../components/Core/Buttons/Button"
import { Dispatch, SetStateAction } from "react"
import WarningIcon from "../../../assets/people-icon.svg"

export interface ConfirmPostInterface {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    handlePost: () => void
    isLoading: boolean
    description: string
}

const ConfirmPost = ({
    opened,
    setOpened,
    handlePost,
    isLoading,
    description,
}: ConfirmPostInterface) => {
    return (
        <div>
            <Modal
                opened={opened}
                withCloseButton={false}
                onClose={() => setOpened(false)}
                size="lg"
                centered
                classNames={{
                    modal: "p-0 rounded-lg",
                }}
            >
                <div className="bg-black-100 px-3  py-5 flex items-center justify-center rounded-t-lg">
                    <img src={WarningIcon} alt="warning" />
                </div>

                <div className="px-3 py-5 font-creato">
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Going Public!
                    </h3>
                    <p className="text-black-90 text-md md:text-lg mx-auto md:w-[60%] px-3 md:px-0 text-center">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center py-3 md:py-5 w-3/5 mx-auto">
                    <Button
                        variant="primary"
                        className="text-white-100 w-full"
                        onClick={() => {
                            handlePost()
                        }}
                    >
                        {isLoading ? "Posting..." : "Post Shift"}
                    </Button>
                    <Button
                        variant="clear"
                        onClick={() => {
                            setOpened(false)
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default ConfirmPost
