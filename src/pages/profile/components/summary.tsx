import { useFormikContext } from "formik"
import { MdLocationOn, MdModeEdit } from "react-icons/md"

interface profileSummary {
    setStep: React.Dispatch<React.SetStateAction<number>>
    step: number
}

const HQProfileSummary = ({ setStep, step }: profileSummary) => {
    const { values } = useFormikContext<{
        accountType: string
        email: string[]
        regionAddress: string
    }>()

    return (
        <div className="bg-yellow-10 px-6 py-6 rounded-lg mt-4">
            <div className="flex justify-between items-center">
                <div className="flex gap-6 items-center">
                    <MdLocationOn size={30} color="#E94444" />
                    <h3 className="text-black-100 text-2lg font-semibold">
                        {values.regionAddress}{" "}
                    </h3>
                </div>

                <div>
                    <MdModeEdit
                        size={25}
                        onClick={() => {
                            setStep(step - 1)
                        }}
                    />
                </div>
            </div>
            <div className="mt-4 ml-12 grid grid-cols-2">
                <div>
                    <h6 className="text-black-30">{values.accountType}</h6>
                    {values.email.map((item, index) => (
                        <p key={index} className="text-black-80 mt-2">
                            {item}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HQProfileSummary