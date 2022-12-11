import { Button } from "../../../components/index"
import { FiPlus } from "react-icons/fi"
import Layout from "../../../components/Layout/index"
import SubscriptionTable from "../components/SubscriptionTable"


const AdminSubscription = () => {
  return (
    <Layout>
        <main className="md:p-6 p-6 mt-4 md:mt-14">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-creatoBold text-black-100 font-bold" id="header">
                    Subscriptions
                </h1>
                <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                    Monthly payment to FindersForce in one glance
                </p>
            </div>
                <Button
                        variant="primary"
                        className="py-3 font-semibold font-creatoMedium"
                        iconLeft={<FiPlus size={20} />}
                //         onClick={() => setOpenJobPost(true)}
                        data-testid="record_subscription_btn"
                    >
                        Record subscription
                </Button>
          </div>
          <div className="px-0 pt-10 md:pt-4">
            <SubscriptionTable 
              elements={new Array(5).fill({
                depot:"Revive traffic",
                amount: 1200,
                contactPerson: "Shaquan Roberts",
                paymentReference: "PHFF7685RERD-799P8J",
                monthOf: "OCT 2022",
                monthPaid: "Nov 15, 2022 | 9:31 AM",
                id: "1",
              })}
            />
          </div>
        </main>
    </Layout>
  )
}

export default AdminSubscription