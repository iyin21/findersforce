import { useFormikContext } from "formik"
import { BsFillTrashFill } from "react-icons/bs"
import { MdLocationOn, MdModeEdit } from "react-icons/md"

const HQProfileSummary = () => {
    const { values } = useFormikContext<{
        accountType: string
        email: string[]
    }>()

    return (
        <div className="bg-yellow-10 px-6 py-6 rounded-lg mt-4">
            <div className="flex justify-between items-center">
                <div className="flex gap-6 items-center">
                    <MdLocationOn size={30} color="#E94444" />
                    <h3 className="text-black-100 text-2lg font-semibold">
                        Longbridge, Birmingham{" "}
                    </h3>
                </div>

                <div className="flex gap-8">
                    <MdModeEdit size={25} />
                    <BsFillTrashFill size={25} color="#E94444" />
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
