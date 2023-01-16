import { Table } from "@mantine/core"

import Layout from "../../../components/Layout/index"
import { AiOutlineArrowLeft } from "react-icons/ai"
import dayjs from "dayjs"
import { useGetAdminSubscriptions } from "../../../hooks/subscriptions/useSubscriptions.hooks"
import { useLocation, useNavigate } from "react-router-dom"
import ProfileImage from "../../../assets/profile.png"
import MobileSubscriptionDetail from "./MobileSubscriptionDetails"

const SubscriptionDetails = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const companyId = location?.state?.companyId

    const { data: subscriptionData } = useGetAdminSubscriptions({
        companyId: companyId,
    })
    // console.log(subscriptionData)

    const rows = subscriptionData?.results?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{element?.depotCompany?.name}</td>
            <td> £ {element?.totalAmountPaid}</td>
            <td>{element?.paymentInvoice}</td>
            <td> {element?.subscriptionPlan} </td>
            <td>
                {dayjs(element?.startDate).format("DD MMM YYYY")} -{" "}
                {dayjs(element?.endDate).format("DD MMM YYYY")}
            </td>
            <td> £ {element?.totalAmountPaid} </td>
            <td>{dayjs(element?.paymentDate).format("MMM DD, YYYY")}</td>
        </tr>
    ))

    const AdTableHead = [
        { list: "NO" },
        { list: "DEPOT" },
        { list: "AMOUNT" },
        { list: "INVOICE NO" },
        { list: "PLAN" },
        { list: "SUBSCRIPTION PERIOD" },
        { list: "TOTAL AMOUNT PAID" },
        { list: "DATE PAID" },
    ]

    const element = subscriptionData?.results?.find(
        (item) => item?.depotCompany?._id === companyId
    )
    return (
        <>
            <Layout>
                <div className="md:p-6 p-6 mt-4 md:mt-14">
                    <div className="bg-gray-80 w-fit p-3 rounded-lg cursor-pointer mb-4">
                        <AiOutlineArrowLeft
                            size={20}
                            onClick={() => navigate("/subscription")}
                        />
                    </div>
                    <div className="lg:flex gap-4">
                        <div>
                            <img src={ProfileImage} alt="profile" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-3xl font-creatoBold text-black-100 font-bold">
                                {element?.depotCompany?.name},{" "}
                                <span className="font-creato font-normal text-black-80">
                                    {element?.depotCompany?.address}
                                </span>
                            </h1>
                            <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                                {dayjs(element?.paymentDate).format(
                                    "MMM DD, YYYY"
                                )}{" "}
                                | Subscription History
                            </p>
                        </div>
                        {/* <div className="relative lg:pb-4 bottom-0 lg:bottom-0">
                            <div className="absolute right-0 "> filter</div>
                        </div> */}
                    </div>
                </div>
                <div className="hidden lg:block " data-testid="subscription">
                    <Table
                        style={{
                            backgroundColor: "#FFFFFF",
                            fontFamily: "CreatoDisplay",
                        }}
                        className={"table"}
                        verticalSpacing="md"
                        data-testid="table-data"
                        role="grid"
                    >
                        <thead>
                            <tr>
                                {AdTableHead.map((item, index) => (
                                    <th
                                        key={index}
                                        style={{
                                            borderBottom: "none",
                                        }}
                                    >
                                        <p className="text-black-30 ">
                                            {item?.list}
                                        </p>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="cursor-pointer">{rows}</tbody>
                    </Table>
                </div>
                <div className="block lg:hidden p-6 mt-4">
                    <MobileSubscriptionDetail />
                </div>
            </Layout>
        </>
    )
}

export default SubscriptionDetails
