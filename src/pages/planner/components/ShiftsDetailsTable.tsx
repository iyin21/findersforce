
import { Modal, Table } from "@mantine/core"
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi"
import { ShiftsDetailInterface } from "../../../types/planner/interfaces";
import YellowStar from "../../../assets/YellowStar.svg"
import { FaTimes } from "react-icons/fa";




const ShiftsDetailTable = ({ elements}: ShiftsDetailInterface) => {
  
  const [opened, setOpened] = useState(false)

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
                  <span>4.9</span>
                </div>
              </div>
              <div className="bg-gray-80 rounded-[100%] p-3 ">
                <FaTimes size={20}/>
              </div>
            </header>
            <p className=" px-4 pt-6 text-2md text-black-60">LOCATION</p>
            <p className="text-2md px-4 font-medium">21 Liverpool road Manchester United Kingdom</p>
            <section className="grid grid-cols-2 pb-4">
              <div>
                <p className=" px-4 pt-6 text-2md text-black-60">SHIFT TYPE</p>
                <p className="text-2md px-4 font-medium">2 - Way</p>
              </div>
              <div>
                <p className=" px-4 pt-6 text-2md text-black-60">SHIFT METHOD</p>
                <p className="text-2md px-4 font-medium">Depot first</p>
              </div>
              <div>
                <p className=" px-4 pt-6 text-2md text-black-60">CERTIFICATION</p>
                <p className="text-2md px-4 font-medium">SLG UNIT 2</p>
              </div>
              <div>
                <p className=" px-4 pt-6 text-2md text-black-60">START DATE</p>
                <p className="text-2md px-4 font-medium">3rd January 2022</p>
              </div>
            </section>
            <hr />
            <p className="text-2md px-4 font-medium px-4 pt-4">SHIFT DURATION : 2 Hours</p>
            <section className="grid grid-cols-2 pb-8">
            <div>
                <p className=" px-4 pt-6 text-2md text-black-60">START TIME</p>
                <p className="text-2md px-4 font-medium">11:30 AM</p>
              </div>
              <div>
                <p className=" px-4 pt-6 text-2md text-black-60">END TIME</p>
                <p className="text-2md px-4 font-medium">1:30 AM</p>
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
    </>
  )
}

export default ShiftsDetailTable


