import { SubscriptionTableInterface } from "../../../types/subscriptions/interface"
import ProfileImage from "../../../assets/ProfileImage.svg"

const MobileJobTable = ({ elements }: SubscriptionTableInterface) => {
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
                                    £ {element?.amount}
                                </p>
                            </div>
                            <div>
                                <h6 className="text-green-100 text-3sm">
                                    Download Reciept
                                </h6>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    CONTACT PERSON
                                </h6>
                                <div className="flex gap-1">
                                    <img src={ProfileImage} alt="" />
                                    <p className="text-2md mt-1">
                                        {element?.contactPerson}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    PAYMENT REFERENCE
                                </h6>
                                <p className="text-2md mt-1">
                                    {element?.paymentReference}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    MONTH PAID
                                </h6>
                                <p className="text-2md mt-1">
                                    {element?.monthPaid}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileJobTable
