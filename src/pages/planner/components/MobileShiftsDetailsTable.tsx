import { Checkbox, Modal, Progress } from "@mantine/core"
import dayjs from "dayjs"
import { AiFillStar } from "react-icons/ai"
import { IoIosArrowForward } from "react-icons/io"
import {  useGetOperativeRatingSummary, useGetShiftHistoryByJobListingId, useGetSingleSchedule } from "../../../hooks/planner/usePlanner.hooks";
import { useLocation, useParams } from "react-router-dom"
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import Message  from "../../../assets/Messaging.svg";
import { TfiLocationPin } from "react-icons/tfi";

const MobileShiftsDetailsTable = () => {
    const { jobListingId } = useParams<string>()
  
    const location = useLocation()

    const queryStatus = location?.state?.status

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

    

    
    const singleElement = singleShift?.results?.find((item) => item?.jobListing?._id === jobListingId);
    
    const { data: operativeData} = useGetOperativeRatingSummary({id: singleElement?.operative?._id});
    
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
                                            {element?.jobListing?.shiftDurationInHours}hour(s)
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

            {opened && 
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
          styles={() => ({
            modal: {
                width: "580px",
            },
        })}
        >
              <header className="bg-black-100 text-white-100 flex justify-between p-4">
                <div className="flex gap-4 place-items-center">
                  <div>
                    <p className="font-bold text-2xl">Shift Details</p>
                  </div>
                </div>
                <div className="p-3 ">
                  <FaTimes size={20} onClick={()=> setOpened(!opened)}/>
                </div>
              </header>
              <div className="flex justify-between bg-yellow-20 p-5 mt-8 w-[90%] mx-auto rounded-lg">
                <div className="flex gap-5">
                  <img src={singleElement?.operative?.profileImageUrl} alt="profile" className="mt-3 w-10 h-10 rounded-[100%]" />
                  <div>
                    <p className="text-sm">OPERATIVE</p>
                    <p className="font-extrabold text-xl">{singleElement?.operative?.firstName} {singleElement?.operative?.lastName}</p>
                    <p className="text-sm">Joined {dayjs(singleElement?.operative?.createdAt).format("YYYY")} years ago |<span className="text-green-100"> {singleElement?.jobListing?.jobMatchPercentage}% Match</span></p>
                  </div>
                </div>
                <div>
                  <img src={Message} alt="message icon" className="inline" />
                  <p className="inline p-2 font-bold">Message {singleElement?.operative?.firstName}</p>
                </div>
              </div>
              <div className="flex justify-between bg-yellow-10 p-5 mt-8 w-[90%] mx-auto rounded-lg">
                <div className="flex gap-5 w-[40%]">
                  <div>
                    <p className="text-2md">Rating</p>
                    <p>{singleElement?.operativeRating} <AiFillStar size={20} style={{color: "#FED70A"}}/></p>
                  </div>
                </div>
                <div className="w-[50%]">
                <div className="flex justify-between place-items-center">
                    <p className=" text-[md] font-medium">Professionalism</p>
                    {Number(operativeData?.avgProfessionalismScore) <= 2 ? (<Progress value={Number(operativeData?.avgProfessionalismScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
                      :
                      (<Progress value={Number(operativeData?.avgProfessionalismScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
                    }
                  </div>
                  <div className="flex justify-between place-items-center">
                    <p className=" text-[md] font-medium">Punctuality</p>
                    {Number(operativeData?.avgHelpfulnessScore) <= 2 ? (<Progress value={Number(operativeData?.avgHelpfulnessScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
                    :
                    (<Progress value={Number(operativeData?.avgHelpfulnessScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
                    }
                  </div>
                  <div className="flex justify-between place-items-center">
                    <p className=" text-[md] font-medium">Helpfulness</p>
                    {Number(operativeData?.avgOrganizationScore) <= 2 ? (<Progress value={Number(operativeData?.avgOrganizationScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
                    :
                    (<Progress value={Number(operativeData?.avgOrganizationScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
                    }
                  </div>
                </div>
              </div>
              <p className=" px-8 pt-6 text-2md text-black-60">LOCATION</p>
              <p className="text-2md px-8 font-medium"><TfiLocationPin size={20} style={{color: "#E94444"}} className="inline"/> {singleElement?.jobListing?.jobLocation?.formattedAddress}</p>
              <section className="grid grid-cols-2 pb-4">
                <div>
                  <p className=" px-8 pt-6 text-2md text-black-60">SHIFT TYPE</p>
                  <p className="text-2md px-8 font-medium">{singleElement?.jobListing?.jobType?.name}</p>
                </div>
                <div>
                  <p className=" px-8 pt-6 text-2md text-black-60">SHIFT METHOD</p>
                  <p className="text-2md ml-4 px-8 font-medium bg-yellow-100 rounded-3xl w-fit">{singleElement?.jobListing?.jobMeetingPoint}</p>
                </div>
                <div>
                  <p className=" px-8 pt-6 text-2md text-black-60">CERTIFICATION</p>
                  <p className="text-2md px-8 font-medium">{singleElement?.jobListing?.jobQualification?.name}</p>
                </div>
                <div>
                  <p className=" px-8 pt-6 text-2md text-black-60">SHIFT DATE</p>
                  <p className="text-2md px-8 font-medium">{dayjs(singleElement?.jobListing?.jobDate).format("MMMM D, YYYY")}</p>
                </div>
                <div>
                  <p className=" px-8 pt-6 text-2md text-black-60">SHIFT DURATION</p>
                  <p className="text-2md px-8 font-medium">{singleElement?.jobListing?.shiftDurationInHours} Hour(s) 
                  ({dayjs(singleElement?.jobListing?.shiftStartTime).format("h:mm A")} - {dayjs(singleElement?.jobListing?.shiftEndTime).format("h:mm A")} )</p>
                </div>
              </section>
          </Modal>
      }
        </>
    )
}

export default MobileShiftsDetailsTable
