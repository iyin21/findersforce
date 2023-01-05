import dayjs from "dayjs"
import { Dispatch, SetStateAction } from "react"
import { FiChevronRight } from "react-icons/fi"
import { JobBoardByIdResponse } from "../../../../../../../types/job-board/interface"
import { DepotWagesTableProps } from "./wages-table"

const MobileWageTable = ({
    elements,
    setOpenEditWageModal,
    qualificationData,
}: {
    elements: DepotWagesTableProps["elements"]
    setOpenEditWageModal: Dispatch<SetStateAction<boolean>>
    qualificationData: JobBoardByIdResponse[] | undefined
}) => {
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div
                    className="rounded bg-black-5 mb-4 p-4"
                    key={index}
                    onClick={() => setOpenEditWageModal(true)}
                >
                    <div className="flex justify-between items-center mt-3 border-b border-black-10 pb-2">
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                QUALIFICATION
                            </h6>
                            <p className="text-2md mt-1">
                                {
                                    qualificationData?.filter(
                                        (item) =>
                                            item?._id ===
                                            element.jobQualification
                                    )[0]?.name
                                }
                                {/* {element?.jobQualification} */}
                            </p>
                        </div>
                        <div>
                            <FiChevronRight color="#0F0D0099" size={30} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                MOS (DEPOT PAYS)
                            </h6>
                            <p className="text-2md mt-1">
                                {element?.jobRateMeetOnsiteDisplayedToDepot}
                            </p>
                        </div>
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                MOS (OP RECEIVES)
                            </h6>
                            <p className="text-2md mt-1">
                                {element?.jobRateMeetOnsiteDisplayedToOp}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                DPF (DEPOT PAYS)
                            </h6>
                            <p className="text-2md mt-1">
                                {element?.jobRateDepotFirstDisplayedToDepot}
                            </p>
                        </div>
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                DPF (OP RECEIVES)
                            </h6>
                            <p className="text-2md mt-1">
                                {element?.jobRateDepotFirstDisplayedToOp}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h6 className="text-black-50 text-3sm">
                            REGISTERED BY
                        </h6>
                        <p className="text-2md mt-1">
                            {element?.company?.name}
                        </p>
                    </div>
                    <div className="mt-4">
                        <h6 className="text-black-50 text-3sm">DATE ADDED</h6>
                        <p className="text-2md mt-1">
                            {dayjs(element?.company?.createdAt).format(
                                "MMM D, YYYY"
                            )}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileWageTable
