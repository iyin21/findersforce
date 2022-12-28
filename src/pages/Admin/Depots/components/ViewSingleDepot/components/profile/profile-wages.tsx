import { JobBoardByIdResponse } from "../../../../../../../types/job-board/interface"
import { IJobRateResponse } from "../../../../../../../types/depot/depot-inteface"

export interface ProfileWagesInterface {
    jobRatesData?: IJobRateResponse[]
    qualificationData: JobBoardByIdResponse[] | undefined
}

const ProfileWages = ({
    jobRatesData,
    qualificationData,
}: ProfileWagesInterface) => {
    return (
        <div className="mt-6">
            <h3 className="font-creato text-xl text-black-60">
                Wage breakdown (per hour)
            </h3>

            <div className="mt-5">
                <div className="grid lg:grid-cols-1 gap-2">
                    {jobRatesData?.map((item: any, index: number) => (
                        <div
                            className="bg-black-5 p-4 rounded-lg  grid  "
                            key={index}
                        >
                            <h6 className="font-creatoMedium border-b border-black-10 pb-2">
                                {
                                    qualificationData?.filter(
                                        (list) =>
                                            list?._id === item?.jobQualification
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

export default ProfileWages
