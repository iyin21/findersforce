import { SubscriptionTableInterface } from "../../../types/subscriptions/interface"
import ProfileImage from "../../../assets/ProfileImage.svg"
import { Table } from "@mantine/core"
import MobileSubscriptionTable from "./MobileSubscriptionTable"
import Layout from "../../../components/Layout/index"
import { AiOutlineArrowLeft } from "react-icons/ai"

const SubscriptionDetails = ({ elements }: SubscriptionTableInterface) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{element?.depot}</td>
            <td> £ {element?.amount}</td>
            <td>
                <div className="flex gap-1">
                    <img src={ProfileImage} alt="Profile" />
                    <span>{element?.contactPerson}</span>
                </div>
            </td>
            <td> {element?.paymentReference} </td>
            <td>{element?.monthOf}</td>
            <td> {element?.monthPaid} </td>
        </tr>
    ))

    const AdTableHead = [
        { list: "DEPOT" },
        { list: "AMOUNT" },
        { list: "REGISTERED BY" },
        { list: "SUBSCRIPTION ID" },
        { list: "MONTH OF" },
        { list: "DATE PAID" },
    ]
    return (
        <>
            <Layout>
                <div className="md:p-6 p-6 mt-4 md:mt-14">
                    <div className="bg-gray-80 w-fit p-3 rounded-lg cursor-pointer">
                        <AiOutlineArrowLeft size={20} />
                    </div>
                    <div className="lg:flex justify-between">
                        <div>
                            <h1 className="text-xl md:text-3xl font-creatoBold text-black-100 font-bold">
                                Rivive traffic
                            </h1>
                            <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                                Nov 15, 2022 | Subscription History
                            </p>
                        </div>
                        <div className="relative lg:pb-4 bottom-0 lg:bottom-0">
                            <div className="absolute right-0 "> filter</div>
                        </div>
                    </div>
                </div>
                <div
                    className="hidden lg:block overflow-x-hidden "
                    data-testid="subscription"
                >
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
                <div className="block lg:hidden">
                    <MobileSubscriptionTable elements={elements} />
                </div>
            </Layout>
        </>
    )
}

export default SubscriptionDetails
