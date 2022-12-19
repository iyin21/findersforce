import { useFormikContext } from "formik"
import {
    useGetJobQualification,
    useGetJobQualificationCategory,
} from "../../../../../../hooks/job-board/useJobBoard.hooks"
import FormikControls from "../../../../../../components/Form/FormControls/form-controls"
import { FiPlus } from "react-icons/fi"
import { useEffect } from "react"

const Qualifications = () => {
    const { values } = useFormikContext<{
        qualification_category: string
        findersforce_depot_amount: string
        findersforce_meet_amount: string
        operative_depot_amount: string
        operative_meet_amount: string
    }>()

    const { data: qualificationData } = useGetJobQualification()
    const { data: category } = useGetJobQualificationCategory()

    const handleAddQualification = () => {
        const wageArray: any = window.sessionStorage.getItem("wageArray")

        if (wageArray === null || wageArray === 0) {
            const newWage = [
                {
                    qualification_category: values.qualification_category,
                    findersforce_depot_amount: values.findersforce_depot_amount,
                    findersforce_meet_amount: values.findersforce_meet_amount,
                    operative_depot_amount: values.operative_depot_amount,
                    operative_meet_amount: values.operative_meet_amount,
                },
            ]
            window.sessionStorage.setItem("wageArray", JSON.stringify(newWage))
        } else {
            const newWageArray = JSON.parse(wageArray)
            window.sessionStorage.setItem(
                "wageArray",
                JSON.stringify([
                    ...newWageArray,
                    {
                        qualification_category: values.qualification_category,
                        findersforce_depot_amount:
                            values.findersforce_depot_amount,
                        findersforce_meet_amount:
                            values.findersforce_meet_amount,
                        operative_depot_amount: values.operative_depot_amount,
                        operative_meet_amount: values.operative_meet_amount,
                    },
                ])
            )
        }
        reset()
    }

    const reset = () => {
        values.findersforce_depot_amount = ""
        values.findersforce_meet_amount = ""
        values.operative_depot_amount = ""
        values.operative_meet_amount = ""
        values.qualification_category = ""
    }

    useEffect(() => {}, [values])

    return (
        <div className="py-3 lg:w-[55%]">
            <div className="mt-4">
                <label className="text-3md font-semibold text-black-100 block mb-2">
                    Qualification category
                </label>
                <FormikControls
                    control="select"
                    name="qualification_category"
                    aria-label="Shift type"
                    type="select"
                    className="rounded text-black-50"
                    data-testid="qualification_category"
                    defaultValue={values?.qualification_category}
                >
                    <option>Select an option---</option>
                    {category?.map((item) => (
                        <option key={item._id} value={item._id}>
                            {" "}
                            {item.name}{" "}
                        </option>
                    ))}
                </FormikControls>
            </div>

            <div className="mt-4">
                <label className="text-3md font-semibold text-black-100 block mb-2">
                    Qualification
                </label>

                <div className="border border-black-10 p-6 rounded-lg flex gap-2">
                    <p className="bg-black-5 p-2 w-fit">
                        {
                            qualificationData?.filter(
                                (item) =>
                                    item?.jobQualificationCategoryId ===
                                    values.qualification_category
                            )[0]?.name
                        }
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-3">
                <div className="mt-4">
                    <label className="text-3md font-semibold text-black-100 block mb-2">
                        Finders force amount (Depot first)
                    </label>
                    <FormikControls
                        type="text"
                        name="findersforce_depot_amount"
                        control="input"
                        placeholder="0"
                        aria-label="Finders force amount (Depot first)"
                        required
                        className="rounded"
                        data-testid="findersforce_depot_amount"
                    />
                </div>
                <div className="mt-4">
                    <label className="text-3md font-semibold text-black-100 block mb-2">
                        Operative amount (Depot first per/hr)
                    </label>
                    <FormikControls
                        type="text"
                        name="operative_depot_amount"
                        control="input"
                        placeholder="0"
                        aria-label="Operative amount (Depot first per/hr)"
                        required
                        className="rounded"
                        data-testid="operative_depot_amount"
                    />
                </div>
                <div className="">
                    <label className="text-3md font-semibold text-black-100 block mb-2">
                        Finders force amount (Meet on site)
                    </label>
                    <FormikControls
                        type="text"
                        name="findersforce_meet_amount"
                        control="input"
                        placeholder="0"
                        aria-label="Finders force amount (Meet on site)"
                        required
                        className="rounded"
                        data-testid="findersforce_meet_amount"
                    />
                </div>
                <div className="">
                    <label className="text-3md font-semibold text-black-100 block mb-2">
                        Operative amount (Meet on site per/hr)
                    </label>
                    <FormikControls
                        type="text"
                        name="operative_meet_amount"
                        control="input"
                        placeholder="0"
                        aria-label="Operative amount (Meet on site per/hr)"
                        required
                        className="rounded"
                        data-testid="operative_meet_amount"
                    />
                </div>
            </div>

            <p
                className="bg-black-100 p-2 flex items-center gap-2 w-fit text-white-100 rounded mt-6"
                onClick={() => {
                    handleAddQualification()
                }}
            >
                <FiPlus size={20} /> Add New
            </p>
        </div>
    )
}

export default Qualifications
