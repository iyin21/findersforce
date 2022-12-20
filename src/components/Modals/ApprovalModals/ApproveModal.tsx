import { Modal } from "@mantine/core"
import { BsCheck } from "react-icons/bs"
import { MdCancel } from "react-icons/md"
import Check from "../../../assets/check.svg"

interface prop {
    openApproveModal: boolean
    setOpenApproveModal: any
    handleAccept: () => void
    isLoadingAcceptedData: boolean
    isLoadingRejectedData: boolean
}
const ApproveModal = ({
    openApproveModal,
    setOpenApproveModal,
    handleAccept,
    isLoadingRejectedData,
    isLoadingAcceptedData,
}: prop) => {
    return (
        <Modal
            opened={openApproveModal}
            onClose={() => setOpenApproveModal(false)}
            closeOnClickOutside={false}
            closeOnEscape={false}
            overlayOpacity={0.55}
            overlayBlur={3}
            withCloseButton={false}
            centered
            padding={0}
            size={500}
            styles={() => ({
                modal: {
                    borderRadius: "10px",
                },
            })}
        >
            <div>
                <div className="bg-black-100 p-10 pt-5 rounded-tr-[10px] rounded-tl-[10px]">
                    <MdCancel
                        onClick={() => setOpenApproveModal(false)}
                        size={24}
                        color="white"
                        className="flex justify-end ml-auto cursor-pointer"
                    />
                    <img src={Check} alt="verify icon" className="m-auto" />
                </div>
                <div className="p-10 pb-0 flex flex-col items-center">
                    <p className="text-center font-creato font-extrabold text-xl px-4">
                        Are you sure you want to verify this account?
                    </p>
                    <span className="pt-2 text-center text-lg font-medium font-creato px-2">
                        Verifying this account gives the operative the ability
                        to apply for shifts and fully access all the operative
                        functionalities of the Finders Force app.
                    </span>
                </div>
                <div className="p-10 pt-0 flex items-center justify-end pt-6">
                    <span
                        onClick={() => setOpenApproveModal(false)}
                        className="cursor-pointer text-2md font-bold font-creato mr-8"
                    >
                        Cancel
                    </span>
                    <button
                        className="bg-green-100 p-4 ml-4 flex text-white-100 items-center rounded rounded-tr-2xl font-bold body-medium px-6"
                        onClick={() => handleAccept()}
                        disabled={
                            isLoadingAcceptedData || isLoadingRejectedData
                        }
                    >
                        <BsCheck size="30px" color="white" />
                        {isLoadingAcceptedData ? "Loading.." : "Verify"}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ApproveModal
