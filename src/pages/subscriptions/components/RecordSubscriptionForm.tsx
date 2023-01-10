import FormikControls from "../../../components/Form/FormControls/form-controls"
import { useState } from "react"
import {
    useGetDepotCompanies,
    useGetDepotRegions,
    useGetSubscriptionPrice,
} from "../../../hooks/subscriptions/useSubscriptions.hooks"
import { Group } from "@mantine/core"
import { Button } from "../../../components/index"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { DateRangePicker } from "@mantine/dates"
import { Field, useFormikContext } from "formik"

const RecordSubscriptionForm = ({values}: {values:any}) => {
    const { setFieldValue } = useFormikContext<{
                depot: string
                regionId: string
                subscriptionPlan: string
                totalAmountPaid: string
                paymentDate: Date | string
                subscriptionPeriod: Date | string
                space: number
    }>()
    const [selectedDepot, setSelectedDepot] = useState<any>()
    const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] =
        useState<any>()
    const [record, setRecord] = useState(false)

    const subscriptionPlans = [
        {
            label: "Entry",
            value: "Entry",
        },
        {
            label: "Pro",
            value: "Pro",
        },
        {
            label: "Elite",
            value: "Elite",
        },
        { label: "Enterprise", value: "Enterprise" },
    ]
    const DatePickerField = ({
        name,
        value,
        onChange,
    }: {
        name: any
        value: any
        onChange: any
    }) => {
        return (
            <DatePicker
                selected={(value && new Date(value)) || null}
                onChange={(val) => {
                    onChange(name, val)
                }}
                className="p-3 rounded border border-black-10 w-full"
                placeholderText="Select Date"
            />
        )
    }
    const DateRangePickerField = ({
        name,
        value,
        onChange,
    }: {
        name: any
        value: any
        onChange: any
    }) => {
        return (
            <DateRangePicker
                onChange={(val) => {
                    onChange(name, val)
                }}
                className="p-3 rounded border border-black-10 w-full"
            />
        )
    }
    const { data: depotCompanies } = useGetDepotCompanies()
    const { data: depotRegions } = useGetDepotRegions({ id: selectedDepot })
    const { data: subscriptionPrices } = useGetSubscriptionPrice()
    return (
        <div>
            <>
                {setSelectedDepot(values.depot)}
                <div>
                    <label htmlFor="depot">Depot</label>
                </div>
                <FormikControls
                    type="text"
                    name="depot"
                    control="select"
                    placeholder=""
                    aria-label="depot"
                    required
                    className="rounded"
                    data-testid="depot"
                >
                    <option value="" disabled>
                        Select Depot
                    </option>
                    {depotCompanies?.map((item) => (
                        <option key={item?._id} value={item?._id}>
                            {item?.name}
                        </option>
                    ))}
                </FormikControls>
            </>
            <div>
                <div>
                    <label htmlFor="depot">Location</label>
                </div>
                <FormikControls
                    type="text"
                    name="regionId"
                    control="select"
                    placeholder=""
                    aria-label="location"
                    required
                    className="rounded"
                    data-testid="locations"
                >
                    <option value="" disabled>
                        Select Location
                    </option>
                    {depotRegions?.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.address}
                        </option>
                    ))}
                </FormikControls>
            </div>
            <>
                {setSelectedSubscriptionPlan(values.subscriptionPlan)}
                <div>
                    <label htmlFor="depot">Subscription Plan</label>
                </div>
                <FormikControls
                    type="text"
                    name="subscriptionPlan"
                    control="select"
                    placeholder=""
                    aria-label="subscriptionPlan"
                    required
                    className="rounded"
                    data-testid="subscriptionPlan"
                >
                    <option value="" disabled>
                        Select Subscription Plan
                    </option>
                    {subscriptionPlans?.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </FormikControls>
            </>
            <div>
                <div>
                    <label htmlFor="depot">Subscription Amount</label>
                </div>
                {selectedSubscriptionPlan === "Entry" ? (
                    <>
                        {setFieldValue(
                            "totalAmountPaid",
                            subscriptionPrices?.subscriptionPrice.entry
                        )}
                        <FormikControls
                            type="text"
                            name="totalAmountPaid"
                            control="input"
                            value={subscriptionPrices?.subscriptionPrice?.entry}
                            aria-label="subscriptionAmount"
                            required
                            className="rounded"
                            data-testid="subscriptionAmount"
                        />
                        <Field
                            name="space"
                            type="hidden"
                            placeholder="Space"
                            className="w-full"
                            aria-label="space"
                            aria-hidden="true"
                        />
                    </>
                ) : selectedSubscriptionPlan === "Pro" ? (
                    <FormikControls
                        type="text"
                        name="totalAmountPaid"
                        control="input"
                        placeholder={subscriptionPrices?.subscriptionPrice?.pro}
                        aria-label="subscriptionAmount"
                        required
                        disabled
                        className="rounded"
                        data-testid="subscriptionAmount"
                    />
                ) : selectedSubscriptionPlan === "Elite" ? (
                    <FormikControls
                        type="text"
                        name="totalAmountPaid"
                        control="input"
                        placeholder={
                            subscriptionPrices?.subscriptionPrice?.elite
                        }
                        aria-label="subscriptionAmount"
                        required
                        disabled
                        className="rounded"
                        data-testid="subscriptionAmount"
                    />
                ) : (
                    <FormikControls
                        type="text"
                        name="totalAmountPaid"
                        control="input"
                        placeholder=""
                        aria-label="subscriptionAmount"
                        required
                        className="rounded"
                        data-testid="subscriptionAmount"
                    />
                )}
            </div>
            <div>
                <div>
                    <label htmlFor="depot">Payment Date</label>
                </div>
                <DatePickerField
                    name="paymentDate"
                    value={values.paymentDate}
                    onChange={setFieldValue}
                />
            </div>
            <div>
                <div>
                    <label htmlFor="depot">Subscription Period</label>
                </div>
                <DateRangePickerField
                    name="subscriptionPeriod"
                    value={values.subscriptionPeriod}
                    onChange={setFieldValue}
                />
            </div>
            <Group position="right" mt="md">
                <Button onClick={() => setRecord(!record)}>Cancel</Button>
                <Button
                    variant="primary"
                    type="submit"
                    style={{
                        backgroundColor: "rgba(254, 215, 10, 1)",
                    }}
                    className="text-black-100 bg-yellow-100 font-bold text-base  text-center py-2 rounded-l rounded-tr-2xl rounded-br"
                >
                    Record new payment
                </Button>
            </Group>
        </div>
    )
}

export default RecordSubscriptionForm
