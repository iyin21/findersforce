import { Modal, Table } from "@mantine/core"
import { Checkbox } from "../../../../../../components"
import dayjs from "dayjs"
import { IoIosArrowForward } from "react-icons/io"
import Star from "../../../../../Applications/assets/star.svg"
import { Result } from "../../../../../../types/payment/interface"
import { useState } from "react"
import { MdCancel } from "react-icons/md"
import Check from "../../../../../../assets/check.svg"
import { BsCheck } from "react-icons/bs"
import { useUpdatePaymentHistory } from "../../../../../../hooks/payment/usePayment.hook"

interface Prop {
    elements: Result[]
}
const PendingCompletedTable = ({ elements }: Prop) => {
    const [opened, setOpened] = useState(false)
    const [bulkPressed, setBulkPressed] = useState(false)
    const [operativeName, setOperativeName] = useState("")
    const [operativeTransactionIds, setOperativeTransactionIds] = useState<
        string[]
    >([])
    const { data, isLoading, mutate } = useUpdatePaymentHistory()

    data?.status === "success" ? setOpened(false) : null
    const checked = operativeTransactionIds.length === elements.length

    const handleOpenModal = (operativeName: string, id: string) => {
        setBulkPressed(false)
        setOperativeName(operativeName)
        operativeTransactionIds.includes(id)
            ? null
            : operativeTransactionIds.push(id)
        setOperativeTransactionIds(operativeTransactionIds)
        setOpened(true)
    }

    const handlePay = () => {
        mutate({ transactionIds: operativeTransactionIds })
    }

    const handleCheckedShift = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setOperativeTransactionIds([...operativeTransactionIds, value])
        } else {
            setOperativeTransactionIds(
                operativeTransactionIds.filter((item) => item !== value)
            )
        }
    }

    const allOperativeTransactionIds = elements.map((item) => item._id)
    const handleCheckAllBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked
        if (isChecked) {
            setOperativeTransactionIds(allOperativeTransactionIds)
        } else {
            setOperativeTransactionIds([])
        }
    }

    const handleSelectAll = () => {
        setOperativeTransactionIds(allOperativeTransactionIds)
    }

    const handleClearSelection = () => {
        setOperativeTransactionIds([])
    }

    const handleBulkpress = () => {
        setBulkPressed(true)
        setOpened((state) => !state)
    }

    const rows = elements.map((item, index) => (
        <tr key={index}>
            <td>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id={item?.schedule._id}
                        name={item.schedule._id}
                        onChange={handleCheckedShift}
                        checked={operativeTransactionIds.includes(item._id)}
                        className="rounded-lg"
                        value={item?._id}
                        data-testid="checkbox"
                    />
                </div>
            </td>
            <td>{index + 1}</td>
            <td>
                <span className="pl-2 font-creato text-lg">
                    {item.operative.firstName + " " + item.operative.lastName}
                </span>
            </td>
            <td>
                <span className="text-lg font-creato">
                    {item.schedule.jobListing.jobRate.currency +
                        item.schedule.jobListing.jobRate
                            .jobRatePerHourDisplayedToOp}
                </span>
                <span className="text-lg font-creato text-black-60">/hour</span>
            </td>
            <td>
                <span className="text-lg font-creato">
                    {item.schedule.jobListing.shiftDurationInHours + " hour"}
                </span>
            </td>

            <td>
                {item.schedule.jobListing.jobMeetingPoint === "SITE" ? (
                    <span className="bg-yellow-100 px-3 py-1 text-3sm rounded-full text-3sm font-bold">
                        {"MEET ONSITE"}
                    </span>
                ) : (
                    <span className="bg-white-10 px-3 py-1 text-3sm rounded-full text-3sm font-bold">
                        {"DEPOT FIRST"}
                    </span>
                )}
            </td>
            <td>
                {item.schedule.cancelStatus ? (
                    <span className="bg-red-100 px-3 py-1 text-3sm text-white-100 rounded-full text-3sm font-bold">
                        {"CANCELLED"}
                    </span>
                ) : (
                    <span className="bg-green-100 px-3 py-1 text-3sm text-white-100 rounded-full text-3sm font-bold">
                        {"COMPLETED"}
                    </span>
                )}
            </td>
            <td>
                <p className="flex">
                    <img src={Star} alt="" />
                    <span className="pl-1">
                        {item.depotRegion.averageRating || 0}
                    </span>
                </p>
            </td>
            <td>
                <button
                    onClick={() =>
                        handleOpenModal(
                            `${
                                item.operative.firstName +
                                " " +
                                item.operative.lastName
                            }`,
                            item._id
                        )
                    }
                    className="py-2 px-6 bg-black-100 text-white-100 rounded rounded-tr-2xl font-bold text-center"
                >
                    Pay
                </button>
            </td>
        </tr>
    ))

    const tableHead = [
        "operative",
        "amount",
        "hours completed",
        "mode",
        "status",
        "ratings",
        "action",
    ]

    return (
        <>
            {" "}
            <div className="relative">
                <button
                    disabled={operativeTransactionIds.length <= 1}
                    className="absolute top-[-120px] right-0 bg-yellow-100 py-4 rounded rounded-tr-2xl flex items-center font-bold body-medium px-12"
                    onClick={handleBulkpress}
                >
                    Bulk pay
                </button>
            </div>
            {operativeTransactionIds.length > 0 && (
                <div className="relative">
                    <div className="absolute top-[-50px] left-[350px] rounded-[20px] bg-black-5 py-2.5 px-5">
                        {checked ? (
                            <>
                                <span className="text-lg font-medium pr-5">
                                    All {operativeTransactionIds.length} pending operatives
                                    are selected.
                                </span>
                                <span
                                    onClick={handleClearSelection}
                                    className="text-lg text-red-100 cursor-pointer"
                                >
                                    Clear selection
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="text-lg font-medium pr-5">
                                    {operativeTransactionIds.length} operatives
                                    are selected.
                                </span>
                                <span
                                    onClick={handleSelectAll}
                                    className="cursor-pointer text-lg text-green-100"
                                >
                                    Select all {elements.length} pending
                                    operatives
                                </span>
                            </>
                        )}
                    </div>
                </div>
            )}
            <div className="hidden lg:block ">
                <Table verticalSpacing="md">
                    <thead>
                        <tr>
                            <th
                                style={{
                                    borderBottom: "none",
                                }}
                                className="flex items-center gap-2 "
                            >
                                <Checkbox
                                    onChange={handleCheckAllBox}
                                    checked={checked}
                                    className="rounded-lg"
                                    data-testid="checkbox"
                                    value=""
                                />
                            </th>
                            <th
                                style={{
                                    color: "rgba(15, 13, 0, 0.3)",
                                    fontSize: "13px",
                                    borderBottom: "none",
                                }}
                                className="text-black-30"
                            >
                                {"NO"}
                            </th>
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
                        onClick={() => {}}
                    >
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <p className="font-medium text-2lg">
                                {item.operative.firstName +
                                    " " +
                                    item.operative.lastName}
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
                                        {"item.email"}
                                    </p>
                                </div>

                                <div className="mt-2">
                                    <h6 className="text-black-50 text-3sm">
                                        GENDER
                                    </h6>
                                    <p className="text-2md mt-1">{""}</p>
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
                                    <p className="text-2md mt-1">{}</p>
                                </div>

                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        SHIFT COMPLETED
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {"item.completedShifts"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                centered
                closeOnClickOutside={false}
                closeOnEscape={false}
                overlayBlur={3}
                overlayOpacity={0.55}
                withCloseButton={false}
                padding={0}
                size={500}
                styles={() => ({
                    modal: {
                        borderRadius: "10px",
                    },
                })}
            >
                <div>
                    <div className="bg-black-100 p-10 pt-5 rounded-tr-[10px] rounded-tl-[10px]">
                        <MdCancel
                            onClick={() => setOpened(false)}
                            size={24}
                            color="white"
                            className="flex justify-end ml-auto cursor-pointer"
                        />
                        <img src={Check} alt="verify icon" className="m-auto" />
                    </div>
                    <div className="p-10 pb-4 flex flex-col items-center">
                        <p className="text-center font-creato font-extrabold text-xl px-4">
                            Confirm Payment
                        </p>
                        <span className="pt-2 text-center text-lg font-medium font-creato px-2">
                            {bulkPressed ? (
                                <>
                                    {" "}
                                    {
                                        "This action will affect all selected operatives. Are you sure you want to continue."
                                    }
                                </>
                            ) : (
                                <p>
                                    Are you sure you want to pay this{" "}
                                    {operativeName}
                                    for this shift?
                                </p>
                            )}
                        </span>
                    </div>
                    <div className="p-10 pt-0 flex items-center justify-end pt-6">
                        <span
                            onClick={() => setOpened(false)}
                            className="cursor-pointer text-2md font-bold font-creato mr-8"
                        >
                            Cancel
                        </span>
                        <button
                            className={`${
                                isLoading ? "opacity-60" : "opacity-100"
                            } bg-green-100 px-5 py-2 ml-4 flex text-white-100 items-center rounded rounded-tr-2xl font-bold body-medium px-6`}
                            onClick={handlePay}
                            disabled={isLoading}
                        >
                            <BsCheck size="30px" color="white" />
                            {isLoading ? "Loading.." : "Pay"}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default PendingCompletedTable
