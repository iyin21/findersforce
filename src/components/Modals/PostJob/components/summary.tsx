import dayjs from "dayjs"
import { useFormikContext } from "formik"
import { useEffect } from "react"
import {
    useGetJobQualification,
    useGetJobType,
} from "../../../../hooks/job-board/useJobBoard.hooks"

const Summary = () => {
    const { values } = useFormikContext<{
        jobDescription: string
        jobAddress: string
        jobMeetingPoint: string
        jobTypeId: string
        jobDate: string
        shiftStartTime: string
        shiftDurationInHours: string
        jobQualificationId: string
        numberOfOpsRequired: string
    }>()

    const { data: jobType } = useGetJobType()
    const { data: jobQualification } = useGetJobQualification()

    useEffect(() => {}, [jobQualification])

    return (
        <div className="p-3">
            <div className="grid gap-y-6 grid-cols-2 md:py-4 md:px-2  grid-rows-2  mt-6 md:mt-0">
                <h6 className="text-black-90 text-2md">Shift Type</h6>
                <p className="text-lg font-semibold text-black-90">
                    {
                        jobType?.filter(
                            (item) => item?._id === values.jobTypeId
                        )[0]?.name
                    }
                </p>
                <h6 className="text-black-90 text-2md">Location</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {values.jobAddress}
                </p>
                <h6 className="text-black-90 text-2md">Shift Mode</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {values.jobMeetingPoint}
                </p>
                <h6 className="text-black-90 text-2md">Date</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {dayjs(values.jobDate).format("MMMM D, YYYY")}
                </p>
                <h6 className="text-black-90 text-2md">Time</h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {dayjs(values.shiftStartTime).format("h:mm a")} -{" "}
                    {dayjs(
                        values.shiftStartTime +
                            Number(values.shiftDurationInHours)
                    ).format("h:mm a")}
                </p>

                <h6 className="text-black-90 text-2md">
                    No. of operatives required
                </h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {values.numberOfOpsRequired}
                </p>
                <h6 className="text-black-90 text-2md">
                    Required Qualification
                </h6>
                <p className="text-lg text-black-90 font-semibold ">
                    {
                        jobQualification?.filter(
                            (item) => item?._id === values.jobQualificationId
                        )[0]?.name
                    }
                </p>
            </div>
            <div className="bg-yellow-20 p-2 md:px-6 md:py-4 rounded-2xl h-full">
                <h6 className="text-black-40 text-2md">DESCRIPTION</h6>
                <p className="text-black-90 capitalize">
                    {values.jobDescription}
                </p>
            </div>
        </div>
    )
}

export default Summary