import { SubscriptionTableInterface } from "../../../types/subscriptions/interface"
import ProfileImage from "../../../assets/ProfileImage.svg"
import dayjs from "dayjs"
import { useAuthContext } from "../../../pages/auth/context/authContext"
import { useMemo } from "react"
import { admin } from "../../../utils/user-types"
import { IoLocationSharp } from "react-icons/io5"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"

const MobileSubscriptionTable = ({ elements }: SubscriptionTableInterface) => {
    const { state } = useAuthContext()

    const userState = useMemo(() => {
        return state.user
    }, [state.user])
    const navigate = useNavigate()

    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4" key={index}>
                    <div className="p-4">
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    AMOUNT
                                </h6>
                                <p className="text-2md mt-1">
                                    £ {element?.totalAmountPaid}
                                </p>
                            </div>
                            {userState?.accountType === admin ? (
                                <div>
                                    <IoIosArrowForward
                                        size={30}
                                        style={{ color: "#889088" }}
                                        onClick={() =>
                                            navigate(
                                                `/subscription/${element?.depotCompany?._id}`,
                                                {
                                                    state: {
                                                        companyId:
                                                            element
                                                                ?.depotCompany
                                                                ?._id,
                                                    },
                                                }
                                            )
                                        }
                                    />
                                </div>
                            ) : (
                                <div>
                                    <h6
                                        className="text-green-100 text-3sm"
                                        onClick={() =>
                                            navigate(
                                                `/subscription/invoice/${element?._id}`,
                                                {
                                                    state: {
                                                        subscriptionId:
                                                            element?._id,
                                                    },
                                                }
                                            )
                                        }
                                    >
                                        Download Reciept
                                    </h6>
                                </div>
                            )}
                        </div>
                        <div className="mt-3">
                            <h6 className="text-black-50 text-3sm">LOCATION</h6>
                            <p className="text-2md mt-1">
                                <IoLocationSharp
                                    size={26}
                                    style={{ color: "#E94444" }}
                                    className="inline"
                                />
                                {element?.depotCompany.address}
                            </p>
                        </div>
                        <div className="flex justify-between mt-3">
                            {userState?.accountType === admin ? (
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
                            ) : (
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        CONTACT PERSON
                                    </h6>
                                    <div className="flex gap-1">
                                        <img src={ProfileImage} alt="" />
                                        <p className="text-2md mt-1">
                                            {
                                                element?.depotCompany.createdBy
                                                    .firstName
                                            }{" "}
                                            {
                                                element?.depotCompany.createdBy
                                                    .lastName
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}

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
                            {userState?.accountType === admin ? (
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
                            ) : (
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        MONTH PAID
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {dayjs(element?.paymentDate).format(
                                            "MMM DD, YYYY"
                                        )}
                                    </p>
                                </div>
                            )}
                            <div>
                                <h6 className="text-black-50 text-3sm">PLAN</h6>
                                <p className="text-2md mt-1">
                                    {element?.subscriptionPlan}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            {userState?.accountType === admin && (
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
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileSubscriptionTable
