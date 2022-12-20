import { Modal } from "@mantine/core"
import FormikControls from "../../../components/Form/FormControls/form-controls"
import { Dispatch, SetStateAction } from "react"
import { object, string } from "yup"
import { Form, Formik } from "formik"
import Button from "../../../components/Core/Buttons/Button"
import { FcCancel } from "react-icons/fc"

export interface DeactivateUserProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
}

const DeactivateUser = ({
    opened,
    setOpened,
    isLoading,
}: DeactivateUserProps) => {
    const complaintIssues = [
        "Violence",
        "Foul Language",
        "Verbal Abuse",
        "Bullying",
        "Rude",
        "Unsupporting/Unhelpful",
        "Inappropriate Behaviour",
        "Disrespectful",
        "Equipment/Paperwork",
        "Messy/Dirty",
        "Not Working/Broken",
        "Unclear/Vague",
        " Unsuitable/Outdated",
    ]
    return (
        <div>
            <Modal
                opened={opened}
                withCloseButton={false}
                onClose={() => setOpened(false)}
                size="xl"
                centered
            >
                <div className=" items-center p-3">
                    <h1 className="text-2xl mb-2 md:mb-0 md:text-3xl font-bold">
                        Deactivate user
                    </h1>
                    <p className="text-black-60 text-2md font-normal">
                        Provide reasons for deactivating this user
                    </p>
                </div>

                <div className=" p-3">
                    <Formik
                        initialValues={{
                            banReason: "",
                            more_info: "",
                        }}
                        validationSchema={object().shape({
                            banReason: string().required("Required"),
                            more_info: string().required("Required"),
                        })}
                        onSubmit={(values) => {
                            // mutateInvite({
                            //     invitedRole: values.invitedRole,
                            //     email: emails,
                            //     regionAddress: data?.location,
                            //     companyId: data?.company?._id,
                            // })
                        }}
                    >
                        {({ errors, values }) => (
                            <Form className="space-y-6">
                                <div className="mt-4 ">
                                    <label
                                        htmlFor="emailAddress"
                                        className="text-md md:text-3md mb-2 block text-3md font-semibold"
                                    >
                                        Reason
                                    </label>
                                    <FormikControls
                                        control="select"
                                        name="banReason"
                                        aria-label="Reason"
                                        type="select"
                                        className="rounded text-black-50"
                                        data-testid="banReason"
                                        defaultValue={values?.banReason}
                                    >
                                        <option>Select an option---</option>
                                        {complaintIssues?.map((item) => (
                                            <option key={item} value={item}>
                                                {" "}
                                                {item}{" "}
                                            </option>
                                        ))}
                                    </FormikControls>
                                </div>
                                <div className="mt-5 ">
                                    <label
                                        htmlFor="emailAddress"
                                        className="text-md md:text-3md mb-2 block text-3md font-semibold"
                                    >
                                        More information
                                    </label>
                                    <FormikControls
                                        control="textarea"
                                        name="more_info"
                                        aria-label=" More information"
                                        type="textarea"
                                        className="rounded text-black-50"
                                        data-testid="more_info"
                                        aria-rowspan={30}
                                    />
                                </div>
                                <div className="flex justify-end mt-10 md:flex-row flex-col">
                                    <Button
                                        variant="clear"
                                        onClick={() => {
                                            setOpened(false)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="warning"
                                        // type="submit"
                                        disabled={isLoading}
                                        className="text-red-100 text-sm"
                                        iconLeft={<FcCancel size={20} />}
                                    >
                                        {isLoading
                                            ? "Deactivating..."
                                            : "Deactivate"}
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

export default DeactivateUser
