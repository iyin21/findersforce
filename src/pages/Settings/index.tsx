import Layout from "../../components/Layout/index"
import {
    Alert,
    Divider,
    Modal,
    PasswordInput,
    Switch,
    Tabs,
    TextInput,
} from "@mantine/core"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import InputText from "./components/textInput"
import { useProfile } from "../../hooks/profile/use-profile"
import userDp from "../../assets/images/user-dp.png"
import { FaChevronRight } from "react-icons/fa"
import CancelIcon from "../../assets/cancel.svg"
import Button from "../../components/Core/Buttons/Button"
import { useForm } from "@mantine/form"
import useUpdatePassword from "../../hooks/settings/change-password-hook"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../pages/auth/context/authContext"
import useAxiosInstance from "../../services/useAxiosInstance"
import OtpContainer from "../../components/OtpContainer/otp-container"
import useDisableTwoFactor from "../../hooks/settings/disable2fa-hook"
import useEnableTwoFactor from "../../hooks/settings/enable2fa-hook"
import useDisable2FaRequest from "../../hooks/settings/disable-otp-request-hook"
import { BsCameraFill } from "react-icons/bs"
import useProfileImageUpload from "../../hooks/settings/upload-profile-image"

const inputStyle: {} = {
    input: {
        border: "1px solid rgba(15, 13, 0, 0.1)",
        height: "56px",
        marginBottom: "27px",
        borderRadius: "10px",
        display: "flex",
        padding: "23px",
        alignItems: "center",
    },
    label: {
        color: "#0F0D00",
        fontSize: "16px",
        fontWeight: "700",
    },
}

const passwordStyle: {} = {
    input: {
        border: "1px solid rgba(15, 13, 0, 0.1)",
        height: "56px",
        marginBottom: "27px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
    },
    innerInput: {
        marginTop: "5px",
        padding: "23px",
    },
    label: {
        color: "#0F0D00",
        fontSize: "16px",
        fontWeight: 700,
    },
}

