import { Modal } from "@mantine/core"
import { Form, Formik } from "formik"
import { Dispatch, SetStateAction, useState } from "react"
import { IoClose } from "react-icons/io5"
import { object, string } from "yup"
import Button from "../../../components/Core/Buttons/Button"
import TagsInput from "react-tagsinput"

import "react-tagsinput/react-tagsinput.css"
import { useProfile } from "../../../hooks/profile/use-profile"
import { useInviteShiftManger } from "../../../hooks/roles/use-roles"

export interface AddUserInterface {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
}

const AddUser = ({ opened, setOpened }: AddUserInterface) => {
    const [email, setEmail] = useState<any[]>([])
    const handleEmailChange = (tags: any[]) => {
        setEmail(tags)
    }

    const { data } = useProfile()

    const { mutate, isLoading } = useInviteShiftManger()

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
                            Add Shift Manager(s)
                        </h1>
                        <p className="text-black-60 text-2md font-normal">
                            Add shift managers to {data?.location}
                        </p>
                    </div>
                    <IoClose size={30} onClick={() => setOpened(false)} />
                </div>
                <div className=" p-3">
                    <Formik
                        initialValues={{
                            invitedRole: "SHIFT-MANAGER",
                            email: email,
                        }}
                        validationSchema={object().shape({
                            invitedRole: string().required("Required"),
                        })}
                        onSubmit={(values) => {
                            mutate({
                                invitedRole: values.invitedRole,
                                email: email,
                            })
                        }}
                    >
                        {({ isSubmitting, errors, setFieldValue }) => (
                            <Form className="space-y-6">
                                <div>
                                    <label className="text-3md font-semibold mb-3 text-neutral-80 block">
                                        Email
                                    </label>

                                    <TagsInput
                                        value={email}
                                        onChange={(tags) => {
                                            handleEmailChange(tags)
                                            setFieldValue("email", tags)
                                        }}
                                        inputProps={{
                                            placeholder: "Email address",
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
                                        disabled={isLoading}
                                    >
                                        {isLoading
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

export default AddUser
