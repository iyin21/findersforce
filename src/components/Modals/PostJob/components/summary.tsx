import dayjs from "dayjs"
import { useFormikContext } from "formik"

const Summary = () => {
    const { values } = useFormikContext<{
        description: string
        location: string
        shift_mode: string
        shift_type: string
        date: string
        from: string
        to: string
        required_qualification: string
        num_of_operatives: string
        hourly_pay: string
        other_qualification: string
    }>()

    return (
        <div className="p-3">
            <div className="grid gap-y-6 grid-cols-2 md:py-4 md:px-2  grid-rows-2  mt-6 md:mt-0">
                <h6 className="text-black-90 text-2md">Shift Type</h6>
                <p className="text-lg font-semibold text-black-90">
                    {values.shift_type}
                </p>
                <h6 className="text-black-90 text-2md">Location</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {values.location}
                </p>
                <h6 className="text-black-90 text-2md">Shift Mode</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {values.shift_mode}
                </p>
                <h6 className="text-black-90 text-2md">Date</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {dayjs(values.date).format("MMMM D, YYYY")}
                </p>
                <h6 className="text-black-90 text-2md">Time</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {dayjs(values.from).format("h:mm A")} -{" "}
                    {dayjs(values.to).format("h:mm A")}
                </p>
                <h6 className="text-black-90 text-2md">Hourly Pay</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    ${values.hourly_pay}/hour
                </p>
                <h6 className="text-black-90 text-2md">
                    No. of operatives required
                </h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {values.num_of_operatives}
                </p>
                <h6 className="text-black-90 text-2md">
                    Required Qualification
                </h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {values.required_qualification}
                </p>
                <h6 className="text-black-90 text-2md">Others</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {values.other_qualification}
                </p>
            </div>
            <div className="bg-yellow-20 p-2 md:px-6 md:py-4 rounded-2xl h-full">
                <h6 className="text-black-40 text-2md">DESCRIPTION</h6>
                <p className="text-black-90 capitalize">{values.description}</p>
            </div>
        </div>
    )
}

export default Summary
