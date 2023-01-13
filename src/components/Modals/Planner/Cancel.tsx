import { Modal } from "@mantine/core"
import { useGetSingleSchedule } from "../../../hooks/planner/usePlanner.hooks"
import { Dispatch, SetStateAction } from "react"
import Profile from "../../../assets/profile.png"
import dayjs from "dayjs"

interface Props {
    openCancel: boolean
    setOpenCancel: Dispatch<SetStateAction<boolean>>
    operativeId: string
    jobListingId: string | undefined
}

const Cancel = ({
    openCancel,
    setOpenCancel,
    operativeId,
    jobListingId,
}: Props) => {
    const { data: singleElement } = useGetSingleSchedule({
        operativeId: operativeId,
        jobListingId: jobListingId,
    })

    return (
        <Modal
            centered
            opened={openCancel}
            onClose={() => setOpenCancel(false)}
            withCloseButton={false}
            overlayOpacity={0.55}
            overlayBlur={3}
            padding={0}
            closeOnClickOutside={true}
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            // styles={() => ({
            //     modal: {
            //         width: "40%",
            //     },
            // })}
        >
            <div className="p-8">
                <header className="mb-12">
                    <p className="font-bold font-creatoBold text-3xl">
                        Reason for cancellation.
                    </p>
                    <p className="text-black-50 font-creato text-lg">
                        Empathetically review your Operatives reasoning.
                    </p>
                </header>
                <div className="flex gap-6 mb-8">
                    <img src={singleElement?.results?.[0]?.operative.profileImageUrl || Profile} alt="profile" className="rounded-full  h-14 w-14"/>
                    <div>
                        <p className="text-xl font-extrabold font-creatoBold">
                            {singleElement?.results?.[0]?.operative.firstName}{" "}
                            {singleElement?.results?.[0]?.operative.lastName}
                        </p>
                        <p>
                            {
                                singleElement?.results?.[0]?.jobListing.jobType
                                    .name
                            }{" "}
                            <span className="text-black-50">|</span>{" "}
                            {
                                singleElement?.results?.[0]?.jobListing
                                    .jobLocation.formattedAddress
                            }
                            <span className="text-black-50">|</span>{" "}
                            <span className="text-red-100">
                                {dayjs(
                                    singleElement?.results?.[0]?.cancelTime
                                ).format("HH:mm")}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="mb-8">
                    <p className="font-bold font-creato text-3md">Reason</p>
                    <p className="border-2 border-black-20 rounded-lg p-3">
                        {singleElement?.results?.[0]?.cancelReason}
                    </p>
                </div>
                <div>
                    <p className="font-bold font-creato text-3md">
                        More information
                    </p>
                    <p className="bg-yellow-10 p-1 text-lg">
                        {singleElement?.results?.[0]?.cancelReasonMoreDetails}
                    </p>
                </div>
            </div>
        </Modal>
    )
}

export default Cancel