const Settings = () => {
    const { data } = useProfile()
    const [checked, setChecked] = useState(data?.twoFa_enabled ?? false)
    const [activeTab, setActiveTab] = useState<string | null>("general")
    const [openModal, setOpenModal] = useState(false)
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [error, showError] = useState(false)
    const navigate = useNavigate()
    const [isPublishing, setIsPublishing] = useState(false)
    const { state } = useAuthContext()
    const protectedAxios = useAxiosInstance()
    const fileInputRef = useRef<HTMLInputElement>(null)
    // const [pictureName, setPictureName] = useState("")

    useEffect(() => {
        if (data) setChecked(data?.twoFa_enabled ?? false)
    }, [])

    const { mutate } = useProfileImageUpload()

    const handleProfilePictureUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            // setPictureName(file.name)
            mutate({ file: file })
        }
    }

    const updatePasswordForm = useForm({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },

        validate: {
            confirmPassword: (value, values) =>
                value !== values.newPassword ? (
                    <span className="text-[12px]">Passwords did not match</span>
                ) : null,
        },
    })

    const handleUpdatePassword = ({
        currentPassword,
        newPassword,
    }: {
        currentPassword: string
        newPassword: string
    }) => {
        setIsSubmitting(true)
        useUpdatePassword(
            currentPassword,
            newPassword,
            setErrorMsg,
            showError,
            setIsSubmitting,
            navigate,
            state.jwt?.token ?? " ",
            setOpenModal,
            protectedAxios
        )
    }

    const handleDisable2fa = (values: any) => {
        setIsPublishing(true)
        useDisableTwoFactor(
            Object.values(values).join(""),
            setIsPublishing,
            state.jwt?.token ?? " ",
            protectedAxios,
            setChecked
        )
    }

    const handleSwitch = () => {
        if (checked === false) {
            useEnableTwoFactor(
                protectedAxios,
                state.jwt?.token ?? " ",
                setChecked
            )
        } else {
            useDisable2FaRequest(state.jwt?.token, protectedAxios, setOpen)
        }
    }

    return (
        <Layout pageTitle={"Settings"}>
            <div className="pt-10 px-10 pb-36">
                <div>
                    <h5 className="font-bold lg:text-3xl text-2xl mb-2">
                        Settings
                    </h5>
                    <p className="text-black-60">
                        This is a subtext describing what users can see here
                    </p>
                </div>
                <Tabs
                    color="yellow"
                    className="pt-7"
                    value={activeTab}
                    onTabChange={setActiveTab}
                    data-testid="general_settings_tabs"
                >
                    <Tabs.List>
                        <Tabs.Tab value="general">
                            <p
                                className={
                                    activeTab === "general"
                                        ? "text-black-100 text-lg font-creatoMedium active"
                                        : "font-creatoMedium text-black-40 text-lg inactive"
                                }
                            >
                                General Information
                            </p>
                        </Tabs.Tab>
                        <Tabs.Tab value="settings">
                            <p
                                id="settings"
                                className={
                                    activeTab === "settings"
                                        ? "text-black-100 text-lg font-creatoMedium active"
                                        : `font-creatoMedium text-black-40 text-lg inactive`
                                }
                            >
                                Settings
                            </p>
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="general" pt="xs">
                        <div className="flex flex-col items-center pt-9">
                            <InputText
                                label="First Name"
                                value={data?.firstName ?? " "}
                            />
                            <InputText
                                label="Last Name"
                                value={data?.lastName ?? " "}
                            />
                            <InputText
                                label="Company Name"
                                value={data?.companyName ?? " "}
                            />
                            <InputText
                                label="Email"
                                value={data?.email ?? " "}
                            />
                            <div className="flex justify-between w-[500px]">
                                <h5 className="text-2lg font-medium font-creatoMedium">
                                    Profile Image
                                </h5>
                            </div>
                            <input
                                data-testid="file-upload"
                                ref={fileInputRef}
                                type="file"
                                hidden
                                onChange={handleProfilePictureUpload}
                            />
                            <div className="flex justify-between w-[500px] pt-4 relative">
                                <div className="absolute bottom-[18px] left-[100px] z-10 bg-white-100 border-[1px] border-black-100 border-solid rounded-full p-2">
                                    <BsCameraFill
                                        size={22}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    />
                                </div>
                                {data?.profileImageUrl === null ? (
                                    <img
                                        src={userDp}
                                        alt="user dp"
                                        width={122}
                                        height={122}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <img
                                        src={data?.profileImageUrl}
                                        alt="user dp"
                                        width={122}
                                        height={122}
                                        className="rounded-full"
                                    />
                                )}
                            </div>
                            {/* <div>
                                <span className="text-black-100 text-md">
                                    {pictureName
                                        ? pictureName + " selected"
                                        : "JPEG, PNG accepted; 10MB max file size"}
                                </span>
                            </div> */}
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="settings" pt="xs">
                        <div className="flex flex-col items-center pt-9">
                            <div className="flex justify-between w-[550px] items-center">
                                <span className="text-lg font-bold font-creatoMedium">
                                    Change Password
                                </span>
                                <FaChevronRight
                                    className="cursor-pointer"
                                    data-testid="change_password_btn"
                                    onClick={() => setOpenModal(true)}
                                />
                            </div>
                            <Divider size={1} className="w-[550px] my-7" />
                            <div className="flex justify-between w-[550px]">
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg font-creatoMedium">
                                        Two Factor Authentication
                                    </span>
                                    <span className="w-[400px] font-creatoMedium text-3sm text-black-90 leading-4">
                                        Helps protect your account from
                                        unauthorized access by adding a second
                                        authentication method in addition to
                                        your password.
                                    </span>
                                </div>
                                <Switch
                                    checked={checked}
                                    color="green"
                                    size="md"
                                    onChange={handleSwitch}
                                />
                            </div>
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
            <Modal
                opened={open}
                withCloseButton
                closeOnClickOutside
                overlayOpacity={0.55}
                overlayBlur={3}
                closeOnEscape={false}
                centered
                onClose={() => setOpen(!open)}
                title="Verify it's you"
                styles={() => ({
                    title: {
                        fontWeight: 800,
                        fontSize: "32px",
                        lineHeight: "38px",
                    },
                    close: {
                        color: "black",
                    },
                    header: {
                        padding: "20px",
                    },
                    body: {
                        padding: "0 20px 20px 20px",
                    },
                })}
            >
                <div>
                    <span className="text-black-60 text-lg">
                        We???ve sent an OTP to the email attached to this account{" "}
                    </span>
                    <p className="pt-9 pb-3 font-bold text-2md">
                        Enter 5 digit OTP
                    </p>
                    <OtpContainer
                        handleSubmit={handleDisable2fa}
                        text="Disable 2fa"
                        isSubmitting={isPublishing}
                    />
                </div>
            </Modal>
            <Modal
                opened={openModal}
                centered
                withCloseButton={false}
                onClose={() => setOpenModal(!openModal)}
                closeOnClickOutside={false}
                closeOnEscape={false}
                overlayOpacity={0.55}
                overlayBlur={3}
                styles={() => ({
                    modal: {
                        width: "550px",
                    },
                    body: {
                        padding: "20px",
                    },
                })}
            >
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className="font-extrabold font-creato text-3xl leading-9">
                            Change Password
                        </h3>
                        <img
                            className="cursor-pointer"
                            src={CancelIcon}
                            alt="cancel icon"
                            onClick={() => setOpenModal((state) => !state)}
                        />
                    </div>
                    <form
                        className="pt-5"
                        onSubmit={updatePasswordForm.onSubmit((values) =>
                            handleUpdatePassword(values)
                        )}
                    >
                        <TextInput
                            label="Enter Current Password"
                            placeholder="current password"
                            required
                            withAsterisk
                            id="current password"
                            styles={() => inputStyle}
                            {...updatePasswordForm.getInputProps(
                                "currentPassword"
                            )}
                            onFocusCapture={() => showError(false)}
                        />
                        <PasswordInput
                            label="Enter New Password"
                            placeholder="new password"
                            required
                            withAsterisk
                            id="new password"
                            styles={() => passwordStyle}
                            {...updatePasswordForm.getInputProps("newPassword")}
                            onFocusCapture={() => showError(false)}
                        />
                        <PasswordInput
                            label="Confirm New Password"
                            placeholder="new password"
                            required
                            withAsterisk
                            id="new password"
                            styles={() => passwordStyle}
                            {...updatePasswordForm.getInputProps(
                                "confirmPassword"
                            )}
                            onFocusCapture={() => showError(false)}
                        />
                        {error && (
                            <Alert
                                id="alert"
                                title="Error!"
                                color="red"
                                styles={() => ({
                                    root: { marginBottom: "20px" },
                                })}
                            >
                                {errorMsg}
                            </Alert>
                        )}
                        <Button
                            variant="primary"
                            type="submit"
                            style={
                                !isSubmitting
                                    ? {
                                          backgroundColor:
                                              "rgba(254, 215, 10, 1)",
                                      }
                                    : {
                                          backgroundColor:
                                              "rgba(254, 215, 10, 1)",
                                          opacity: "0.7",
                                      }
                            }
                            className="text-black-100 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                        >
                            {!isSubmitting ? "Change Passsword" : "Loading..."}
                        </Button>
                    </form>
                </div>
            </Modal>
        </Layout>
    )
}

export default Settings
