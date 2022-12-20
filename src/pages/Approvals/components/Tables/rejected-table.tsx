import { Table } from "@mantine/core"
import { Data } from "../../../../types/approval/approval-interface"
import { HiChevronRight } from "react-icons/hi"
import Avatar from "../../../Applications/assets/avatar.svg"
import dayjs from "dayjs"
import { IoIosArrowForward } from "react-icons/io"
import RejectedApplicationModal from "../../../../components/Modals/ApprovalModals/RejectedApplicationModal"
import { useState } from "react"
import { useUpdateOperative } from "../../../../hooks/approval-hooks/approval.hook"

interface Prop {
    // status?: "pending" | "accepted" | "rejected" ;
    elements: Data[]
    setPhase: (val: number) => void

    setActiveId: (val: string) => void
}
const RejectedTable = ({ elements, setPhase, setActiveId }: Prop) => {
    const [open, setOpen] = useState(false)
    const [element, setElement] = useState<Data>()
    const handleModalOpen = (id: string) => {
        elements.forEach((element) => {
            return element._id === id ? setElement(element) : null
        })
        setOpen(true)
    }
    const rows = elements.map((item, index) => (
        <tr key={index}>
            <td>
                <span className="text-lg">{Number(index + 1).toString()}</span>
            </td>
            <td>
                <p className="flex">
                    <img src={Avatar} alt="" />
                    <span className="pl-2">
                        {item.firstName + " " + item.lastName}
                    </span>
                </p>
            </td>

            <td>{item.gender}</td>
            <td>{item.qualification[0].name}</td>
            <td>{item.doc.rejectReason}</td>
            <td>{dayjs(item.doc.updatedAt).format("MMM D, YYYY")}</td>
            <td
                className="cursor-pointer"
                data-testid="view_application"
                onClick={
                    () => {
                        handleModalOpen(item._id)
                    }
                    // navigate(`/applications/${item._id}`)
                }
            >
                <HiChevronRight size={30} style={{ color: "#889088" }} />
            </td>
        </tr>
    ))

    const tableHead = [
        "no",
        "name",
        "gender",
        "Qualification",
        "reasons",
        "date rejected",
        "action",
    ]
    const { isLoading: isLoadingAcceptedData, mutate: acceptMutate } =
        useUpdateOperative({ id: element?._id || "" })

    const handleAccept = () => {
        acceptMutate({ status: "accepted" })
    }
    return (
        <>
            <RejectedApplicationModal
                openModal={open}
                setOpenModal={setOpen}
                element={element}
                handleAccept={handleAccept}
                isLoadingAcceptedData={isLoadingAcceptedData}
            />
            <div className="hidden lg:block ">
                <Table verticalSpacing="md">
                    <thead>
                        <tr>
                            {tableHead.map((item, index) => (
                                <th
                                    key={index}
                                    style={{
                                        color: "rgba(15, 13, 0, 0.3)",
                                        fontSize: "13px",
                                        borderBottom: "none",
                                    }}
                                    className="text-black-30"
                                >
                                    {item.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden mt-4">
                {elements.map((item, index) => (
                    <div
                        className="rounded bg-black-5 mb-4 pb-4 cursor-pointer"
                        key={index}
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <p className="font-medium text-2lg">
                                {item.firstName + " " + item.lastName}
                            </p>
                            <IoIosArrowForward
                                size={20}
                                style={{ color: "#889088" }}
                            />
                        </div>
                        <div className="flex justify-between w-full px-4">
                            <div>
                                <div className="mt-2">
                                    <h6 className="text-black-50 text-3sm">
                                        EMAIL
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {item.email}
                                    </p>
                                </div>

                                <div className="mt-2">
                                    <h6 className="text-black-50 text-3sm">
                                        GENDER
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {item.gender}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        DATE APPLIED
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {dayjs(item.createdAt).format(
                                            "MMM D, YYYY"
                                        ) +
                                            ", " +
                                            dayjs(item.createdAt).format(
                                                "h:mm A"
                                            )}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        QUALIFICATION
                                    </h6>
                                    <p className="text-2md mt-1">{"unset"}</p>
                                </div>

                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        ID TYPE
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {item.doc.docType}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default RejectedTable
