const ProfileWages = () => {
    const wageArrayData = [{}]
    return (
        <div className="mt-6">
            <h3 className="font-creato text-xl text-black-60">
                Wage breakdown (per hour)
            </h3>

            <div className="bg-black-5 p-4 rounded-lg mt-5">
                <div className="grid lg:grid-cols-2 gap-2">
                    {wageArrayData?.map((item: any, index: number) => (
                        <div className="grid grid-cols-2 gap-6" key={index}>
                            <h6 className="font-creatoMedium">
                                Qualification category
                            </h6>
                            <p className="font-creatoMedium font-semibold text-green-100">
                                {/* {
                                    categoryData?.filter(
                                        (list) =>
                                            list?._id ===
                                            item?.qualification_category
                                    )[0]?.name
                                } */}{" "}
                                N/A
                            </p>
                            <h6 className="font-creatoLight">
                                Finders force amount (Depot first)
                            </h6>
                            <p className="font-creatoMedium font-semibold">
                                {item?.findersforce_depot_amount || 0}
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
                                {item?.findersforce_meet_amount || 0}
                            </p>
                            <h6 className="font-creatoLight">
                                Operative amount (Meet on site per/hr)
                            </h6>
                            <p className="font-creatoMedium font-semibold">
                                {item?.operative_meet_amount || 0}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileWages
