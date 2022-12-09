import { Modal } from "@mantine/core"
import { Form, Formik } from "formik"
import { Dispatch, SetStateAction, useState } from "react"
import { IoClose } from "react-icons/io5"
import { object, string } from "yup"
import Button from "../../../components/Core/Buttons/Button"
import { ReactMultiEmail } from "react-multi-email"
import "react-multi-email/dist/style.css"

import { useProfile } from "../../../hooks/profile/use-profile"
import GoogleAutoComplete from "../../../components/GoogleAutoComplete"
import RadioButton from "../../../components/Core/Radio/radio"

export interface AddUserInterface {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    isInviting: boolean
    mutateInvite: any
}

const HQAddUser = ({
    opened,
    setOpened,
    isInviting,
    mutateInvite,
}: AddUserInterface) => {
    const [emails, setEmails] = useState<string[]>([])

    const { data } = useProfile()

    return (
        <div>
            {" "}
            <Modal
                opened={opened}
                withCloseButton={false}
                onClose={() => setOpened(false)}
                size="lg"
                centered
            >
                <div className="flex justify-between items-center p-3">
                    <div>
                        <h1 className="text-2xl mb-2 md:mb-0 md:text-3xl font-bold">
                            Add Roles to your Depot
                        </h1>
                        <p className="text-black-60 text-2md font-normal">
                            Delegate administrative right to this users across
                            your business location
                        </p>
                    </div>
                    <IoClose size={30} onClick={() => setOpened(false)} />
                </div>
                <div className=" p-3">
                    <Formik
                        initialValues={{
                            invitedRole: "",
                            email: emails,
                            regionAddress: "",
                        }}
                        validationSchema={object().shape({
                            invitedRole: string().required("Required"),
                        })}
                        onSubmit={(values) => {
                            mutateInvite({
                                invitedRole: values.invitedRole,
                                email: emails,
                                regionAddress: values.regionAddress,
                                companyId: data?.company?._id,
                            })
                        }}
                    >
                        {({ errors, setFieldValue, values }) => (
                            <Form className="">
                                <GoogleAutoComplete fieldName="regionAddress" />

                                <div className="mt-10">
                                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                                        Select user type to add
                                    </label>
                                    <div className="flex  flex-col md:flex-row md:items-center md:gap-10 mt-4 mb-4">
                                        <RadioButton
                                            label="Regional Manager"
                                            id="regional_manger"
                                            name="invitedRole"
                                            checked={
                                                values?.invitedRole ===
                                                "REGIONAL-MANAGER"
                                                    ? true
                                                    : false
                                            }
                                            onChange={() => {
                                                {
                                                    setFieldValue(
                                                        "invitedRole",
                                                        "REGIONAL-MANAGER"
                                                    )
                                                }
                                            }}
                                            value={values.invitedRole}
                                        />
                                        <RadioButton
                                            label="Shift Manager"
                                            id="shift_manager"
                                            name="invitedRole"
                                            checked={
                                                values?.invitedRole ===
                                                "SHIFT-MANAGER"
                                                    ? true
                                                    : false
                                            }
                                            onChange={() =>
                                                setFieldValue(
                                                    "invitedRole",
                                                    "SHIFT-MANAGER"
                                                )
                                            }
                                            value={values?.invitedRole}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2">
                                        <label className="text-3md font-semibold text-neutral-80 block">
                                            Send Invite (s) by Email
                                        </label>
                                        <span className="text-md text-black-40">
                                            Separate email addresses with a
                                            comma.
                                        </span>
                                    </div>

                                    <ReactMultiEmail
                                        placeholder="Input your email"
                                        emails={emails}
                                        onChange={(_emails: string[]) => {
                                            setEmails(_emails)
                                            setFieldValue("email", _emails)
                                        }}
                                        getLabel={(
                                            email,
                                            index,
                                            removeEmail
                                        ) => {
                                            return (
                                                <div data-tag key={index}>
                                                    <div data-tag-item>
                                                        {email}
                                                    </div>
                                                    <span
                                                        data-tag-handle
                                                        onClick={() =>
                                                            removeEmail(index)
                                                        }
                                                    >
                                                        ×
                                                    </span>
                                                </div>
                                            )
                                        }}
                                    />

                                    {errors?.email && (
                                        <div className="flex items-center gap-2 mt-4 px-2 md:p-4 rounded-md bg-red-10 border-l-4 border-red-100">
                                            <p className=" text-sm md:text-lg">
                                                Please insert an email
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end mt-10">
                                    <Button
                                        variant="clear"
                                        onClick={() => {
                                            setOpened(false)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={isInviting}
                                        style={{
                                            backgroundColor:
                                                "rgba(254, 215, 10, 1)",
                                        }}
                                    >
                                        {isInviting
                                            ? "Adding user..."
                                            : "Add user"}
                                        {/* Add user */}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    )
}

export default HQAddUser
