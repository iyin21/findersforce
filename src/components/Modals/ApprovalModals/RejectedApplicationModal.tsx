import { Textarea, Modal } from "@mantine/core"
import { BsCheck } from "react-icons/bs"
import Avatar from "../../../pages/Applications/assets/avatar.svg"
import { Data } from "../../../types/approval/approval-interface"

interface prop {
    openModal: boolean
    setOpenModal: any
    element: Data | undefined
    handleAccept: () => void
    isLoadingAcceptedData: boolean
}
const RejectedApplicationModal = ({
    openModal,
    setOpenModal,
    handleAccept,
    element,
    isLoadingAcceptedData,
}: prop) => {
    return (
        <Modal
            opened={openModal}
            onClose={() => setOpenModal(false)}
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
                <h3 className="font-extrabold text-3xl">Review Registration</h3>
                <p className="text-black-60 pt-1">
                    Add reasons for verifying this application
                </p>
                <div className="pt-11 flex">
                    <div className="flex justify-between">
                        <img
                            //                    src={data?.user.profileImageUrl || Avatar}
                            src={Avatar}
                            className="rounded-full  h-14 w-14"
                            alt="profile pictogram"
                        />
                    </div>

                    <div className="lg:pl-4 ">
                        <div className="flex justify-between mt-2 lg:mt-0">
                            <h5 className="font-extrabold text-2mxl">
                                {" "}
                                {element?.firstName + " " + element?.lastName}
                            </h5>
                        </div>

                        <p className="text-black-100">
                            <span className="text-lg">{element?.gender}</span>
                            <span className="text-black-10 pl-1">|</span>
                            <span className="text-black-100 pl-1 font-normal">
                                {element?.email}
                            </span>
                        </p>
                    </div>
                </div>
                <Textarea
                    label="Reason"
                    value={element?.doc.rejectReason ?? ""}
                    disabled
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
                    required={false}
                    disabled
                    value={element?.doc.moreInformation ?? ""}
                    radius={"md"}
                    minRows={7}
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
                        onClick={() => setOpenModal(false)}
                        className="cursor-pointer text-2md font-bold font-creato mr-8"
                    >
                        Cancel
                    </span>

                    <button
                        className="bg-green-100 p-4 ml-4 flex text-white-100 items-center rounded rounded-tr-2xl font-bold body-medium px-6"
                        onClick={() => handleAccept()}
                        disabled={
                            isLoadingAcceptedData 
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

export default RejectedApplicationModal
