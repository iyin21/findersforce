import Filter from "../../../components/ApplicationFilter/index"
import { Button } from "../../../components/index"
import Layout from "../../../components/Layout/index"
import SubscriptionTable from "../components/SubscriptionTable"
import { ApplicationFilterRequest } from "../../../types/filter/filter"
import { FaFileExport } from "react-icons/fa"
import { useGetAllSubscriptions } from "../../../hooks/subscriptions/useSubscriptions.hooks"
// import useAuthContext from "../../../hooks/auth-hooks/useAuth"

const HqSubscription = () => {
    const { data: subscriptionData } = useGetAllSubscriptions()
    // const { state } = useAuthContext()
    // console.log(state?.user)

    const applyFilter = (filter: ApplicationFilterRequest) => {}
    return (
        <Layout>
            <main className="md:p-6 p-6 mt-4 md:mt-14">
                <div className="flex justify-between">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <h1
                                className="text-2xl md:text-3xl font-creatoBold text-black-100 font-bold"
                                id="header"
                            >
                                Subscriptions
                            </h1>
                            <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                                Monthly payment to FindersForce in one glance
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Button
                            variant="clear"
                            className="py-3 font-semibold font-creatoMedium text-white-100"
                            style={{ backgroundColor: "black" }}
                            iconLeft={<FaFileExport size={20} />}
                            data-testid="download_subscription_btn"
                        >
                            Export receipt
                        </Button>
                        <div className=" hidden lg:block relative lg:pb-4 bottom-0 lg:bottom-0">
                            <div className="">
                                {" "}
                                <Filter
                                    applyFilter={applyFilter}
                                    className=""
                                />
                            </div>
                        </div>
                        <div className=" lg:hidden relative ">
                            <div className="absolute right-0 top-[70px]">
                                {" "}
                                <Filter
                                    applyFilter={applyFilter}
                                    className=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-0 pt-10 md:pt-4">
                    <SubscriptionTable elements={subscriptionData?.results} />
                </div>
            </main>
        </Layout>
    )
}

export default HqSubscription
