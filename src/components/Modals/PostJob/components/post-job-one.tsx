import FormikControls from "../../../../components/Form/FormControls/form-controls"
import DatePicker from "../../../../components/DatePicker"
import TimePicker from "../../../../components/TimePicker"
import { MdLocationPin } from "react-icons/md"
import Radio from "../../../../components/Core/Radio/radio"
import { useFormikContext } from "formik"

const PostJobOne = () => {
    const { setFieldValue, values } = useFormikContext<{
        shift_mode: string
    }>()

    const shiftType = [
        "2-Way",
        "2 Way (Peds)",
        "3-Way",
        "3-Way (Peds)",
        "4-Way",
        "4-Way (Peds)",
        "5-Way",
        "5-Way (Peds",
        "Road Closure",
        "Rolling Road Closure",
        "Lane Closure",
        "Footpath Closure",
        "Bridge Closure",
        "Contraflow",
        "Hard Shoulder Closure",
        "Stop and Go",
        "Hedge Cutting",
        "Tree Cutting",
        "Weed Spraying",
        "Pothole Repairs",
        "Jetting Sewers",
        "Streetlight Maintenance",
        "Telephone Line Maintenance",
    ]
    const handleUpdateDate = (date: any) => {
        setFieldValue("date", date)
    }
    const handleUpdateFromTime = (time: any) => {
        setFieldValue("from", time)
    }
    const handleUpdateToTime = (time: any) => {
        setFieldValue("to", time)
    }
    const handleChecked = (value: string) => {
        setFieldValue("shift_mode", value)
    }

    return (
        <div className="p-3">
            <div className="mt-1">
                <label className="text-3md font-semibold text-black-100 block mb-2">
                    Shift type
                </label>
                <FormikControls
                    control="select"
                    name="shift_type"
                    aria-label="Shift type"
                    type="select"
                    className="rounded text-black-50"
                    data-testid="shift_type"
                >
                    <option>Select an option---</option>
                    {shiftType?.map((item) => (
                        <option key={item} value={item}>
                            {" "}
                            {item}{" "}
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
                    name="location"
                    control="input"
                    placeholder="Start typing-"
                    aria-label="location"
                    required
                    className="rounded"
                    data-testid="location"
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
                        name="shift_mode"
                        checked={values.shift_mode.toString() === "depot_first"}
                        onChange={() => handleChecked("Depot First")}
                        value="depot_first"
                    />
                    <Radio
                        label="Meet Onsite"
                        id="meet_onsite"
                        name="shift_mode"
                        value="meet_onsite"
                        checked={values.shift_mode.toString() === "meet_onsite"}
                        onChange={() => handleChecked("Depot First")}
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
                    name="date"
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
                        name="from"
                        format="12"
                    />
                </div>
                <div className="">
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        To
                    </label>
                    <TimePicker
                        onChange={handleUpdateToTime}
                        className="bg-[BiCalendarEvent]"
                        name="to"
                        format="12"
                    />
                </div>
            </div>
        </div>
    )
}

export default PostJobOne
