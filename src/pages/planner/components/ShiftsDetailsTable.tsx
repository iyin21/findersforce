
import { Table } from "@mantine/core"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { ShiftsDetailInterface } from "../../../types/planner/interfaces";




const ShiftsDetailTable = ({ elements}: ShiftsDetailInterface) => {

  const rows = elements.map((element, index) => (
    <tr key={index}>
      <td>{element?.name}</td>
      <td>{element?.time_in}</td>
      <td>{element?.time_out}</td>
      <td>{element?.duration}</td>
      <td>{element?.amount}</td>
      <td>{element?.rating}</td>
      {element?.status === "COMPLETED" ? 
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
        <p>{element?.more}</p>
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
  return (
    <>

      <div className="flex justify-between items-center">
          <div className="flex flex-col">
              <h1 className="text-xl md:text-3xl font-creatoBold text-black-100 font-bold">
                2- Way 
              </h1>
              <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
              Iolaire Road, New Invention | Meet on site | Nov 15, 2022
              </p>
          </div>
      </div>
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
            <tr>
              {tableHead.map((item, index) => (
                  <th key={index}>
                    {item?.list}
                  </th>
              ))}
            </tr>
          </thead> 
          <tbody>
              {rows}
          </tbody>         
        </Table>
      </div>
    </>
  )
}

export default ShiftsDetailTable


