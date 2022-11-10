import { Checkbox, Modal } from "@mantine/core"
import dayjs from "dayjs"
import { AiFillStar } from "react-icons/ai"
import { IoIosArrowForward } from "react-icons/io"
import {  useGetShiftHistoryByJobListingId, useGetSingleSchedule } from "../../../hooks/planner/usePlanner.hooks";
import { useLocation, useParams } from "react-router-dom"
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import YellowStar from "../../../assets/YellowStar.svg"

const MobileShiftsDetailsTable = () => {
    const { jobListingId } = useParams<string>()
  
    const location = useLocation()

    const queryStatus = location.state.status

    const {
        data:shiftsData,
      } = useGetShiftHistoryByJobListingId({
        jobListingId ,
        queryStatus
      })

    const {
        data: singleShift
      } = useGetSingleSchedule({
        jobListingId: jobListingId
      })
    
    const singleElement = singleShift?.results?.find((item) => item?.jobListing?._id === jobListingId)
    
    const [opened, setOpened] = useState(false)

    return (
        <>
            <div className="mt-4 cursor-pointer" onClick={()=>setOpened(!opened)}>
                {shiftsData?.results?.map((element, index) => (
                    <div className="rounded bg-black-5 mb-4" key={index}>
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <div
                                className="flex items-center gap-2"
                            >
                                <Checkbox
                                    id={element?._id}
                                    className="rounded-lg"
                                    name={element?.jobListing?.jobType?.name}
                                    // onChange={handleCheckedProduct}
                                    // checked={checkedProduct.includes(element?._id)}
                                    value={element?.id}
                                    data-testid="checkbox"
                                />
                                <label htmlFor={element?.jobListing?.jobType?.name} className="capitalize">
                                    {element?.jobListing?.jobType?.name}
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                        {element?.jobListing?.jobMeetingPoint}
                                    </p>
                                <div className="cursor-pointer">
                                    <IoIosArrowForward
                                        size={20}
                                        style={{ color: "#889088" }}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between mt-3">
                                <div>
                                        <h6 className="text-black-50 text-3sm">
                                            NAME
                                        </h6>
                                        <p className="text-2md mt-1">
                                        {element?.operative?.firstName} {element?.operative?.lastName}
                                        </p>
                                </div>
                                <div>
                                        <h6 className="text-black-50 text-3sm">
                                            DURATION
                                        </h6>
                                        <p className="text-2md mt-1">
                                            {element?.jobListing?.shiftDurationInHours}hours
                                        </p>
                                </div>
                            </div>
                            
                            <div className="flex justify-between mt-3">
                                
                                <div>
                                    <h6 className="text-black-50 text-3sm">TIME IN</h6>
                                    {element?.clockInTime === null ? (<p className="text-2md mt-1">N/A</p>) : (<p className="text-2md mt-1">
                                        {dayjs(element?.clockInTime).format("h:mm A")}
                                    </p>)}
                                </div>
                                <div>
                                    <h6 className="text-black-50 text-3sm">TIME OUT</h6>
                                    {element?.clockOutTime === null ? (<p className="text-2md mt-1">N/A</p>) : (<p className="text-2md mt-1">
                                        {dayjs(element?.clockOutTime).format("h:mm A")}
                                    </p>)}
                                </div>
                            </div>
                            <div className="flex justify-between mt-3">
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        AMOUNT
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {element?.jobListing?.numberOfOpsRequired}
                                    </p>
                                </div>
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        RATING
                                    </h6>
                                    <div  className="flex items-center gap-1">
                                        <AiFillStar size={20} style={{color: "#FED70A"}}/>
                                        <p className="text-2md mt-1">
                                            {element?.operativeRating}
                                        </p>
                                    </div>
                                            
                                </div>
                            </div>
                            {element?.cancelStatus === false ? 
                                (<div>
                                    <h6 className="text-black-50 text-3sm">
                                        STATUS
                                    </h6>
                                    <div>
                                        <p className="text-white-100 bg-green-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                            completed
                                        </p>
                                    </div>
                                            
                                </div>)
                            :
                                (<div>
                                    <h6 className="text-black-50 text-3sm">
                                        STATUS
                                    </h6>
                                    <div>
                                        <p className="text-white-100 bg-red-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                            cancelled
                                        </p>
                                    </div>
                                            
                                </div>)}
                        </div>
                    </div>
                ))}
            </div>

            {opened && (
                <Modal 
                centered
                opened={opened}
                onClose={() => setOpened(false)}
                withCloseButton={false}
                overlayOpacity={0.55}
                overlayBlur={3}
                padding={0}
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                >
                <div>
                    <header className="bg-black-100 text-white-100 flex justify-between p-4">
                    <div className="flex gap-4 place-items-center">
                        <div>
                        <p className="font-bold text-2xl">VIEW SHIFT</p>
                        </div>
                        <div>
                        <p className="text-2md">RATINGS</p>
                        <img src={YellowStar} alt="star_icon" className="inline px-1"/>
                        <span>{singleElement?.operativeRating}</span>
                        </div>
                    </div>
                    <div className="bg-gray-80 rounded-[100%] p-3 ">
                        <FaTimes size={20} onClick={()=> setOpened(!opened)}/>
                    </div>
                    </header>
                    <p className=" px-4 pt-6 text-2md text-black-60">LOCATION</p>
                    <p className="text-2md px-4 font-medium">{singleElement?.jobListing?.jobLocation?.formattedAddress}</p>
                    <section className="grid grid-cols-2 pb-4">
                    <div>
                        <p className=" px-4 pt-6 text-2md text-black-60">SHIFT TYPE</p>
                        <p className="text-2md px-4 font-medium">{singleElement?.jobListing?.jobType?.name}</p>
                    </div>
                    <div>
                        <p className=" px-4 pt-6 text-2md text-black-60">SHIFT METHOD</p>
                        <p className="text-2md px-4 font-medium">{singleElement?.jobListing?.jobMeetingPoint}</p>
                    </div>
                    <div>
                        <p className=" px-4 pt-6 text-2md text-black-60">CERTIFICATION</p>
                        <p className="text-2md px-4 font-medium">{singleElement?.jobListing?.jobQualification?.name}</p>
                    </div>
                    <div>
                        <p className=" px-4 pt-6 text-2md text-black-60">START DATE</p>
                        <p className="text-2md px-4 font-medium">{dayjs(singleElement?.jobListing?.jobDate).format("D MMMM YYYY")}</p>
                    </div>
                    </section>
                    <hr />
                    <p className="text-2md px-4 font-medium px-4 pt-4">SHIFT DURATION : {singleElement?.jobListing?.shiftDurationInHours}Hours</p>
                    <section className="grid grid-cols-2 pb-8">
                    <div>
                        <p className=" px-4 pt-6 text-2md text-black-60">START TIME</p>
                        <p className="text-2md px-4 font-medium">{dayjs(singleElement?.jobListing?.shiftStartTime).format("H:mm A")}</p>
                    </div>
                    <div>
                        <p className=" px-4 pt-6 text-2md text-black-60">END TIME</p>
                        <p className="text-2md px-4 font-medium">{dayjs(singleElement?.jobListing?.shiftEndTime).format("H:mm A")}</p>
                    </div>
                    <div>
                        <p className=" px-4 pt-6 text-2md text-black-60">APPLIED</p>
                        <p className="text-2md px-4 font-medium">41</p>
                    </div>
                    <div>
                        <p className=" px-4 pt-6 text-2md text-black-60">ACTIVE</p>
                        <p className="text-2md px-4 font-medium text-green-100">31</p>
                    </div>
                    <div >
                        <p className=" px-4 pt-6 text-2md text-black-60">CANCELLED</p>
                        <p className="text-2md px-4 font-medium text-red-100">7</p>
                    </div>
                    </section>
                </div>
                </Modal>
            )}
        </>
    )
}

export default MobileShiftsDetailsTable
