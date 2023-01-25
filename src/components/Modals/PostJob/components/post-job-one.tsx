import FormikControls from "../../../../components/Form/FormControls/form-controls"
import DatePickers from "../../../../components/DatePicker"
import Radio from "../../../../components/Core/Radio/radio"
import { useFormikContext } from "formik"
import { JobBoardByIdResponse } from "../../../../types/job-board/interface"
import { FiClock } from "react-icons/fi"
import GoogleAutoComplete from "../../../../components/GoogleAutoComplete"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"

interface PostJobOneProps {
    jobType: JobBoardByIdResponse[] | undefined
}

const PostJobOne = ({ jobType }: PostJobOneProps) => {
    // this updates the formik values in PostJob.tsx
    const { setFieldValue, values } = useFormikContext<{
        jobMeetingPoint: string
        shiftStartTime: Date
        jobDate: string
        jobTypeId: string
        shiftDurationInHours: string
    }>()
    const [startDate, setStartDate] = useState(new Date())
    const [minutes, setMinutes] = useState(0)

    // this handles the job date and updates it's formik value
    const handleUpdateDate = (date: any) => {
        setFieldValue("jobDate", date)
    }
    // this handles the job start time and updates it's formik value
    const handleUpdateFromTime = (time: Date | null) => {
        setFieldValue("shiftStartTime", time)
    }

    // this handles the job duration and updates it's formik value
    const handleUpdateToTime = (time: Date | null) => {
        const duration = Math.abs(
            // @ts-ignore
            new Date(values.shiftStartTime).getTime() - new Date(time).getTime()
        )
        const hours = Math.floor(duration / 1000 / 60 / 60)
        const minutes = Math.floor(
            (duration % (1000 * 60 * 60)) / (1000 * 60 + 1)
        )

        const fixedMinutes = (minutes / 60).toFixed(1)
        const fixedHours = hours + Number(fixedMinutes)
        setFieldValue("shiftDurationInHours", fixedHours.toString())
        setMinutes(minutes)
    }

    // this sets the meeting point for the depot
    const handleChecked = (value: string) => {
        setFieldValue("jobMeetingPoint", value)
    }

    // this gets the time difference between the start and end time
    const shiftTime = new Date(values?.shiftStartTime)
    const jobTime = new Date(shiftTime)
    const toTime = Number(values.shiftDurationInHours)

    jobTime.setHours(jobTime.getHours() + toTime)
    jobTime.setMinutes(jobTime.getMinutes() + minutes)

    return (
        <div className="p-3 font-creato">
            <div className="mt-1">
                <label className="text-3md font-semibold text-black-100 block mb-2">
                    Task type
                </label>
                <FormikControls
                    control="select"
                    name="jobTypeId"
                    aria-label="Shift type"
                    type="select"
                    className="rounded text-black-50"
                    data-testid="jobTypeId"
                    defaultValue={values?.jobTypeId}
                >
                    <option>Select an option---</option>
                    {jobType?.map((item) => (
                        <option key={item?._id} value={item?.name}>
                            {" "}
                            {item?.name}{" "}
                        </option>
                    ))}
                </FormikControls>
            </div>

            <div className="mt-3">
                <GoogleAutoComplete fieldName="jobAddress" />
            </div>
            <div className="mt-4 border-b border-black-10 pb-4 mb-5">
                <label className="text-3md font-semibold text-neutral-80 block mb-2">
                    Select Shift Type
                </label>
                <div className="flex items-center gap-10 mt-4">
                    {" "}
                    <Radio
                        label="Meet Onsite"
                        id="meet_onsite"
                        name="jobMeetingPoint"
                        checked={
                            values?.jobMeetingPoint === "SITE" ? true : false
                        }
                        onChange={() => handleChecked("SITE")}
                        value={values?.jobMeetingPoint}
                    />
                    <Radio
                        label="Depot First"
                        id="depot_first"
                        name="jobMeetingPoint"
                        checked={
                            values?.jobMeetingPoint === "DEPOT" ? true : false
                        }
                        onChange={() => handleChecked("DEPOT")}
                        value={values.jobMeetingPoint}
                    />
                </div>
            </div>
            <div className="mt-3">
                <label className="text-3md font-semibold text-neutral-80 block mb-2">
                    Select Date
                </label>
                <DatePickers
                    onChange={handleUpdateDate}
                    placeholder="DD-MM-YY"
                    name="jobDate"
                    defaultValue={
                        values?.jobDate ? new Date(values?.jobDate) : undefined
                    }
                />
            </div>

            <div className="grid grid-cols-2 gap-6 justify-between mt-4">
                <div className="">
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        Start
                    </label>

                    <DatePicker
                        onChange={(date) => handleUpdateFromTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        // @ts-ignore
                        selected={
                            values?.shiftStartTime
                                ? new Date(values?.shiftStartTime)
                                : null
                        }
                        timeCaption="Time"
                        // timeIntervals={15}
                        dateFormat="h:mm aa"
                        className="p-3 rounded border border-black-10 w-full"
                        placeholderText="Select time"
                    />
                </div>
                <div className="">
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        Finish
                    </label>
                    <DatePicker
                        onChange={(date: Date) => {
                            setStartDate(date)
                            handleUpdateToTime(date)
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        // @ts-ignore
                        selected={
                            values?.shiftStartTime
                                ? new Date(jobTime) || startDate
                                : null
                        }
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        // timeIntervals={15}
                        className="p-3 rounded border border-black-10 w-full"
                        placeholderText="Select time"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4 px-2 p-4 rounded-md bg-green-10 border-l-4 border-green-100">
                <FiClock color="#4DB25D" size={20} />
                <p className=" text-sm md:text-lg">
                    This shift will last for{" "}
                    <strong>
                        {toTime} hour(s)
                        {/* {minutes} minutes */}
                    </strong>{" "}
                </p>
            </div>
        </div>
    )
}

export default PostJobOne
