import { useFormikContext } from "formik"
import { useGetJobQualification } from "../../../../../../hooks/job-board/useJobBoard.hooks"

const Summary = () => {
    const { values } = useFormikContext<{
        phoneNumber: string
        email: string
        companyEmail: string
        companyName: string
        address: string
        regionLimit: string
        qualification_category: string
        findersforce_depot_amount: string
        findersforce_meet_amount: string
    }>()
    const { data: qualificationData } = useGetJobQualification()

    const wageArray = window.sessionStorage.getItem("wageArray")
    // @ts-ignore
    const wageArrayData = JSON.parse(wageArray)

    return (
        <div>
            <h3 className="font-creato text-xl">Summary</h3>
            <p className="font-creatoLight text-lg text-black-60">
                Confirm this information before you publish
            </p>

            <div className="grid lg:grid-cols-2 mt-5 mr-4 lg:mr-0">
                <div className="">
                    <h3 className="font-creato text-xl text-black-60 mb-6">
                        Business Information
                    </h3>
                    <div className="grid grid-cols-2 mt-3 gap-3">
                        <h6 className="font-creatoLight">Depot Name</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.companyName}
                        </p>
                        <h6 className="font-creatoLight">Depot Email</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.email}
                        </p>
                        <h6 className="font-creatoLight">Address</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.address}
                        </p>
                        <h6 className="font-creatoLight">Location</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.regionLimit}
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="font-creato text-xl text-black-60 mt-4 lg:mt-0 mb-6">
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-2 mt-3 gap-2">
                        {" "}
                        <h6 className="font-creatoLight">Phone Number</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.phoneNumber}
                        </p>{" "}
                        <h6 className="font-creatoLight"> Email</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.companyEmail}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-b border-black-20 my-6"></div>
            <h3 className="font-creato text-xl">Wage breakdown</h3>

            <div className=" mt-5">
                <div className="grid lg:grid-cols-1 gap-2">
                    {wageArrayData?.map((item: any, index: number) => (
                        <div
                            className="bg-black-5 p-4 rounded-lg  grid  "
                            key={index}
                        >
                            <h6 className="font-creatoMedium border-b border-black-10">
                                {
                                    qualificationData?.filter(
                                        (list) =>
                                            list?._id ===
                                            item?.jobQualificationId
                                    )[0]?.name
                                }
                            </h6>

                            <div className="grid grid-cols-4 mt-4">
                                <div>
                                    <h6 className="font-creatoMedium text-2md">
                                        MOS Depot pays
                                    </h6>
                                    <p className="font-creatoMedium font-semibold text-green-100 mt-2">
                                        {
                                            item?.jobRateMeetOnsiteDisplayedToDepot
                                        }
                                    </p>
                                </div>
                                <div>
                                    <h6 className="font-creatoMedium text-2md">
                                        MOS OP Receives
                                    </h6>
                                    <p className="font-creatoMedium font-semibold text-green-100 mt-2">
                                        {item?.jobRateMeetOnsiteDisplayedToOp}
                                    </p>
                                </div>
                                <div>
                                    <h6 className="font-creatoMedium text-2md">
                                        DPF: Depot pays
                                    </h6>
                                    <p className="font-creatoMedium font-semibold text-green-100 mt-2">
                                        {
                                            item?.jobRateDepotFirstDisplayedToDepot
                                        }
                                    </p>
                                </div>
                                <div>
                                    <h6 className="font-creatoMedium text-2md">
                                        DPF OP receives
                                    </h6>
                                    <p className="font-creatoMedium font-semibold text-green-100 mt-2">
                                        {item?.jobRateDepotFirstDisplayedToOp}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Summary
