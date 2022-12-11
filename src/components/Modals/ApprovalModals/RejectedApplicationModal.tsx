import { useState } from "react"
import { Select, Textarea, Modal } from "@mantine/core"
import { BsCheck } from "react-icons/bs"
import Avatar from "../../../pages/Applications/assets/avatar.svg"

interface prop {
    openModal: boolean
    setOpenModal: any
    handleAccept: () => void
    isLoadingAcceptedData: boolean
    isLoadingRejectedData: boolean
}
const RejectedApplicationModal = ({
    openModal,
    setOpenModal,
    handleAccept,
    isLoadingRejectedData,
    isLoadingAcceptedData,
}: prop) => {
    const [value, setValue] = useState<string | null>(null)
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
                                {"abiodun" +
                                    " " +
                                   "timothy"}
                            </h5>
                        </div>

                        <p className="text-black-100">
                            <span className="text-lg">{"male"}</span>
                            <span className="text-black-10 pl-1">|</span>
                            <span className="text-black-100 pl-1 font-normal">
                                {"timu@gmail.com"}
                            </span>
                        </p>
                    </div>
                </div>
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
                    required={false}
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

export default RejectedApplicationModal
