import { SubscriptionTableInterface } from "../../../types/subscriptions/interface"
import ProfileImage from "../../../assets/ProfileImage.svg"
import { Modal, Progress, Table } from "@mantine/core"
import { useMemo, useState } from "react"
import MobileSubscriptionTable from "./MobileSubscriptionTable"
import useAuthContext from "../../../hooks/auth-hooks/useAuth"
import { admin, HQDepotType } from "../../../utils/user-types"


const SubscriptionTable = ({ elements }: SubscriptionTableInterface) => {
  const [opened, setOpened] = useState(false)
  const { state } = useAuthContext();
                
  const userState = useMemo(() => {
      return state.user;
    }, [state.user]);

  const rows = elements?.map((element, index) => (
    <tr key={index}>
        { userState?.accountType === admin && 
          <td>
            {element?.depot}
          </td>
        }
        <td> £ {element?.amount}</td>
        <td>
          <div className="flex gap-1">
            <img src={ProfileImage} alt="Profile" />
            <span>{element?.contactPerson}</span>
          </div>
        </td>
        <td> {element?.paymentReference} </td>
        { userState?.accountType === admin && 
          <td>
            {element?.monthOf}
          </td>
        }
        <td> {element?.monthPaid} </td>
        {userState?.depotRole === HQDepotType && 
        <td className="text-green-100" onClick={() => setOpened(true)}>
        Download Reciept
      </td>}
    </tr>
  ))

  const HqTableHead = [
    { list: "AMOUNT" },
    { list: "CONTACT PERSON" },
    { list: "PAYMENT REFERENCE" },
    { list: "MONTH PAID" },
  ]
  const AdTableHead = [
    { list: "DEPOT" },
    { list: "AMOUNT" },
    { list: "REGISTERED BY" },
    { list: "SUBSCRIPTION ID" },
    { list: "MONTH OF" },
    { list: "DATE PAID" },
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
            {userState?.accountType === admin && 
            <tr>
            {AdTableHead.map((item,index) => (
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
          </tr>}

          {userState?.depotRole === HQDepotType && 
          <tr>
          {HqTableHead.map((item,index) => (
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
        </tr>}
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
