import Layout from "../../../components/Layout/index"
import SubscriptionTable from "../components/SubscriptionTable"


const HqSubscription = () => {
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
          </div>
          <div className="px-0 pt-10 md:pt-4">
            <SubscriptionTable 
              elements={new Array(8).fill({
                amount: 1200,
                contactPerson: "Shaquan Roberts",
                paymentReference: "PHFF7685RERD-799P8J",
                monthPaid: "Nov 15, 2022 | 9:31 AM",
                id: "1",
              })}
            />
          </div>
        </main>
    </Layout>
  )
}

export default HqSubscription