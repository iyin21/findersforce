import { useFormikContext } from "formik"
import { useGetJobQualificationCategory } from "../../../../../../hooks/job-board/useJobBoard.hooks"

const Summary = () => {
    const { values } = useFormikContext<{
        phoneNumber: string
        email: string
        personal_email: string
        companyName: string
        address: string
        subscription_plan: string
        num_of_locations: string
        qualification_category: string
        findersforce_depot_amount: string
        findersforce_meet_amount: string
    }>()
    const { data: categoryData } = useGetJobQualificationCategory()

    const wageArray = window.sessionStorage.getItem("wageArray")
    // @ts-ignore
    const wageArrayData = JSON.parse(wageArray)

    return (
        <div>
            <h3 className="font-creato text-xl">Summary</h3>
            <p className="font-creatoLight text-lg text-black-60">
                Confirm this information before you publish
            </p>

            <div className="grid lg:grid-cols-2 mt-5 mr-4 lg:mr-0">
                <div className="">
                    <h3 className="font-creato text-xl text-black-60">
                        Business Information
                    </h3>
                    <div className="grid grid-cols-2 mt-3 gap-3">
                        <h6 className="font-creatoLight">Depot Name</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.companyName}
                        </p>
                        <h6 className="font-creatoLight">Depot Email</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.email}
                        </p>
                        <h6 className="font-creatoLight">Address</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.address}
                        </p>
                        <h6 className="font-creatoLight">Location</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.num_of_locations}
                        </p>
                        <h6 className="font-creatoLight">Subscription Plan</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.subscription_plan}
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="font-creato text-xl text-black-60 mt-4 lg:mt-0">
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-2 mt-3 gap-2">
                        {" "}
                        <h6 className="font-creatoLight">Phone Number</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.phoneNumber}
                        </p>{" "}
                        <h6 className="font-creatoLight"> Email</h6>
                        <p className="font-creatoMedium font-semibold">
                            {values.personal_email}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-b border-black-20 my-6"></div>
            <h3 className="font-creato text-xl">Wage breakdown</h3>

            <div className="bg-black-5 p-4 rounded-lg mt-5">
                <div className="grid lg:grid-cols-2 gap-2">
                    {wageArrayData?.map((item: any, index: number) => (
                        <div className="grid grid-cols-2 gap-6" key={index}>
                            <h6 className="font-creatoMedium">
                                Qualification category
                            </h6>
                            <p className="font-creatoMedium font-semibold text-green-100">
                                {
                                    categoryData?.filter(
                                        (list) =>
                                            list?._id ===
                                            item?.qualification_category
                                    )[0]?.name
                                }
                            </p>
                            <h6 className="font-creatoLight">
                                Finders force amount (Depot first)
                            </h6>
                            <p className="font-creatoMedium font-semibold">
                                {item?.findersforce_depot_amount}
                            </p>
                            <h6 className="font-creatoLight">
                                Operative amount (Depot first per/hr)
                            </h6>
                            <p className="font-creatoMedium font-semibold">
                                {item?.operative_depot_amount || 0}
                            </p>
                            <h6 className="font-creatoLight">
                                Finders force amount (Meet on site)
                            </h6>
                            <p className="font-creatoMedium font-semibold">
                                {item?.findersforce_meet_amount}
                            </p>
                            <h6 className="font-creatoLight">
                                Operative amount (Meet on site per/hr)
                            </h6>
                            <p className="font-creatoMedium font-semibold">
                                {item?.operative_meet_amount}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Summary
