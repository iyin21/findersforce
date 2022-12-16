import { useState } from "react"
import { Select, Textarea, Modal } from "@mantine/core"
import { BsX } from "react-icons/bs"

interface prop {
    openRejectModal: boolean
    setOpenRejectModal: any
    handleReject: ({moreInfo, reason}: {moreInfo: string, reason: string | null}) => void
    isLoadingAcceptedData: boolean
    isLoadingRejectedData: boolean
}
const RejectModal = ({
    openRejectModal,
    setOpenRejectModal,
    handleReject,
    isLoadingRejectedData,
    isLoadingAcceptedData,
}: prop) => {
    const [value, setValue] = useState<string | null>(null)
    const [moreInfo, setMoreInfo] = useState("")
    return (
        <Modal
            opened={openRejectModal}
            onClose={() => setOpenRejectModal(false)}
            closeOnClickOutside={false}
            closeOnEscape={false}
            overlayOpacity={0.55}
            overlayBlur={3}
            withCloseButton={false}
            centered
            size={623}
            styles={() => ({
                modal: {
                    borderRadius: "10px",
                },
                body: {
                    padding: "10px",
                },
            })}
        >
            <div>
                <h3 className="font-extrabold text-3xl">Reject Registration</h3>
                <p className="text-black-60 pt-1">
                    Add reasons for rejecting this application
                </p>
                <Select
                    label="Reason"
                    placeholder="Pick one"
                    value={value}
                    required
                    onChange={setValue}
                    data={[
                        {
                            value: "Unclear identification",
                            label: "Unclear identification",
                        },
                        {
                            value: "Wrong identification",
                            label: " Wrong identification",
                        },
                        {
                            value: "Expired Identification",
                            label: "Expired Identification",
                        },
                        {
                            value: "Unverifiable Identifcation",
                            label: "Unverifiable Identifcation",
                        },
                        {
                            value: "Others",
                            label: "Others",
                        },
                    ]}
                    styles={() => ({
                        label: {
                            fontSize: "15px",
                            fontWeight: 700,
                            paddingTop: "32px",
                        },
                        input: {
                            height: 60,
                            fontWeight: 400,
                            fontSize: "15px",
                            borderRadius: 10,
                            marginTop: 5,
                        },
                    })}
                />
                <Textarea
                    placeholder=""
                    label="More Information"
                    autosize
                    value={moreInfo}
                    onChange={e => setMoreInfo(e.currentTarget.value)}
                    required={false}
                    radius={"md"}
                    minRows={10}
                    styles={() => ({
                        label: {
                            paddingTop: 24,
                            fontWeight: 700,
                            fontSize: 15,
                        },
                        input: {
                            marginTop: 5,
                        },
                    })}
                />
                <div className="flex items-center justify-end pt-8">
                    <span
                        onClick={() => setOpenRejectModal(false)}
                        className="cursor-pointer text-2md font-bold font-creato mr-8"
                    >
                        Cancel
                    </span>
                    <button
                        className="bg-red-10 p-4 rounded rounded-tr-2xl flex items-center font-bold body-medium px-6"
                        onClick={() => handleReject({moreInfo: "", reason: value})}
                        disabled={
                            isLoadingAcceptedData || isLoadingRejectedData
                        }
                    >
                        <BsX size="30px" color="red" />
                        {isLoadingRejectedData ? "Loading.." : "Reject"}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default RejectModal
