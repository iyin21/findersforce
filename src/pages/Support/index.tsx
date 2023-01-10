import SupportModal from "../../components/Modals/SupportModal"
import { ChangeEvent, useRef, useState } from "react"
import Layout from "../../components/Layout"
import { useGetAllComplaints } from "./hooks/support.hook"
import EmptyState from "./components/emptyState"
import ReturningSupport from "./components/returningSupport"
import SingleComplaint from "./components/singleComplaint"
import { GoPlus } from "react-icons/go"
import { CgSpinner } from "react-icons/cg"
import { Modal, Select, Textarea, TextInput } from "@mantine/core"
import { useAuthContext } from "../../pages/auth/context/authContext"
import uploadIcon from "../../assets/image.svg"

const Support = () => {
    const [openModal, setOpenModal] = useState(false)
    const [phase, setPhase] = useState(1)
    const [activeId, setActiveId] = useState("")
    const [complaintAboutValue, setComplaintValue] = useState<string | null>(
        null
    )
    const [issue, setIssue] = useState<string | null>(null)
    const [moreInfo, setMoreInfo] = useState("")
    const { state } = useAuthContext()

    const { data: allData, isLoading: isLoadingAllData } = useGetAllComplaints()
    const [handleRefetch, setHandleRefetch] = useState(false)

    const [opened, setOpened] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [pictureName, setPictureName] = useState("")

    const handleCompanyLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setPictureName(file.name)
        }
    }

    const operativeIssues = [
        {
            value: "Unsupportive / Unhelpful",
            label: "Unsupportive / Unhelpful",
        },
        {
            value: "Rude / Condescending",
            label: "Rude / Condescending",
        },
        {
            value: "False Blame",
            label: "False Blame",
        },
        {
            value: "Racial / Prejudice Allegation",
            label: "Racial / Prejudice Allegation",
        },
        {
            value: "Bullying / Abusing Authority",
            label: "Bullying / Abusing Authority",
        },
        {
            value: "Other",
            label: "Other",
        },
    ]

    const platformIssues = [
        {
            value: "Glitches",
            label: "Glitches",
        },
        {
            value: "Difficulty posting a job",
            label: "Difficulty posting a job",
        },
        {
            value: "Difficulty making payment",
            label: "Difficulty making payment",
        },
        {
            value: "Other",
            label: "Other",
        },
    ]

    return (
        <Layout pageTitle="Support">
            {openModal && (
                <SupportModal
                    setOpened={setOpenModal}
                    opened={openModal}
                    setHandleRefetch={setHandleRefetch}
                />
            )}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
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
                    <h3 className="font-extrabold text-3xl">
                        Formal Complaints
                    </h3>
                    <p className="text-black-60 pt-1">
                        Enable Finders Force to conduct full investigations on
                        your Organisations behalf.
                    </p>
                    <TextInput
                        label="Email Address"
                        disabled
                        value={state?.user?.email ?? " "}
                        className="w-full"
                        styles={() => ({
                            input: {
                                height: 55,
                                borderRadius: 10,
                            },
                            label: {
                                paddingBottom: 5,
                                paddingTop: 32,
                                fontSize: "15px",
                                fontWeight: 700,
                            },
                        })}
                    />
                    <Select
                        label="Who or what is your complaint about?"
                        placeholder="Pick one"
                        value={complaintAboutValue}
                        required
                        onChange={setComplaintValue}
                        data={[
                            {
                                value: "Operatives",
                                label: "Operatives",
                            },
                            {
                                value: "Platform use",
                                label: " Platform use",
                            },
                        ]}
                        styles={() => ({
                            label: {
                                fontSize: "15px",
                                fontWeight: 700,
                                paddingTop: "12px",
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
                    <Select
                        label="What's the issue?"
                        placeholder="Pick one"
                        value={issue}
                        required
                        disabled={complaintAboutValue === null ? true : false}
                        onChange={setIssue}
                        data={complaintAboutValue === "Operatives" ? operativeIssues : platformIssues}
                        styles={() => ({
                            label: {
                                fontSize: "15px",
                                fontWeight: 700,
                                paddingTop: "12px",
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
                    <div className="relative">
                        <Textarea
                            placeholder=""
                            label="Description"
                            autosize
                            value={moreInfo}
                            onChange={(e) => setMoreInfo(e.currentTarget.value)}
                            required={false}
                            radius={"md"}
                            minRows={4}
                            styles={() => ({
                                label: {
                                    paddingTop: 12,
                                    fontWeight: 700,
                                    fontSize: 15,
                                },
                                input: {
                                    marginTop: 20,
                                    marginBottom: 15,
                                },
                            })}
                        />
                        <span className="text-[13px] text-black-60 absolute bottom-[110px]">
                            For our investigation, provide as much information
                            as possible.
                        </span>
                    </div>

                    <div className="w-full">
                        <label
                            // htmlFor="emailAdress"
                            className="text-md md:text-3md mb-2 block font-bold"
                        >
                            Upload Image (optional)
                        </label>

                        <input
                            data-testid="file-upload"
                            ref={fileInputRef}
                            type="file"
                            hidden
                            onChange={handleCompanyLogoUpload}
                        />
                        <div
                            className="bg-black-10 text-white-100 p-6 rounded flex gap-5 items-center cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <img src={uploadIcon} alt="upload" />
                            <div>
                                <p className="text-black-100 cursor-pointer">
                                    Tap to {pictureName ? "change" : "Upload"}
                                </p>
                                <span className="text-black-100 text-md">
                                    {pictureName
                                        ? pictureName + " selected"
                                        : "JPEG, PNG accepted; 10MB max file size"}
                                </span>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                    <div className="flex items-center justify-end pt-8">
                        <span
                            onClick={() => setOpened(false)}
                            className="cursor-pointer text-2md font-bold font-creato mr-8"
                        >
                            Cancel
                        </span>
                        <button
                            className="bg-yellow-100 p-4 rounded rounded-tr-2xl flex items-center font-bold body-medium px-6"
                            // onClick={() => handleReject({moreInfo: moreInfo, reason: value})}
                            // disabled={
                            //     isLoadingAcceptedData || isLoadingRejectedData
                            // }
                        >
                            Log complaint
                            {/* {isLoadingRejectedData ? "Loading.." : "Reject"} */}
                        </button>
                    </div>
                </div>
            </Modal>
            {isLoadingAllData ? (
                <div className="h-screen w-full flex mt-24 justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                </div>
            ) : (
                <div className="md:p-6 p-6 mt-4 md:mt-14 font-creato">
                    <div className="flex justify-between pl-6 pr-6">
                        <div>
                            <h5 className="font-bold lg:text-3xl text-2xl mb-2">
                                Support
                            </h5>
                            <p className="text-black-60">
                                Send a formal complaint
                            </p>
                        </div>
                        {allData && allData?.data.length > 0 && (
                            <button
                                className="bg-yellow-100 rounded rounded-tr-2xl flex justify-center items-center font-bold body-medium py-4 lg:text-2md px-2 mt-6"
                                onClick={() => setOpened(true)}
                                data-testid="support_btn"
                            >
                                <GoPlus size="30px" color="black" />
                                <span className="pl-2">Log complaint</span>
                            </button>
                        )}
                    </div>

                    {allData && allData?.data.length > 0 ? (
                        phase === 1 ? (
                            <ReturningSupport
                                setPhase={setPhase}
                                setActiveId={setActiveId}
                                handleRefetch={handleRefetch}
                            />
                        ) : (
                            <SingleComplaint
                                setPhase={setPhase}
                                activeId={activeId}
                            />
                        )
                    ) : (
                        <EmptyState
                            handleClick={() => setOpenModal(true)}
                            showSendComplaintButton
                            description="Formal support sent to FindersForce will show here"
                        />
                    )}
                </div>
            )}
        </Layout>
    )
}
export default Support
