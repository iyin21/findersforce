
import { Checkbox, Table } from "@mantine/core"
import { AiFillStar, AiOutlineArrowUp } from "react-icons/ai"
import { IoIosArrowForward } from "react-icons/io"
import { ShiftsTableInterface } from "../../../types/planner/interfaces"
import ProfileImage from "../../../assets/ProfileImage.svg"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import MobileShiftsTable from "./MobileShiftsTable"
// import ShiftStar from "../../../assets/ShiftStar.svg"



const ShiftsTable = ({ elements, status }: ShiftsTableInterface) => {
  const navigate = useNavigate()
  const handleNavigate = (id: string, status:string) => {
    navigate(`/planner/${id}`, { state: {status: status}})
  }
  const currentTime = Number(dayjs().format("HH:mm:ss"));

  const rows = elements?.map((element, index) => (
    <tr key={index}>
        {status !== "completed" && (<td>
          <div className="flex items-center gap-2">
            <img src={ProfileImage} alt="profile_image" />
            <p>{element?.operative?.firstName} {element?.operative?.lastName}</p>
          </div>
        </td>)}
        {status !== "completed" ? 
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
        {status !== "active" ? (<td>{dayjs(element?.jobListing?.jobDate).format("DD/MM/YYYY")}</td>) : (<td>{new Date( '1970-01-01T' + element?.jobListing?.shiftStartTime + "z").toLocaleTimeString("en-US").slice(0,1)} - {dayjs(element?.jobListing.shiftEndTime).format("h:mm A")}</td>)}
        <td>{element?.jobListing?.jobRate?.currency}{element?.jobListing?.jobRate?.jobRatePerHourDisplayedToDepot}/hr</td>
        {status !== "active" && (<td>{element?.jobListing?.shiftDurationInHours}hrs</td>)}
        {status === "completed" && (<td>{element?.jobListing?.numberOfOpsRequired}</td>)}
        {status === "completed" && (
        <td>
          <div className="flex items-center gap-1">
            <AiFillStar size={20} style={{color: "#FED70A"}}/>
            <p>{element?.operativeRating}</p>
          </div>
        </td>
        )}
        <td>
            <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                       {element?.jobListing?.jobMeetingPoint}
            </p>
        </td>
        {status === "active" && (
          <td>
            <p className="text-yellow-100 bg-black-100 rounded-lg text-center font-bold p-1 w-32 px-3 py-1 text-2mxl font-creatoBlack font-extrabold">
            { currentTime - Number(dayjs(element?.jobListing?.shiftEndTime).format("HH:mm:ss"))}
            </p>
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
  { list: "NAME" },
  { list: "JOB TYPE" },
  { list: "LOCATION" },
  { list: "DATE" },
  { list: "RATE" },
  { list: "DURATION" },
  { list: "MODE" },
]
const tableHeadActive = [
  { list: "NAME" },
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
               {status === "upcoming" && (
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
               {status === "active" && (
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