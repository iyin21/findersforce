import { Modal, Select, Textarea, TextInput } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import uploadIcon from "../../../assets/image.svg"
import { useCreateComplaint } from "../hooks/support.hook"

const operativeAndStaffIssues = [
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

const softwareIssues = [
    {
        value: "Feature not working",
        label: "Feature not working",
    },
    {
        value: "Feature is unreliable",
        label: "Feature is unreliable",
    },
    {
        value: "Process is confusing",
        label: "Process is confusing",
    },
    {
        value: "Data showing is incorrect",
        label: "Data showing is incorrect",
    },
    {
        value: "Feature request",
        label: "Feature request",
    },
    {
        value: "Other",
        label: "Other",
    },
]

const subscriptionIssues = [
    {
        value: "Element not derived",
        label: "Element not derived",
    },
    {
        value: "Element redundant/not working",
        label: "Element redundant/not working",
    },
    {
        value: "Other",
        label: "Other",
    },
]

const otherIssue = [
    {
        value: "Other",
        label: "Other",
    },
]

const ComplaintModal = ({
    opened,
    setOpened,
    email,
}: {
    opened: boolean
    setOpened: (val: boolean) => void
    email: string
}) => {
    const [complaintAboutValue, setComplaintValue] = useState<string | null>(
        null
    )
    const [issue, setIssue] = useState<string | null>(null)
    const [moreInfo, setMoreInfo] = useState("")

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [pictureName, setPictureName] = useState("")
    const [image, setImage] = useState<string | Blob>("")

    const handleCompanyLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setPictureName(file.name)
            setImage(file)
        }
    }
    const { data, mutate, isLoading } = useCreateComplaint()

    useEffect(() => {
        if (data) {
            showNotification({
                title: "Success",
                message: data.message,
                color: "green",
            })
            setOpened(false)
        }
    }, [data])

    const handleSubmit = () => {
        const formData = new FormData()
        const complaintIssues = []
        complaintIssues.push(issue || "")
        complaintIssues.map((item) =>
            formData.append("complaintIssues[]", item)
        )
        formData.append("complaintCategory", complaintAboutValue || "")

        formData.append("description", moreInfo)

        image !== "" ? formData.append("image", image) : null

        mutate({
            formData,
        })
    }

    return (
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
                <h3 className="font-extrabold text-3xl">Formal Complaints</h3>
                <p className="text-black-60 pt-1">
                    Enable Finders Force to conduct full investigations on your
                    Organisations behalf.
                </p>
                <TextInput
                    label="Email Address"
                    disabled
                    value={email}
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
                            value: "Agency operative",
                            label: "Agency operative",
                        },
                        {
                            value: "Findersforce staff",
                            label: "Findersforce staff",
                        },
                        {
                            value: "Finders Force Software",
                            label: "Finders Force Software",
                        },
                        {
                            value: "Findersforce subscription plan",
                            label: "Findersforce subscription plan",
                        },
                        {
                            value: "Other",
                            label: "Other",
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
                    data={
                        complaintAboutValue === "Agency operative"
                            ? operativeAndStaffIssues
                            : complaintAboutValue === "Findersforce staff"
                            ? operativeAndStaffIssues
                            : complaintAboutValue === "Finders Force Software"
                            ? softwareIssues
                            : complaintAboutValue ===
                              "Findersforce subscription plan"
                            ? subscriptionIssues
                            : otherIssue
                    }
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
                        For our investigation, provide as much information as
                        possible.
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
                        onClick={() => handleSubmit()}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading.." : "Log complaint"}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ComplaintModal
