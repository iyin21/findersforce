import FormikControls from "../../../../components/Form/FormControls/form-controls"
import DatePicker from "../../../../components/DatePicker"
import TimePicker from "../../../../components/TimePicker"
import { MdLocationPin } from "react-icons/md"
import Radio from "../../../../components/Core/Radio/radio"
import { useFormikContext } from "formik"
import { JobBoardByIdResponse } from "../../../../hooks/job-board/interface"
import { FiClock } from "react-icons/fi"

interface PostJobOneProps {
    jobType: JobBoardByIdResponse[] | undefined
}

const PostJobOne = ({ jobType }: PostJobOneProps) => {
    const { setFieldValue, values } = useFormikContext<{
        jobMeetingPoint: string
        shiftStartTime: string
        jobDate: string
        jobTypeId: string
        shiftDurationInHours: string
    }>()

    const handleUpdateDate = (date: any) => {
        setFieldValue("jobDate", date)
    }
    const handleUpdateFromTime = (time: any) => {
        setFieldValue("shiftStartTime", time)
    }
    const handleUpdateToTime = (time: any) => {
        const duration = Math.abs(
            new Date(values.shiftStartTime).getTime() - new Date(time).getTime()
        )
        const hours = Math.floor(duration / 1000 / 60 / 60)

        setFieldValue("shiftDurationInHours", hours.toString())
    }
    const handleChecked = (value: string) => {
        setFieldValue("jobMeetingPoint", value)
    }

    const shiftTime = new Date(values?.shiftStartTime)
    const jobTime = new Date(shiftTime)
    const toTime = Number(values.shiftDurationInHours)
    jobTime.setHours(jobTime.getHours() + toTime)

    return (
        <div className="p-3">
            <div className="mt-1">
                <label className="text-3md font-semibold text-black-100 block mb-2">
                    Shift type
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
                <label className="text-3md font-semibold text-neutral-80 block mb-2">
                    Location
                </label>
                <FormikControls
                    type="text"
                    name="jobAddress"
                    control="input"
                    placeholder="Start typing-"
                    aria-label="jobAddress"
                    required
                    className="rounded"
                    data-testid="jobAddress"
                    prefixIcon={<MdLocationPin color="#0F0D0080" size={25} />}
                />
            </div>
            <div className="mt-4 border-b border-black-10 pb-4 mb-5">
                <label className="text-3md font-semibold text-neutral-80 block mb-2">
                    Select Shift Mode
                </label>
                <div className="flex items-center gap-10 mt-4">
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
                </div>
            </div>
            <div className="mt-3">
                <label className="text-3md font-semibold text-neutral-80 block mb-2">
                    Select Date
                </label>
                <DatePicker
                    onChange={handleUpdateDate}
                    className="bg-[BiCalendarEvent]"
                    placeholder="DD-MM-YY"
                    name="jobDate"
                    defaultValue={
                        values?.jobDate ? new Date(values?.jobDate) : new Date()
                    }
                />
            </div>

            <div className="grid grid-cols-2 gap-6 justify-between mt-4">
                <div className="">
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        From
                    </label>
                    <TimePicker
                        onChange={handleUpdateFromTime}
                        className="bg-[BiCalendarEvent]"
                        name="shiftStartTime"
                        format="12"
                        value={
                            values?.shiftStartTime
                                ? new Date(values?.shiftStartTime)
                                : new Date()
                        }
                    />
                </div>
                <div className="">
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        To
                    </label>
                    <TimePicker
                        onChange={handleUpdateToTime}
                        className="bg-[BiCalendarEvent]"
                        name="shiftDurationInHours"
                        format="12"
                        value={
                            values?.shiftDurationInHours
                                ? new Date(jobTime)
                                : new Date()
                        }
                    />
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4 px-2 md:p-4 rounded-md bg-green-10 border-l-4 border-green-100">
                <FiClock color="#4DB25D" size={20} />
                <p className=" text-sm md:text-lg">
                    This shift will last for <strong>{toTime} hours</strong>{" "}
                </p>
            </div>
        </div>
    )
}

export default PostJobOne
