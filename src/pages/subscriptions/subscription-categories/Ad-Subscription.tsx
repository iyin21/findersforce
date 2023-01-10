import { Button } from "../../../components/index"
import { FiPlus } from "react-icons/fi"
import Layout from "../../../components/Layout/index"
import SubscriptionTable from "../components/SubscriptionTable"
import { useState } from "react"
import { Group, Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import InputText from "../components/TextInput"
import { FaAngleDown, FaCalendarDay } from "react-icons/fa"
import Sent from "../../../assets/sent.svg"

const AdminSubscription = () => {
    const form = useForm({
        initialValues: {
            depot: "",
            subscriptionPlan: "",
            subscriptionAmount: "",
            lastPaymentDate: "",
            newPaymentDate: "",
        },
        validate: (values) => ({
            subscriptionPlan:
                values.subscriptionPlan === undefined
                    ? "subscriptionPlan is required"
                    : null,
        }),
    })

    const inputStyle: {} = {
        input: {
            border: "1px solid rgba(15, 13, 0, 0.1)",
            height: "60px",
            width: "400px",
            marginBottom: "18px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            padding: "18px",
            fontSize: "14px",
        },
        label: {
            color: "#0F0D00",
            fontSize: "14px",
            fontWeight: "bolder",
        },
    }

    const [record, setRecord] = useState(false)
    const [confirmRecord, setConfirmRecord] = useState(false)
    return (
        <Layout>
            <main className="md:p-6 p-6 mt-4 md:mt-14">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1
                            className="text-2xl md:text-3xl font-creatoBold text-black-100 font-bold"
                            id="header"
                        >
                            Subscriptions
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            Monthly payment to FindersForce in one glance
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        className="py-3 font-semibold font-creatoMedium"
                        iconLeft={<FiPlus size={20} />}
                        onClick={() => setRecord(true)}
                        data-testid="record_subscription_btn"
                    >
                        Record subscription
                    </Button>
                </div>
                <div className="px-0 pt-10 md:pt-4">
                    <SubscriptionTable
                        elements={new Array(5).fill({
                            depot: "Revive traffic",
                            amount: 1200,
                            contactPerson: "Shaquan Roberts",
                            paymentReference: "PHFF7685RERD-799P8J",
                            monthOf: "OCT 2022",
                            monthPaid: "Nov 15, 2022 | 9:31 AM",
                            id: "1",
                        })}
                    />
                </div>
            </main>

            {record && (
                <Modal
                    centered
                    opened={record}
                    onClose={() => setRecord(false)}
                    closeOnClickOutside={false}
                    withCloseButton={false}
                    overlayOpacity={0.55}
                    overlayBlur={3}
                    padding={0}
                    transition="fade"
                    transitionDuration={600}
                    transitionTimingFunction="ease"
                    styles={() => ({
                        modal: {
                            width: "450px",
                        },
                    })}
                >
                    <header className="p-6">
                        <h1 className="font-creatoBold font-extraBold text-3xl">
                            Record subscription
                        </h1>
                        <p className="font-creato text-[lg] text-black-50">
                            Document all depot subscription plans
                        </p>
                    </header>
                    <section className="px-6 pb-4">
                        <form
                            onSubmit={form.onSubmit(() =>
                                setConfirmRecord(!confirmRecord)
                            )}
                        >
                            <TextInput
                                label="Depot"
                                placeholder="Depot"
                                {...form.getInputProps("depot")}
                                styles={() => inputStyle}
                            />
                            <TextInput
                                mt="sm"
                                label="Subscription Plan"
                                placeholder="Subscription Plan"
                                {...form.getInputProps("subscriptionPlan")}
                                styles={() => inputStyle}
                                component="select"
                                rightSection={<FaAngleDown size={14} />}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </TextInput>
                            <InputText
                                label={"Subscription Amount"}
                                value={""}
                            />
                            <InputText
                                label={"Last Payment Date"}
                                value={""}
                                rightSection={<FaCalendarDay size={14} />}
                            />
                            <TextInput
                                label="New Payment Date"
                                placeholder="New Payment Date"
                                {...form.getInputProps("newPaymentDate")}
                                styles={() => inputStyle}
                                rightSection={<FaCalendarDay size={14} />}
                            />

                            <Group position="right" mt="md">
                                <Button onClick={() => setRecord(!record)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{
                                        backgroundColor:
                                            "rgba(254, 215, 10, 1)",
                                    }}
                                    className="text-black-100 bg-yellow-100 font-bold text-base  text-center py-2 rounded-l rounded-tr-2xl rounded-br"
                                >
                                    Record new payment
                                </Button>
                            </Group>
                        </form>
                    </section>
                </Modal>
            )}

            {confirmRecord && (
                <Modal
                    centered
                    opened={record}
                    onClose={() => setRecord(false)}
                    withCloseButton={false}
                    closeOnClickOutside={false}
                    overlayOpacity={0.55}
                    overlayBlur={3}
                    padding={0}
                    transition="fade"
                    transitionDuration={600}
                    transitionTimingFunction="ease"
                    styles={() => ({
                        modal: {
                            width: "450px",
                        },
                    })}
                >
                    <div className="bg-black-100 md:px-3  py-5 flex items-center justify-center">
                        <img src={Sent} alt="success" />
                    </div>
                    <div className="px-3 py-5">
                        <h3 className="text-xl font-bold text-center mb-3">
                            Are you sure you want to record this subscription?
                        </h3>
                        <p className="text-black-90 text-lg text-center md:mx-auto  px-3 md:px-0">
                            You are about to renew Revive traffic is subcription
                            of £ 1,200 for October 2022
                        </p>
                    </div>

                    <div className="flex justify-between w-1/2 py-5 mx-auto mb-8">
                        <Button
                            onClick={() => setConfirmRecord(!confirmRecord)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="green"
                            className="text-white-100 w-full"
                            size="small"
                        >
                            Record
                        </Button>
                    </div>
                </Modal>
            )}
        </Layout>
    )
}

export default AdminSubscription
