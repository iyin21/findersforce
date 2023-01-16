import ProfileImage from "../../../assets/ProfileImage.svg"
import dayjs from "dayjs"
import { useGetAdminSubscriptions } from "../../../hooks/subscriptions/useSubscriptions.hooks"
import { useLocation } from "react-router-dom"

const MobileSubscriptionDetail = () => {
    const location = useLocation()
    const companyId = location?.state?.companyId

    const { data: subscriptionData } = useGetAdminSubscriptions({
        companyId: companyId,
    })
    return (
        <div className="mt-4">
            {subscriptionData?.results.map((element, index) => (
                <div className="rounded bg-black-5 mb-4" key={index}>
                    <div className="p-4">
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    TOTAL AMOUNT
                                </h6>
                                <p className="text-2md mt-1">
                                    £ {element?.totalAmountPaid}
                                </p>
                            </div>
                            <div>
                                <h6 className="text-black-50 text-3sm">PLAN</h6>
                                <p className="text-2md mt-1">
                                    {element?.subscriptionPlan}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    DEPOT
                                </h6>
                                <div className="flex gap-1">
                                    <img src={ProfileImage} alt="" />
                                    <p className="text-2md mt-1">
                                        {element?.depotCompany.name}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    Invoice No
                                </h6>
                                <p className="text-2md mt-1">
                                    {element?.paymentInvoice}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    DATE PAID
                                </h6>
                                <p className="text-2md mt-1">
                                    {dayjs(element?.paymentDate).format(
                                        "MMM DD, YYYY"
                                    )}
                                </p>
                            </div>
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    SUBSCRIPTION PERIOD
                                </h6>
                                <p className="text-2md mt-1">
                                    {dayjs(element?.startDate).format(
                                        "DD MMM YYYY"
                                    )}{" "}
                                    -{" "}
                                    {dayjs(element?.endDate).format(
                                        "DD MMM YYYY"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileSubscriptionDetail
