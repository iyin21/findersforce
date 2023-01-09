import dayjs from "dayjs"
import { FiCheck } from "react-icons/fi"
import { DepotPaymentTableProps } from "./depot-payments"
import { Button } from "../../../../../../../components"

const MobileDepotPayment = ({ elements }: DepotPaymentTableProps) => {
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4 p-4" key={index}>
                    <div className="flex justify-between items-center border-b border-black-20 pb-2">
                        <div>
                            <h6 className="text-black-50 text-3sm">LOCATION</h6>
                            <p className="text-2md mt-1">
                                {element?.schedule?.jobLocation
                                    ?.formattedAddress || "N/A"}
                            </p>
                        </div>
                        <div>
                            <a
                                href="/"
                                download={"/"}
                                className="border-b border-black-100"
                            >
                                View receipt
                            </a>
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                DATE RECEIVED
                            </h6>
                            <p className="text-2md mt-1">
                                {dayjs(element?.createdAt).format(
                                    "MMM D, YYYY"
                                )}
                            </p>
                        </div>

                        <div className="mt-3">
                            <h6 className="text-black-50 text-3sm">MONTH</h6>
                            <p className="text-2md mt-1">
                                {dayjs(element?.createdAt).format("MMM, YYYY")}
                            </p>
                        </div>
                    </div>

                    <div className="mt-3">
                        <h6 className="text-black-50 text-3sm">EMAIL</h6>
                        <p className="text-2md mt-1">
                            {element?.depot?.email || "N/A"}
                        </p>
                    </div>
                    <div className="mt-3">
                        <h6 className="text-black-50 text-3sm">VERIFY</h6>
                        <Button
                            variant="green"
                            iconLeft={<FiCheck size={25} />}
                            className="mt-2"
                        >
                            Verify
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileDepotPayment
