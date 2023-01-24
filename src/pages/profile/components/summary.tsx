import { Button } from "../../../components"
import { BsFillTrashFill } from "react-icons/bs"
import { RiAddLine } from "react-icons/ri"
import { MdLocationOn } from "react-icons/md"
import { useEffect, useState } from "react"
import { InviteProfileResponse } from "../../../types/profile/interface"
import { UseMutateFunction } from "react-query"
import { InviteHqInterface } from "../../../types/roles/role-interface"
import { AxiosError } from "axios"

interface profileSummary {
    setStep: React.Dispatch<React.SetStateAction<number>>
    step: number
    profileData: InviteProfileResponse | undefined
    mutateUser: UseMutateFunction<
        any,
        AxiosError<unknown, any>,
        InviteHqInterface,
        unknown
    >
    isInviteLoading: boolean
    LocationStateArray?: never[]
}

const HQProfileSummary = ({
    setStep,
    step,
    profileData,
    mutateUser,
    isInviteLoading,
}: profileSummary) => {
    const [LocationStateArray, setLocationStateArray] = useState([])

    // this duplicates the LocationStateArray session storage for regional manager data
    const regionalData = LocationStateArray?.map((i: any) => ({ ...i }))
    // this duplicates the LocationStateArray session storage for shift manager data
    const shiftData = LocationStateArray?.map((i: any) => ({ ...i }))

    // this deletes the regional manager email from the LocationStateArray session storage in order to separate the regional manager as the backend requires
    const deleteRegionalManagerData = shiftData?.map(function (item: any) {
        delete item.regional_manager
        return item
    })
    // this deletes the shift manager email from the LocationStateArray session storage in order to separate the regional manager as the backend requires
    const deleteShiftManagerData = regionalData?.map(function (item: any) {
        delete item.shift_manager
        return item
    })

    // this adds the invited role to the shift manager array in order to send to the backend
    const addShiftInvitedRoleData = deleteRegionalManagerData?.map(
        (v: any) => ({
            ...v,
            invitedRole: "SHIFT-MANAGER",
            companyId: profileData?.user?.depotCompany?._id,
        })
    )

    // this adds the invited role to the regional manager array in order to send to the backend
    const addRegionalInvitedRoleData = deleteShiftManagerData?.map(
        (v: any) => ({
            ...v,
            invitedRole: "REGIONAL-MANAGER",
            companyId: profileData?.user?.depotCompany?._id,
        })
    )
    // this changes the shift_manager array to email in order to send to the backend
    const shiftManagerArray = addShiftInvitedRoleData?.map((item: any) => {
        return {
            email: item.shift_manager,
            invitedRole: item.invitedRole,
            regionAddress: item.regionAddress,
            companyId: profileData?.user?.depotCompany?._id,
        }
    })
    // this changes the regional_manager array to email in order to send to the backend
    const regionalManagerArray = addRegionalInvitedRoleData?.map(
        (item: any) => {
            return {
                email: item.regional_manager,
                invitedRole: item?.invitedRole,
                regionAddress: item?.regionAddress,
                companyId: profileData?.user?.depotCompany?._id,
            }
        }
    )

    // this combines the shift manager and regional manager arrays into one array to send to the backend
    const finalArray = shiftManagerArray?.concat(regionalManagerArray)

    const handleSubmit = () => {
        mutateUser({
            invitees: finalArray,
        })
    }

    useEffect(() => {
        const locationArray: any =
            window.sessionStorage.getItem("locationArray")
        const parsedLocationArray = JSON.parse(locationArray)

        setLocationStateArray(parsedLocationArray)
    }, [LocationStateArray, finalArray])

    const handleDelete = (index: number) => {
        const newArray: any = LocationStateArray.filter(
            (_: any, i: number) => i !== index
        )
        sessionStorage.setItem("locationArray", JSON.stringify(newArray))
    }

    return (
        <>
            <div className="overflow-auto h-[500px]">
                {LocationStateArray?.map((item: any, index: number) => (
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
                                {item?.regional_manager?.map(
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
                                {item.shift_manager?.map(
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

            <Button
                size="normal"
                className="w-full mt-16"
                variant="primary"
                type="submit"
                style={{
                    backgroundColor: "rgba(254, 215, 10, 1)",
                }}
                onClick={() => {
                    handleSubmit()
                }}
            >
                {isInviteLoading ? "Finishing..." : "Finish"}
            </Button>
        </>
    )
}

export default HQProfileSummary
