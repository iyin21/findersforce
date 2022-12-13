
import { Checkbox, Table } from "@mantine/core"
import {  AiOutlineArrowUp } from "react-icons/ai"
import { IoIosArrowForward } from "react-icons/io"
import { ShiftsTableInterface } from "../../../types/planner/interfaces"
// import ProfileImage from "../../../assets/ProfileImage.svg"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import MobileShiftsTable from "./MobileShiftsTable"
import TimeEstimate from "./TimeEstimate"
// import ShiftStar from "../../../assets/ShiftStar.svg"



const ShiftsTable = ({ elements, status }: ShiftsTableInterface) => {
  const navigate = useNavigate()
  const handleNavigate = (id: string, status:string) => {
    navigate(`/planner/${id}`, { state: {status: status}})
  }

function getDurationBeforeCancel(millisec: number) {
  let seconds = Number((millisec / 1000).toFixed(0));
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60)
  if (minutes > 59) {
     let  hours = Math.floor(minutes / 60);
      hours = (hours >= 10) ? hours : 0 + hours;
      minutes = minutes - (hours * 60);
      minutes = (minutes >= 10) ? minutes : 0 + minutes;
  }

  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : 0 + seconds;

      return `${hours}hr ${minutes}mins`;
}

  const rows = elements?.map((element, index) => (
    <tr key={index}>
        
        <td>{ element?.jobListing?.listingId}</td>
        {/* {status !== "completed" && (<td>
          <div className="flex items-center gap-2">
            <img src={ProfileImage} alt="profile_image" />
            <p>{element?.operative?.firstName} {element?.operative?.lastName}</p>
          </div>
        </td>)} */}
        {status !== "cancelled" ? 
        (<td>{element?.jobListing?.jobType?.name}</td>)
        :
        (<td>
          <div className="flex items-center gap-2">
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
        </td>)
        }
        <td>{element?.jobListing?.jobLocation?.formattedAddress}</td>
        {status !== "ongoing" ? (<td>{dayjs(element?.jobListing?.jobDate).format("MMM D, YYYY")} | {dayjs(element?.jobListing?.shiftStartTime).format("h:mm A")} - {dayjs(element?.jobListing.shiftEndTime).format("h:mm A")}</td>)
         : (<td>{dayjs(element?.jobListing?.shiftStartTime).format("h:mm A")} - {dayjs(element?.jobListing.shiftEndTime).format("h:mm A")}</td>)}
        <td>{element?.jobListing?.jobRate?.currency}{element?.jobListing?.jobRate?.jobRatePerHourDisplayedToDepot}/hr</td>
        {
          status === "upcoming" ? (<td>{element?.jobListing?.shiftDurationInHours}hour(s)</td>) 
          : status === "completed" ? (<td>{element?.jobListing?.shiftDurationInHours}hour(s)</td>) 
          : status === "cancelled" && (<td>{getDurationBeforeCancel(((new Date(element?.cancelTime).getTime()) - new Date(element?.clockInTime).getTime()))}</td>) 
        }
        
        <td>
            <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                       {element?.jobListing?.jobMeetingPoint}
            </p>
        </td>
        {status === "ongoing" && (
          <td>
            <TimeEstimate 
            initialDate={new Date(element?.jobListing?.shiftEndTime)} 
            />
          </td>
        )}
        
        
        <td
            role="gridcell"
            className="cursor-pointer h-[60px] border-b border-neutral-5"
            
            data-testid="shifts_table"
        >
            <IoIosArrowForward size={30} style={{ color: "#889088" }} onClick={() => handleNavigate(element?.jobListing?._id, status)}  />
        </td>
    </tr>
));

const tableHeadUpcoming = [
  { list: "JOB TYPE" },
  { list: "LOCATION" },
  { list: "DATE" },
  { list: "RATE" },
  { list: "DURATION" },
  { list: "MODE" },
]
const tableHeadActive = [
  { list: "JOB TYPE" },
  { list: "LOCATION" },
  { list: "SCHEDULE" },
  { list: "RATE" },
  { list: "MODE" },
  { list: "ENDS IN" },
]
const tableHeadCompleted = [
  { list: "LOCATION" },
  { list: "DATE" },
  { list: "HOURLY RATE" },
]
  return (
    <>
      <div className="hidden lg:block overflow-x-hidden " data-testid="planner">
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
               {status === "upcoming"  && (
                <tr>
                  {tableHeadUpcoming.map((item, index) => (
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
               {status === "cancelled"  && (
                <tr>
                  {tableHeadUpcoming.map((item, index) => (
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
               {status === "ongoing" && (
                <tr>
                  {tableHeadActive.map((item, index) => (
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
               {status === "completed" && (
                <tr>
                  <th
                    style={{
                            borderBottom: "none",
                            }}
                    className="flex items-center gap-2 "
                  >
                              <Checkbox />
                              <p className="text-black-30 ">TYPE</p>
                  </th>

                  {tableHeadCompleted.map((item, index) => (
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
                  <th
                    style={{
                       borderBottom: "none",
                      }}
                  >
                    <p className="text-black-30 ">DURATION</p>
                  </th>
                  <th
                    style={{
                      borderBottom: "none",
                            }}
                    className="flex items-center gap-2 "
                  >
                    <p className="text-black-30 ">ACTIVE</p>{" "}
                    <AiOutlineArrowUp color="rgba(15, 13, 0, 0.3)" />
                  </th>
                  <th
                    style={{
                       borderBottom: "none",
                      }}
                  >
                    <p className="text-black-30 ">RATING</p>
                  </th>
                  <th
                    style={{
                       borderBottom: "none",
                      }}
                  >
                    <p className="text-black-30 ">MODE</p>
                  </th>
                </tr>
               )}
            </thead>
              <tbody>{rows}</tbody>
          </Table>
      </div>
      <div className="block lg:hidden">
        <MobileShiftsTable 
          elements={elements}
          status={status}
        />
      </div>
    </>
  )
}

export default ShiftsTable