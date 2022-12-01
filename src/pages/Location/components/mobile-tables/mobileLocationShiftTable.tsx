import { Checkbox } from "@mantine/core"
import { Key } from "react"
import { IoIosArrowForward } from "react-icons/io"

const MobileLocationShiftTable = ({ elements }: { elements: any }) => {
    const handleNavigate = (id: string) => {}
    return (
        <div className="mt-4">
            {elements?.map(
                (
                    element: {
                        _id: string
                        jobListing: {
                            jobType: { name: string | undefined }
                            shiftEndTime: string | number | Date
                        }
                        id: string | number | readonly string[] | undefined
                    },
                    index: Key | null | undefined
                ) => (
                    <div className="rounded bg-black-5 mb-4" key={index}>
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={element?._id}
                                    className="rounded-lg"
                                    name={element?.jobListing?.jobType?.name}
                                    // onChange={handleCheckedProduct}
                                    // checked={checkedProduct.includes(element?._id)}
                                    value={element?.id}
                                    data-testid="checkbox"
                                />
                                <label htmlFor={"2 Way"} className="capitalize">
                                    {"2-Way"}
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                    {"MEET ONSITE"}
                                </p>
                                <div className="cursor-pointer">
                                    <IoIosArrowForward
                                        size={20}
                                        style={{ color: "#889088" }}
                                        onClick={() =>
                                            handleNavigate(element?._id)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    LOCATION
                                </h6>
                                <p className="text-2md mt-1">
                                    {"Iolaire Road, New Invent..."}
                                </p>
                            </div>
                            <div className="flex justify-between mt-3">
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        APPLICANTS
                                    </h6>
                                    <p className="text-2md mt-1">{12}</p>
                                </div>
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        DURATION
                                    </h6>
                                    <p className="text-2md mt-1 pr-5">{"2 hour(s)"}</p>
                                </div>
                            </div>

                            <div className="flex justify-between mt-3">
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        DATE
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {"Nov 15, 2022 | 9-11AM"}
                                    </p>
                                </div>

                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        HOURLY RATE
                                    </h6>
                                    <p className="text-2md mt-1">{"$140/hr"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default MobileLocationShiftTable
