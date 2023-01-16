import { Button } from "../../../components"
// import { useFormikContext } from "formik"
import { BsFillTrashFill } from "react-icons/bs"
import { RiAddLine } from "react-icons/ri"
import { MdLocationOn } from "react-icons/md"
import { useEffect, useState } from "react"
// import { useFormikContext } from "formik"

interface profileSummary {
    setStep: React.Dispatch<React.SetStateAction<number>>
    step: number
}

const HQProfileSummary = ({ setStep, step }: profileSummary) => {
    // const { setFieldValue, values } = useFormikContext<{
    //     regionAddress: string
    // }>()

    const [LocationStateArray, setLocationStateArray] = useState([])

    const handleDelete = (index: number) => {
        const newArray: any = LocationStateArray.filter(
            (_: any, i: number) => i !== index
        )
        sessionStorage.setItem("locationArray", JSON.stringify(newArray))
    }

    useEffect(() => {
        const locationArray: any =
            window.sessionStorage.getItem("locationArray")
        const parsedLocationArray = JSON.parse(locationArray)
        setLocationStateArray(parsedLocationArray)
    }, [LocationStateArray])

    return (
        <>
            <div className="overflow-auto h-[500px]">
                {LocationStateArray.map((item: any, index: number) => (
                    <div
                        className="bg-yellow-10 px-6 py-6 rounded-lg mt-4"
                        key={index}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex gap-6 items-center">
                                <MdLocationOn size={35} color="#E94444" />

                                <h3 className="text-black-100 text-2lg font-semibold">
                                    {item?.regionAddress}{" "}
                                </h3>
                            </div>

                            <div className="flex gap-3 items-center">
                                {/* <MdModeEdit
                            size={25}
                            onClick={() => {
                                setStep(step - 1)
                            }}
                        /> */}
                                <BsFillTrashFill
                                    size={25}
                                    color="#E94444"
                                    onClick={() => {
                                        handleDelete(index)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-4 ml-12 grid grid-cols-2">
                            <div>
                                <h6 className="text-black-30">
                                    DEPOT MANAGERS
                                </h6>
                                {item?.regional_manager.map(
                                    (item: any, index: number) => (
                                        <p
                                            key={index}
                                            className="text-black-80 mt-2"
                                        >
                                            {item}
                                        </p>
                                    )
                                )}
                            </div>
                            <div>
                                <h6 className="text-black-30">
                                    SHIFT MANAGERS
                                </h6>
                                {item.shift_manager.map(
                                    (item: any, index: number) => (
                                        <p
                                            key={index}
                                            className="text-black-80 mt-2"
                                        >
                                            {item}
                                        </p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-center">
                <Button
                    className="bg-green-10 text-green-100 font-semibold"
                    iconLeft={<RiAddLine size={25} />}
                    onClick={() => {
                        setStep(step - 1)
                    }}
                >
                    New Location
                </Button>
            </div>
        </>
    )
}

export default HQProfileSummary
