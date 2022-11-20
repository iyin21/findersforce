import { Modal } from "@mantine/core"
import Button from "../../../components/Core/Buttons/Button"
import { Dispatch, SetStateAction } from "react"
import WarningIcon from "../../../assets/warning.svg"

export interface ConfirmDeleteInterface {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    handleDelete: () => void
    isDeleting: boolean
    userName: string
}

const ConfirmDelete = ({
    opened,
    setOpened,
    userName,
    handleDelete,
    isDeleting,
}: ConfirmDeleteInterface) => {
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
                <div className="bg-black-100 px-3  py-5 flex items-center justify-center">
                    <img src={WarningIcon} alt="warning" />
                </div>

                <div className="px-3 py-5">
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Remove {userName}?
                    </h3>
                    <p className="text-black-90 text-md md:text-lg mx-auto w-4/5">
                        You are about to remove a user with administrative
                        access. They won`t be able to access FindersForce until
                        you invite them again. Do you wish to continue?
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center py-3 md:py-5 w-3/5 mx-auto">
                    <Button
                        variant="danger"
                        className="text-white-100 w-full"
                        onClick={() => {
                            handleDelete()
                        }}
                    >
                        {isDeleting ? "Removing..." : "Remove"}
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

export default ConfirmDelete
