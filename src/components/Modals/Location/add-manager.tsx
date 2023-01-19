import { Alert, Modal, Radio, Select, SelectItem } from "@mantine/core"
import {
    addManagers,
    useGetAllDepotRegions,
} from "../../../hooks/location/depot-hook"
import { useState } from "react"
import CancelIcon from "../../../assets/cancel.svg"
import { ReactMultiEmail } from "react-multi-email"
import useAuthContext from "../../../hooks/auth-hooks/useAuth"

interface prop {
    openModal: boolean
    setOpenModal: any
}
const AddManagerModal = ({ openModal, setOpenModal }: prop) => {
    const [value, setValue] = useState("REGIONAL-MANAGER")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [error, showError] = useState(false)
    const [regionalEmails, setRegionalEmails] = useState<string[]>([])
    const { data } = useGetAllDepotRegions()
    const [managerLocation, setLocation] = useState<string | null>(null)

    const locations = data?.data.map((item) => {
        return item.location.formattedAddress
    })

    const { state } = useAuthContext()

    const locationsDict:
        | (string | SelectItem)[]
        | { value: string; label: string }[] = []
    locations?.forEach((element) => {
        locationsDict.push({
            value: element,
            label: element,
        })
    })

    const handleClick = () => {
        setIsSubmitting(true)
        addManagers(
            regionalEmails,
            state.user?.company._id || "",
            value,
            managerLocation,
            state.jwt?.token || "",
            setOpenModal,
            setIsSubmitting,
            setErrorMsg,
            showError
        )
    }

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
            padding={0}
            size={620}
            styles={() => ({
                modal: {
                    borderRadius: "10px",
                },
                body: {
                    padding: "35px",
                },
            })}
        >
            <div>
                <div className="flex items-center justify-between pb-[25px]">
                    <div>
                        <h3 className="font-extrabold font-creato text-3xl leading-9">
                            Add Managers
                        </h3>
                        <p className="text-black-60 text-lg">
                            Select a location and delegate administrative rights
                            to your managers.
                        </p>
                    </div>

                    <img
                        className="cursor-pointer"
                        src={CancelIcon}
                        width={18}
                        alt="cancel icon"
                        onClick={() => setOpenModal(false)}
                    />
                </div>
                <Select
                    label="Location"
                    placeholder="Select Location"
                    value={managerLocation}
                    onChange={setLocation}
                    data={locationsDict}
                    onFocusCapture={() => {
                        showError(false)
                    }}
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
                <Radio.Group
                    name="managerType"
                    label="Select Access"
                    value={value}
                    onChange={setValue}
                    onFocusCapture={() => {
                        showError(false)
                    }}
                    styles={() => ({
                        label: {
                            fontSize: "15px",
                            fontWeight: 700,
                            paddingTop: "12px",
                        },
                    })}
                >
                    <Radio value="REGIONAL-MANAGER" label="Depot Manager" />
                    <Radio value="SHIFT-MANAGER" label="Shift Manager" />
                </Radio.Group>
                <div
                    className="mt-4"
                    onFocusCapture={() => {
                        showError(false)
                    }}
                >
                    <label className="mb-4 font-bold">Emails</label>
                    <p className="text-black-60 text-[13px] mb-2">Separate email addresses with a comma ( , ).</p>
                    <ReactMultiEmail
                        placeholder="Enter email address"
                        emails={regionalEmails}
                        onChange={(regionalEmails: string[]) => {
                            setRegionalEmails(regionalEmails)
                        }}
                        getLabel={(email, index, removeEmail) => {
                            return (
                                <div data-tag key={index}>
                                    <div data-tag-item>{email}</div>
                                    <span
                                        data-tag-handle
                                        onClick={() => removeEmail(index)}
                                    >
                                        ×
                                    </span>
                                </div>
                            )
                        }}
                        onDisabled={() => {
                            regionalEmails.length <= 2
                        }}
                    />
                </div>

                <div className="flex items-center justify-end pt-6">
                    <span
                        onClick={() => setOpenModal(false)}
                        className="cursor-pointer text-2md font-bold font-creato mr-8"
                    >
                        Cancel
                    </span>
                    <button
                        className="bg-yellow-100 p-3.5 ml-4 flex items-center rounded rounded-tr-2xl font-bold body-medium px-6"
                        onClick={handleClick}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Loading.." : "Add user"}
                    </button>
                </div>
                {error && (
                    <Alert
                        title="Error!"
                        color="red"
                        styles={() => ({
                            root: { marginTop: "20px" },
                        })}
                    >
                        {errorMsg}
                    </Alert>
                )}
            </div>
        </Modal>
    )
}

export default AddManagerModal
