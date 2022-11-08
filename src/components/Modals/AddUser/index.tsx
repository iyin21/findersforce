import { Modal } from "@mantine/core"
import { Form, Formik } from "formik"
import { Dispatch, SetStateAction } from "react"
import { IoClose } from "react-icons/io5"
import FormikControls from "../../../components/Form/FormControls/form-controls"
import { object, string } from "yup"
import GoogleAutoComplete from "../../../components/GoogleAutoComplete"
import Button from "../../../components/Core/Buttons/Button"

export interface AddUserInterface {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
}

const AddUser = ({ opened, setOpened }: AddUserInterface) => {
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
                        <h1 className="text-3xl font-bold">Add a user</h1>
                        <p className="text-black-60 text-2md font-normal">
                            This is a subtext describing what users can see here
                        </p>
                    </div>
                    <IoClose size={30} onClick={() => setOpened(false)} />
                </div>
                <div className="mt-6 p-3">
                    <Formik
                        initialValues={{
                            invitedRole: "SHIFT-MANAGER",
                            address: "",
                            email: "",
                        }}
                        validationSchema={object().shape({
                            invitedRole: string().required("Required"),
                            address: string().required("Required"),
                            email: string().required("Required"),
                        })}
                        onSubmit={(values) => {
                            // mutate({
                            //     email: values.email,
                            // })
                        }}
                    >
                        {({ isSubmitting, values }) => (
                            <Form className="space-y-6">
                                <div>
                                    <label className="text-3md font-semibold mb-3 text-neutral-80 block">
                                        Role
                                    </label>
                                    <FormikControls
                                        data-testid="invitedRole"
                                        id="invitedRole"
                                        control="input"
                                        name="invitedRole"
                                        type="text"
                                        placeholder="Role"
                                        value={values.invitedRole}
                                        className="rounded-xl"
                                    />
                                </div>
                                <div>
                                    <GoogleAutoComplete fieldName="address" />
                                </div>
                                <div>
                                    <label className="text-3md font-semibold mb-3 text-neutral-80 block">
                                        Email
                                    </label>
                                    <FormikControls
                                        data-testid="email"
                                        id="email"
                                        control="input"
                                        name="email"
                                        type="email"
                                        placeholder="Email address"
                                        value={values.email}
                                        className="rounded-xl"
                                    />
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
                                        // type=""
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
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
