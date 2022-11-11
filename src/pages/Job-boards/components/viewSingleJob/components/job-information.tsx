import dayjs from "dayjs"

interface JobInformationInterface {
    description: string | undefined
    location: string | undefined
    shiftMode: string | undefined
    date: string | undefined
    hourlyPay: number | undefined
    noOfOperativesRequired: number | undefined
    requiredQualification: string | undefined
    currency: string | undefined
    shiftStartTime: string | undefined
    shiftEndTime: string | undefined
    jobType: string | undefined
}

const JobInformation = ({
    date,
    description,
    hourlyPay,
    shiftMode,
    location,
    noOfOperativesRequired,
    requiredQualification,
    jobType,
    currency,
    shiftStartTime,
    shiftEndTime,
}: JobInformationInterface) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between mt-4">
            <div className="md:mr-6">
                <div className="bg-yellow-20 p-4 md:px-6 md:py-10 rounded-2xl h-full">
                    <h6 className="text-black-40 text-2md mb-4">DESCRIPTION</h6>
                    <p className="text-lg text-black-80">{description}</p>
                </div>
            </div>
            <div className="grid gap-y-6 grid-cols-2 md:py-10 md:px-4  grid-rows-2 border-t pt-6 md:border-t-0 md:border-l md:pl-6 border-black-10 mt-6 md:mt-0">
                <h6 className="text-black-40 text-2md">Shift Type</h6>
                <p className="text-lg font-semibold text-black-90">{jobType}</p>
                <h6 className="text-black-40 text-2md">Location</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {location}
                </p>
                <h6 className="text-black-40 text-2md">Shift Mode</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {shiftMode}
                </p>
                <h6 className="text-black-40 text-2md">Date</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {dayjs(date).format(" MMMM DD YYYY")}
                </p>
                <h6 className="text-black-40 text-2md">Time</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {dayjs(shiftStartTime).format("hh:mm a")} -{" "}
                    {dayjs(shiftEndTime).format("hh:mm a")}
                </p>
                <h6 className="text-black-40 text-2md">Hourly Pay</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {currency}
                    {hourlyPay}
                </p>
                <h6 className="text-black-40 text-2md">
                    No. of operatives required
                </h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {noOfOperativesRequired}
                </p>
                <h6 className="text-black-40 text-2md">
                    Required Qualification
                </h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {requiredQualification}
                </p>
            </div>
        </div>
    )
}

export default JobInformation
