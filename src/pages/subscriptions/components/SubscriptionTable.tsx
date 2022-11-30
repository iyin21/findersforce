import { SubscriptionTableInterface } from "../../../types/subscriptions/interface"
import ProfileImage from "../../../assets/ProfileImage.svg"
import { Modal, Progress, Table } from "@mantine/core"
import { useState } from "react"
import MobileSubscriptionTable from "./MobileSubscriptionTable"


const SubscriptionTable = ({ elements }: SubscriptionTableInterface) => {
  const [opened, setOpened] = useState(false)

  const rows = elements?.map((element, index) => (
    <tr key={index}>
        <td> £ {element?.amount}</td>
        <td>
          <div className="flex gap-1">
            <img src={ProfileImage} alt="Profile" />
            <span>{element?.contactPerson}</span>
          </div>
        </td>
        <td> {element?.paymentReference} </td>
        <td> {element?.monthPaid} </td>
        <td className="text-green-100" onClick={() => setOpened(true)}>
          Download Reciept
        </td>
    </tr>
  ))

  const tableHead = [
    { list: "AMOUNT" },
    { list: "CONTACT PERSON" },
    { list: "PAYMENT REFERENCE" },
    { list: "MONTH PAID" },
  ]
  return (
    <>
      <div className="hidden lg:block overflow-x-hidden " data-testid="subscription">
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
              {tableHead.map((item,index) => (
                <th 
                  key={index} 
                  style={{
                  borderBottom: "none",
                }}>
                  <p className="text-black-30 ">
                            {item?.list}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="cursor-pointer">
            {rows}
          </tbody>
          
        </Table>

      </div>
      <div className="block lg:hidden">
        <MobileSubscriptionTable
          elements={elements}
        />
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
              width: "400px",
          },
      })}
        >
          <div className="bg-white-100 text-center py-14 rounded-2xl">
            <Progress  value={70} color="#4DB25D" className="w-[50%] mx-auto"/>
            <p className="font-creatoBold text-3md font-bold pt-4">Downloading....</p>
            <p className="font-creato text-3sm text-black-50">Please wait</p>
          </div>
        </Modal>
      }
    </>
  )
}

export default SubscriptionTable
