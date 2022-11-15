
import { Modal, Progress, Table } from "@mantine/core"
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi"
import { FaTimes } from "react-icons/fa";
import Layout from "../../../components/Layout/index";
import {  useGetOperativeRatingSummary, useGetShiftHistoryByJobListingId, useGetSingleSchedule } from "../../../hooks/planner/usePlanner.hooks";
import dayjs from "dayjs";
import { AiFillStar, AiOutlineArrowLeft } from "react-icons/ai";
import { TfiLocationPin } from "react-icons/tfi";
import ProfileImage from "../../../assets/ProfileImage.svg"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import Pagination from "../../../components/Pagination/pagination"
import Filter from "../../../components/Filter/index"
import { FilterRequest } from "../../../types/filter/filter";
import MobileShiftsDetailsTable from "./MobileShiftsDetailsTable";
import Message from "../../../assets/Messaging.svg"
import { useGetDashboardAnalytics } from "../../../hooks/dashboard/useDashboard.hook";



const ShiftsDetailTable = () => {
  const { jobListingId } = useParams<string>()
  
  const location = useLocation()

  const queryStatus = location.state.status

  

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


  const {data:dashboardAnalytics} = useGetDashboardAnalytics();

  const navigate = useNavigate()
  const [activePage, setActivePage] = useState(1)

  const applyFilter = (filter: FilterRequest) => {}


    const handleActivePage = (pageNumber: number) => {
        setActivePage(pageNumber)
    }



  
const [opened, setOpened] = useState(false)

  const rows = shiftsData?.results?.map((element, index) => (
    <tr key={index}>
      <td>
        <div className="flex items-center gap-2">
          <img src={ProfileImage} alt="profile_image" />
          <p>{element?.operative?.firstName} {element?.operative?.lastName}</p>
        </div>
      </td>
      {element?.clockInTime === null ? (<td>N/A</td>):(<td>{dayjs(element?.clockInTime).format("h:mm A")}</td>) }
      {element?.clockOutTime === null ? (<td>N/A</td>):(<td>{dayjs(element?.clockOutTime).format("h:mm A")}</td>)}
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


const { data: operaiveData} = useGetOperativeRatingSummary({id: singleElement?.operative?._id})
console.log(operaiveData)
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
            <div className="lg:flex justify-between">
                <div>
                  <h1 className="text-xl md:text-3xl font-creatoBold text-black-100 font-bold">
                    {element?.jobListing?.jobType?.name}
                  </h1>
                  <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                  {element?.jobListing?.jobLocation?.formattedAddress} | {element?.jobListing?.jobMeetingPoint} | {dayjs(element?.jobListing?.jobDate).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="relative lg:pb-4 bottom-0 lg:bottom-0">
                  <div className="absolute right-0 ">
                  {" "}
                    <Filter applyFilter={applyFilter} />
                  </div>
                </div>
            </div>
        </div>
        <div className="hidden lg:block " data-testid="planner">
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
        <div className="block lg:hidden">
          <MobileShiftsDetailsTable 
          />
        </div>
        <Pagination
                page={activePage}
                total={activePage}
                onChange={handleActivePage}
                boundaries={1}
                recordPerpage={
                    shiftsData?.results
                        ? shiftsData?.results.length
                        : 1
                }
        />
      </>
      )
      }
      

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
                    {Number(dashboardAnalytics?.rating?.professionalismScore) <= 2 ? (<Progress value={Number(dashboardAnalytics?.rating?.professionalismScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
                      :
                      (<Progress value={Number(dashboardAnalytics?.rating?.professionalismScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
                    }
                  </div>
                  <div className="flex justify-between place-items-center">
                    <p className=" text-[md] font-medium">Punctuality</p>
                    {Number(dashboardAnalytics?.rating?.helpfulnessScore) <= 2 ? (<Progress value={Number(dashboardAnalytics?.rating?.helpfulnessScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
                    :
                    (<Progress value={Number(dashboardAnalytics?.rating?.helpfulnessScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
                    }
                  </div>
                  <div className="flex justify-between place-items-center">
                    <p className=" text-[md] font-medium">Helpfulness</p>
                    {Number(dashboardAnalytics?.rating?.organizationScore) <= 2 ? (<Progress value={Number(dashboardAnalytics?.rating?.organizationScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
                    :
                    (<Progress value={Number(dashboardAnalytics?.rating?.organizationScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
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
                  <p className="text-2md px-8 font-medium">{singleElement?.jobListing?.shiftDurationInHours} Hrs 
                  ({dayjs(singleElement?.jobListing?.shiftStartTime).format("h:mm A")} - {dayjs(singleElement?.jobListing?.shiftEndTime).format("h:mm A")} )</p>
                </div>
              </section>
          </Modal>
      }
      </Layout>
    </>
  )
}

export default ShiftsDetailTable


