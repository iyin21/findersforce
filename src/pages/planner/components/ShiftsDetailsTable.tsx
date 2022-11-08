
import { Modal, Table } from "@mantine/core"
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi"
// import { ShiftResponse, ShiftsDetailInterface } from "../../../types/planner/interfaces";
import YellowStar from "../../../assets/YellowStar.svg"
import { FaTimes } from "react-icons/fa";
import Layout from "../../../components/layout/index";
import {  useGetShiftHistoryByJobListingId, useGetSingleSchedule } from "../../../hooks/planner/usePlanner.hooks";
import dayjs from "dayjs";
import { AiFillStar, AiOutlineArrowLeft } from "react-icons/ai";
import ProfileImage from "../../../assets/ProfileImage.svg"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
// import useAuthContext from "../../../hooks/auth-hooks/useAuth";




const ShiftsDetailTable = () => {
  const { jobListingId } = useParams<string>()
  
  const location = useLocation()
  const queryStatus = location.state.status
  // console.log(queryStatus,jobListingId)
  const {
    data:shiftsData,
    isLoading: isLoadingShiftsData
  } = useGetShiftHistoryByJobListingId({
    jobListingId ,
    queryStatus
  })
  const {
    data: singleShift
  } = useGetSingleSchedule({
    jobListingId: jobListingId
  })
  // console.log(singleShift?.results)
// console.log(data?.data?.results)
// const { state } = useAuthContext()
// console.log(state?.jwt?.token)

const navigate = useNavigate()



  
const [opened, setOpened] = useState(false)

  const rows = shiftsData?.results?.map((element, index) => (
    <tr key={index}>
      <td>
        <div className="flex items-center gap-2">
          <img src={ProfileImage} alt="profile_image" />
          <p>{element?.operative?.firstName} {element?.operative?.lastName}</p>
        </div>
      </td>
      <td>{dayjs(element?.clockInTime).format("h:mm A")}</td>
      <td>{dayjs(element?.clockOutTime).format("h:mm A")}</td>
      <td>{element?.jobListing?.shiftDurationInHours}hrs</td>
      <td>{element?.jobListing?.jobRate?.currency}{element?.jobListing?.jobRate?.jobRatePerHourDisplayedToDepot}/hr</td>
      <td>
          <div className="flex items-center gap-1">
            <AiFillStar size={20} style={{color: "#FED70A"}}/>
            <p>{element?.operativeRating}</p>
          </div>
      </td>
      {element?.cancelStatus === false ? 
      (<td>
        <p className="text-white-100 bg-green-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
          COMPLETED
        </p>
      </td>) 
      :
      (<td>
        <p className="text-white-100 bg-red-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
          CANCELLED
        </p>
      </td>)
      }
      <td>
        <BiDotsVerticalRounded size={20}/>
      </td>
    </tr>
  ));

  const tableHead = [
    { list: "NAME" },
    { list: "TIME IN" },
    { list: "TIME OUT" },
    { list: "DURATION" },
    { list: "AMOUNT" },
    { list: "RATING" },
    { list: "STATUS" },
    { list: "MORE" },
]
const element = shiftsData?.results?.find((item) => item?.jobListing?._id === jobListingId)
const singleElement = singleShift?.results?.find((item) => item?.jobListing?._id === jobListingId)

  return (
    <>
    <Layout>
      {isLoadingShiftsData ? 
      (<div className="h-screen w-full flex mt-24 justify-center">
      <CgSpinner className="animate-spin text-primary-90 text-4xl" />
      </div>)
      :
      (
      <>
        <div className="md:p-6 px-6 py-8">
            <div className="bg-gray-80 w-fit p-3 rounded-lg cursor-pointer">
              <AiOutlineArrowLeft size={20} onClick={() => navigate("/planner")}/>
            </div>
            <div className="flex flex-col">
                <h1 className="text-xl md:text-3xl font-creatoBold text-black-100 font-bold">
                  {element?.jobListing?.jobType?.name}
                </h1>
                <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                {element?.jobListing?.jobLocation?.formattedAddress} | {element?.jobListing?.jobMeetingPoint} | {dayjs(element?.jobListing?.jobDate).format("DD/MM/YYYY")}
                </p>
            </div>
        </div>
        <div className="hidden lg:block " data-testid="job_board">
          <Table
          style={{
            backgroundColor: "#FFFFFF",
            fontFamily: "CreatoDisplay",
            cursor: "pointer"
            }}
          className={"table"}
          verticalSpacing="md"
          data-testid="table-data"
          role="grid"
          >
            <thead>
              <tr>
                {tableHead.map((item, index) => (
                    <th key={index}>
                      {item?.list}
                    </th>
                ))}
              </tr>
            </thead> 
            <tbody onClick={()=> setOpened(!opened)}>
                {rows}
            </tbody>         
          </Table>
        </div>
      </>
      )
      }
      

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
      </Layout>
    </>
  )
}

export default ShiftsDetailTable


