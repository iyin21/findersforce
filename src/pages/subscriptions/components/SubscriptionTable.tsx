import { SubscriptionTableInterface } from "../../../types/subscriptions/interface"
import ProfileImage from "../../../assets/ProfileImage.svg"
import { Modal, Progress, Table } from "@mantine/core"
import { useMemo, useState } from "react"
import MobileSubscriptionTable from "./MobileSubscriptionTable"
import useAuthContext from "../../../hooks/auth-hooks/useAuth"
import { admin, HQDepotType, RegionalManager } from "../../../utils/user-types"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { IoLocationSharp } from "react-icons/io5"
import dayjs from "dayjs"

const SubscriptionTable = ({ elements}: SubscriptionTableInterface) => {
    const [download, setDownload] = useState(false)
    const { state } = useAuthContext()

    const userState = useMemo(() => {
        return state.user
    }, [state.user])
    const navigate = useNavigate()
   
    
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            {userState?.accountType === admin && <td>{element?.depotCompany?.name}</td>}
            <td>
                {" "}
                <IoLocationSharp
                    size={26}
                    style={{ color: "#E94444" }}
                    className="inline"
                />{" "}
                {element?.depotCompany?.address}
            </td>
            <td> £ {element?.totalAmountPaid}</td>
            {userState?.depotRole === HQDepotType && (
                <td>
                    <div className="flex gap-1">
                        <img src={ProfileImage} alt="Profile" />
                        <span>{element?.depotCompany?.createdBy?.firstName} {element?.depotCompany?.createdBy?.lastName}</span>
                    </div>
                </td>
            )}
            {userState?.depotRole === RegionalManager && (
                <td>
                    <div className="flex gap-1">
                        <img src={ProfileImage} alt="Profile" />
                        <span>{element?.depotCompany?.createdBy?.firstName} {element?.depotCompany?.createdBy?.lastName}</span>
                    </div>
                </td>
            )}
            <td> {element?.paymentInvoice} </td>
            <td> {element?.subscriptionPlan} </td>
            {userState?.accountType === admin && <td>{dayjs(element?.startDate).format("DD MMM YYYY")} - {dayjs(element?.endDate).format("DD MMM YYYY")}</td>}
            <td> {dayjs(element?.paymentDate).format("MMM DD, YYYY")} </td>
            {userState?.depotRole === HQDepotType && (
                <td
                    className="text-green-100"
                    onClick={() => navigate(`/subscription/invoice/${element?._id}`, {state: {subscriptionId: element?._id}})}
                >
                    Download Reciept
                </td>
            )}
            {userState?.depotRole === RegionalManager && (
                <td
                    className="text-green-100"
                    onClick={() => navigate(`/subscription/invoice/${element?._id}`, {state: {subscriptionId: element?._id}})}
                >
                    Download Reciept
                </td>
            )}
            {userState?.accountType === admin && (
                <td className="text-green-100">
                    <IoIosArrowForward
                        size={30}
                        style={{ color: "#889088" }}
                        onClick={() => navigate(`/subscription/${element?.depotCompany?._id}`, {state: {companyId: element?.depotCompany?._id}})}
                    />
                </td>
            )}
        </tr>
    ))

    const HqTableHead = [
        { list: "NO" },
        { list: "LOCATION" },
        { list: "AMOUNT" },
        { list: "CONTACT PERSON" },
        { list: "INVOICE NO" },
        { list: "PLAN" },
        { list: "MONTH PAID" },
    ]
    const AdTableHead = [
        { list: "NO" },
        { list: "DEPOT" },
        { list: "LOCATION" },
        { list: "AMOUNT" },
        { list: "INVOICE NO" },
        { list: "PLAN" },
        { list: "SUB PERIOD" },
        { list: "DATE PAID" },
    ]
    return (
        <>
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
                        {userState?.accountType === admin && (
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
                        )}

                        {userState?.depotRole === HQDepotType && (
                            <tr>
                                {HqTableHead.map((item, index) => (
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
                        )}
                        {userState?.depotRole === RegionalManager && (
                            <tr>
                                {HqTableHead.map((item, index) => (
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
                        )}
                    </thead>
                    <tbody className="cursor-pointer">{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden">
                <MobileSubscriptionTable elements={elements} />
            </div>

            {download && (
                <Modal
                    centered
                    opened={download}
                    onClose={() => setDownload(false)}
                    withCloseButton={false}
                    overlayOpacity={0.55}
                    overlayBlur={3}
                    padding={0}
                    transition="fade"
                    transitionDuration={600}
                    transitionTimingFunction="ease"
                    styles={() => ({
                        modal: {
                            width: "400px",
                        },
                    })}
                >
                    <div className="bg-white-100 text-center py-14 rounded-2xl">
                        <Progress
                            value={70}
                            color="#4DB25D"
                            className="w-[50%] mx-auto"
                        />
                        <p className="font-creatoBold text-3md font-bold pt-4">
                            Downloading....
                        </p>
                        <p className="font-creato text-3sm text-black-50">
                            Please wait
                        </p>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default SubscriptionTable
