import { Button } from "../../../components/index"
import { FiPlus } from "react-icons/fi"
import Layout from "../../../components/Layout/index"
import SubscriptionTable from "../components/SubscriptionTable"
import { useState } from "react"
// import {  Group, Modal, TextInput } from "@mantine/core"
// import { useForm } from "@mantine/form"
// import InputText from "../components/TextInput"
// import { FaAngleDown, FaCalendarDay } from "react-icons/fa"
import Sent from "../../../assets/sent.svg"
import { Code, Group, Modal, Select, TextInput } from "@mantine/core"
// import DatePickers from "../../../components/DatePicker"
import {
    useGetAdminSubscriptions,
    useGetDepotCompanies,
    useGetDepotRegions,
    useGetSubscriptionPrice,
} from "../../../hooks/subscriptions/useSubscriptions.hooks"
import { useForm } from "@mantine/form"
import { DatePicker, DateRangePicker } from "@mantine/dates"
import { AiFillInfoCircle } from "react-icons/ai"
import { BiCalendarEvent, BiPound } from "react-icons/bi"
import dayjs from "dayjs"
// import useAuthContext from "../../../hooks/auth-hooks/useAuth"
const AdminSubscription = () => {
    const form: any = useForm({
        initialValues: {
            depot: {
                label: "",
                value: ""
            },
            regionId: "",
            totalAmountPaid: 0,
            subscriptionPlan: "",
            space: 0,
            startDate: "",
            endDate: "",
            paymentDate: "",
            paymentMethod: "Bank Transfer",
        },
        transformValues: (values) => ({
            depot: `${values.depot.value}`,
            regionId: `${values.regionId}`,
            subscriptionPlan: `${values.subscriptionPlan}`,
            space: `${values.space}`,
            startDate: `${dayjs(values.startDate).format()}`,
            endDate: `${dayjs(values.endDate).format()}`,
            paymentDate: `${dayjs(values.paymentDate).format()}`,
            paymentMethod: "Bank Transfer",
            totalAmountPaid: `(${values.totalAmountPaid * (dayjs(form.values.endDate).diff(dayjs(form.values.startDate), "month")) }) `
        }),
    })
    const selectedDepot = form.values.depot
    const selectedPlan = form.values.subscriptionPlan
    const [record, setRecord] = useState(false)
    const [confirmRecord, setConfirmRecord] = useState(false)
    const [submittedValues, setSubmittedValues] = useState('');

    const { data: subscriptionData } = useGetAdminSubscriptions({})
    const { data: depotCompanies } = useGetDepotCompanies()
    const { data: depotRegions } = useGetDepotRegions({ id: selectedDepot.value })
    const { data: subscriptionPrices } = useGetSubscriptionPrice()

    // console.log(subscriptionPrices)
    // console.log(depotRegions)
    // const { state } = useAuthContext()
    // console.log(state?.user)
    // console.log(depotCompanies)
    // console.log(subscriptionData)

    const subscriptionPlans = [
        {
            label: "Entry",
            value: {
                name: "Entry",
                price: subscriptionPrices?.subscriptionPrice?.entry,
                space: 0,
            },
        },
        {
            label: "Pro",
            value: {
                name: "Pro",
                price: subscriptionPrices?.subscriptionPrice?.pro,
                space: 1,
            },
        },
        {
            label: "Elite",
            value: {
                name: "Elite",
                price: subscriptionPrices?.subscriptionPrice?.elite,
                space: 3,
            },
        },
        {
            label: "Enterprise",
            value: {
                name: "Enterprise",
                // price: subscriptionPrices?.subscriptionPrice?.enterprise,
                space: 5,
            },
        },
    ]

    let regionAddress: any
    if (depotRegions) {
        regionAddress = depotRegions?.map((item) => {
            return {
                label: item?.address,
                value: item?._id,
            }
        })
    } else {
        // eslint-disable-next-line no-unused-vars
        regionAddress = []
    }

    let depotCompany: any
    if (depotCompanies) {
        depotCompany = depotCompanies?.map((item) => {
            return {
                label: item?.name,
                value: {
                    depotName: item?.name,
                    depotId: item?._id
                },
            }
        })
    } else {
        // eslint-disable-next-line no-unused-vars
        depotCompany = []
    }

    const onUserChange = (e: any) => {
        if (e.price !== undefined) {
            form.setFieldValue("totalAmountPaid", e.price)
        }
        form.setFieldValue("space", e.space)
    }

    const onPeriodChange = (e: any) => {
        form.setFieldValue("startDate", e?.[0])
        form.setFieldValue("endDate", e?.[1])
    }
    const onDepotChange = (e: any) => {
        form.setFieldValue("depot.label", e.depotName)
    }
    // const handleSubmit = () => {
    //     form.onSubmit((values) => console.log(values))
    // }

    // console.log(submittedValues)
    // console.log(form.values)
    // console.log(dayjs(form.values.endDate).diff(dayjs(form.values.startDate), "month"))
    // console.log(subscriptionPrices?.subscriptionPrice?.pro)
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
                    <SubscriptionTable elements={subscriptionData?.results} />
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
                    // styles={() => ({
                    //     modal: {
                    //         width: "450px",
                    //     },
                    // })}
                >
                    <div className="p-6">
                        <form onSubmit={form.onSubmit((values: any) => setSubmittedValues(JSON.stringify(values, null, 2)))}>
                            <header className="mb-4">
                                <p className="font-extrabold text-2xl">
                                    Record subscription
                                </p>
                                <p className="text-black-60 text-2md">
                                    Document all depot subscription payments
                                </p>
                            </header>
                            <div className="my-4">
                                <Select
                                    placeholder={selectedDepot.label}
                                    label="Depot"
                                    data={depotCompany}
                                    {...form.getInputProps("depot.label")}
                                    onChange={(e: any) => {
                                        onDepotChange(e)
                                        form.getInputProps(
                                            "depot.value"
                                        ).onChange(e?.depotId)
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <Select
                                    placeholder="All Regions"
                                    label="Location"
                                    data={regionAddress}
                                    {...form.getInputProps("regionId")}
                                />
                                <AiFillInfoCircle
                                    size={15}
                                    className="my-2 inline mr-1"
                                />
                                <span className="text-sm">
                                    Last subscription period:{" "}
                                </span>
                            </div>
                            <div className="my-4">
                                <Select
                                    placeholder={selectedPlan}
                                    label="Subscription Plan"
                                    data={subscriptionPlans}
                                    {...form.getInputProps("subscriptionPlan")}
                                    onChange={(e: any) => {
                                        onUserChange(e)
                                        form.getInputProps(
                                            "subscriptionPlan"
                                        ).onChange(e?.name)
                                    }}
                                />
                                <AiFillInfoCircle
                                    size={15}
                                    className="my-2 inline mr-1"
                                />
                                <span className="text-sm">
                                    You can hire operatives on this plan
                                </span>
                            </div>
                            <div className="my-4">
                                {selectedPlan === "Entry" ? (
                                    <TextInput
                                        placeholder="Subscription Amount"
                                        label="Subscription Amount (Monthly)"
                                        disabled
                                        icon={<BiPound />}
                                        value={
                                            subscriptionPrices
                                                ?.subscriptionPrice?.entry
                                        }
                                    />
                                ) : selectedPlan === "Pro" ? (
                                    <TextInput
                                        placeholder="Subscription Amount"
                                        label="Subscription Amount (Monthly)"
                                        disabled
                                        icon={<BiPound />}
                                        value={
                                            subscriptionPrices
                                                ?.subscriptionPrice?.pro
                                        }
                                    />
                                ) : selectedPlan === "Elite" ? (
                                    <TextInput
                                        placeholder="Subscription Amount"
                                        label="Subscription Amount (Monthly)"
                                        disabled
                                        icon={<BiPound />}
                                        value={
                                            subscriptionPrices
                                                ?.subscriptionPrice?.elite
                                        }
                                    />
                                ) : selectedPlan === "Enterprise" ? (
                                    <TextInput
                                        placeholder="Subscription Amount"
                                        icon={<BiPound />}
                                        label="Subscription Amount (Monthly)"
                                        {...form.getInputProps(
                                            "totalAmountPaid",
                                        )}
                                        // onChange={() => form.setFieldValue('totalAmountPaid', (Number(form.values.totalAmountPaid) * (dayjs(form.values.endDate).diff(dayjs(form.values.startDate), "month"))) )}
                                    />
                                ) : (
                                    <TextInput
                                        placeholder="Subscription Amount"
                                        icon={<BiPound />}
                                        label="Subscription Amount (Monthly)"
                                        disabled
                                    />
                                )}
                            </div>
                            <div className="my-4">
                                <DatePicker
                                    label="Payment Date"
                                    rightSection={<BiCalendarEvent />}
                                    {...form.getInputProps("paymentDate")}
                                />
                            </div>
                            <div className="my-4">
                                <DateRangePicker
                                    label="Subscription Period"
                                    rightSection={<BiCalendarEvent />}
                                    {...form.getInputProps(
                                        "subscriptionPeriod"
                                    )}
                                    onChange={(e) => {
                                        onPeriodChange(e)
                                        form.getInputProps(
                                            "subscriptionPeriod"
                                        ).onChange(e)
                                    }}
                                />
                                <AiFillInfoCircle
                                    size={15}
                                    className="my-2 inline mr-1"
                                />
                                <span className="text-sm">
                                    Total amount to be recieved
                                </span>
                            </div>
                            <Group position="right" mt="md">
                            <Button onClick={() => setRecord(!record)}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                size="small"
                                onClick={() => setConfirmRecord(true)}
                            >
                                Record new subscription
                            </Button>
                        </Group>
                        </form>
                        {submittedValues && <Code block>{submittedValues}</Code>}
                    </div>
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
                            You are about to renew {form.values.depot.label} is subcription
                            of £ {form.values.totalAmountPaid} for {dayjs(form.values.startDate).format("MMM YYYY")} - {dayjs(form.values.endDate).format("MMM YYYY")}
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
                            // onClick={handleSubmit}
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
