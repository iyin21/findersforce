interface JobInformationInterface {
    description: string
    shiftType: string
    location: string
    shiftMode: string
    date: string
    time: string
    hourlyPay: string
    noOfOperativesRequired: string
    requiredQualification: string
    others: string
}

const JobInformation = ({
    date,
    description,
    hourlyPay,
    shiftMode,
    location,
    noOfOperativesRequired,
    requiredQualification,
    others,
    time,
    shiftType,
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
                <p className="text-lg font-semibold text-black-90">2-WAY</p>
                <h6 className="text-black-40 text-2md">Location</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {location}
                </p>
                <h6 className="text-black-40 text-2md">Shift Mode</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {shiftMode}
                </p>
                <h6 className="text-black-40 text-2md">Date</h6>
                <p className="text-lg text-black-90 font-semibold ">{date}</p>
                <h6 className="text-black-40 text-2md">Time</h6>
                <p className="text-lg text-black-90 font-semibold ">{time}</p>
                <h6 className="text-black-40 text-2md">Hourly Pay</h6>
                <p className="text-lg text-black-90 font-semibold ">
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
                <h6 className="text-black-40 text-2md">Others</h6>
                <p className="text-lg text-black-90 font-semibold ">{others}</p>
            </div>
        </div>
    )
}

export default JobInformation
