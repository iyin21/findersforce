import { Modal } from "@mantine/core"
import Button from "../../../components/Core/Buttons/Button"
import { Dispatch, SetStateAction } from "react"
import SentIcon from "../../../assets/sent.svg"

export interface SuccessInterface {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    handleBack: () => void
}

const SuccessModal = ({ opened, setOpened, handleBack }: SuccessInterface) => {
    return (
        <div>
            <Modal
                opened={opened}
                withCloseButton={false}
                onClose={() => setOpened(false)}
                size="lg"
                centered
                classNames={{
                    modal: "p-0",
                }}
            >
                <div className="bg-black-100 md:px-3  py-5 flex items-center justify-center">
                    <img src={SentIcon} alt="success" />
                </div>

                <div className="px-3 py-5">
                    <h3 className="text-3xl font-bold text-center mb-3">
                        Invite sent
                    </h3>
                    <p className="text-black-90 text-lg md:mx-auto md:w-4/5 px-3 md:px-0">
                        This gives them administrative access to your depot
                        account
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center py-5 w-3/5 mx-auto mb-8">
                    <Button
                        variant="primary"
                        className="text-white-100 w-full"
                        onClick={() => {
                            handleBack()
                        }}
                    >
                        Back
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default SuccessModal
