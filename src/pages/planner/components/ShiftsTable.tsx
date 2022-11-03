
import { Checkbox, Table } from "@mantine/core"
import { AiFillStar, AiOutlineArrowUp } from "react-icons/ai"
import { IoIosArrowForward } from "react-icons/io"
import { ShiftsTableInterface } from "../../../types/planner/interfaces"
import ProfileImage from "../../../assets/ProfileImage.png"
import ShiftStar from "../../../assets/ShiftStar.svg"



const ShiftsTable = ({ elements, status }: ShiftsTableInterface) => {

  const rows = elements.map((element, index) => (
    <tr key={index}>
        {status !== "completed" && (<td>
          <div className="flex items-center gap-2">
            <img src={ProfileImage} alt="profile_image" />
            <p>{element?.name}</p>
          </div>
        </td>)}
        {status !== "completed" ? 
        (<td>{element?.job_type}</td>)
        :
        (<td>
          <div className="flex items-center gap-2">
              <Checkbox
                  id={element?.id}
                  className="rounded-lg"
                  name={element?.job_type}
                  // onChange={handleCheckedProduct}
                  // checked={checkedProduct.includes(element?._id)}
                  value={element?.id}
                  data-testid="checkbox"
              />
              <label htmlFor={element?.job_type} className="capitalize">
                  {element?.job_type}
              </label>
          </div>
        </td>)
        }
        <td>{element?.location}</td>
        {status !== "active" ? (<td>{element?.date}</td>) : (<td>{element?.schedule}</td>)}
        <td>{element?.hourly_rate}</td>
        {status !== "active" && (<td>{element?.duration}</td>)}
        {status === "completed" && (<td>{element?.active}</td>)}
        {status === "completed" && (
        <td>
          <div className="flex items-center gap-1">
            <AiFillStar size={20} style={{color: "#FED70A"}}/>
            <p>{element?.rating}</p>
          </div>
        </td>
        )}
        {element?.mode === "MEET ONSITE" && 
          ( <td>
            <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        MEET ONSITE
            </p>
           </td>
          )}
        {status === "active" && (
          <td>
            <p className="text-yellow-100 bg-black-100 rounded-lg text-center font-bold p-1 w-fit px-3 py-1 text-2mxl font-creatoBlack font-extrabold">
            { element?.ends_in}
            </p>
          </td>
        )}
        
        
        <td
            role="gridcell"
            className="cursor-pointer h-[60px] border-b border-neutral-5"
            // onClick={() => {
            //     setActiveId(element._id)
            // }}
            data-testid="shifts_table"
        >
            <IoIosArrowForward size={30} style={{ color: "#889088" }} />
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
      <div className="hidden lg:block " data-testid="job_board">
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
        </>
  )
}

export default ShiftsTable