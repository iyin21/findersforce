import {
    useGetShiftHistoryByJobListingId,
    useRateOperative,
} from "../../../hooks/planner/usePlanner.hooks"
import { AiFillStar, AiOutlineArrowLeft, AiOutlineCheck } from "react-icons/ai"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Layout from "../../../components/Layout/index"
import { CgSpinner } from "react-icons/cg"
import Profile from "../../../assets/profile.png"
import { Button, Checkbox } from "../../../components/index"
import { Table } from "@mantine/core"
import { Dispatch, SetStateAction, useState } from "react"
import MobileRateOperativesTable from "./MobileRateOperativesTable"
import EmptyView from "../../../components/EmptyStates/index"

const RateOperatives = () => {
    const { jobListingId } = useParams<string>()
    const navigate = useNavigate()
    const location = useLocation()

    const queryStatus = location?.state?.status
    const scheduleId = location?.state?.scheduleId

    const [checkedOperative, setCheckedOperative] = useState("")
    const [professionalismScore, setProfessionalismScore] = useState(0)
    const [punctualityScore, setPunctualityScore] = useState(0)
    const [helpfulnessScore, setHelpfulnessScore] = useState(0)
    //     console.log(checkedOperative)
    //     console.log(scheduleId)

    const { data: shiftsData, isLoading: isLoadingShiftsData } =
        useGetShiftHistoryByJobListingId({
            jobListingId,
            queryStatus,
        })
    const { mutate } = useRateOperative()
    
    const handleCheckedOperative = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setCheckedOperative(value)
        } else {
            setCheckedOperative("")
        }
    }
    const values = {
        operativeId: checkedOperative,
        scheduleId: scheduleId,
        professionalismScore: professionalismScore,
        punctualityScore: punctualityScore,
        helpfulnessScore: helpfulnessScore,
    }

    // console.log(checkedOperative)

    const ratingShiftsData = shiftsData?.results.filter(
        (item) => item?.depotHasRated === false
    )
    // console.log(ratingShiftsData)
    //     console.log(values)
    const row = ratingShiftsData?.map((item, index) => (
        <tr key={index}>
            <td>
                <div
                    className="flex items-center"
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <Checkbox
                        id={item?.operative?._id}
                        className="rounded-lg"
                        onChange={handleCheckedOperative}
                        name={item?.operative?._id}
                        //         checked={checkedShift.includes(item?.operative?._id)}
                        value={item?.operative?._id}
                        data-testid="checkbox"
                    />
                    <label htmlFor={item?.operative?._id}>{index + 1}</label>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <img src={item?.operative.profileImageUrl ||Profile} alt="profile_image" className="rounded-full  h-8 w-8" />
                    <p>
                        {item?.operative?.firstName} {item?.operative?.lastName}
                    </p>
                </div>
            </td>
            <td>
                <ProfessionalismStar
                    professionalismScore={professionalismScore}
                    setProfessionalismScore={setProfessionalismScore}
                />
            </td>
            <td>
                <PunctualityStar
                    punctualityScore={punctualityScore}
                    setPunctualityScore={setPunctualityScore}
                />
            </td>
            <td>
                <HelpfulnessStar
                    helpfulnessScore={helpfulnessScore}
                    setHelpfulnessScore={setHelpfulnessScore}
                />
            </td>
        </tr>
    ))
    const element = shiftsData?.results?.find(
        (item) => item?.jobListing?._id === jobListingId
    )
    const tableHead = [
        { list: "NO" },
        { list: "OPERATIVE" },
        { list: "PROFESSIONALISM" },
        { list: "PUNCTUALITY" },
        { list: "HELPFULNESS" },
    ]
    return (
        <>
            <Layout>
                {isLoadingShiftsData ? (
                    <div className="h-screen w-full flex mt-24 justify-center">
                        <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                    </div>
                ) : (
                    <>
                        <div className="md:p-6 p-6 mt-4 md:mt-14 font-creato">
                            <div className="bg-gray-80 w-fit p-3 rounded-lg cursor-pointer mb-4">
                                <AiOutlineArrowLeft
                                    size={20}
                                    onClick={() => navigate("/planner")}
                                />
                            </div>
                            <div className="lg:flex justify-between">
                                <div className="flex gap-8 w-full">
                                    <img
                                        src={ element?.depotCompany.logo|| Profile}
                                        alt="logo"
                                        className="rounded-full  h-14 w-14"
                                    />
                                    <div>
                                        <p className="text-black-50  text-md">
                                            RATE YOUR OPERATIVE
                                        </p>
                                        <p className="text-2xl font-extrabold font-creatoBold">
                                            {element?.jobListing.jobType.name}{" "}
                                            <span className="text-black-50">
                                                |
                                            </span>{" "}
                                            {
                                                element?.jobListing.jobLocation
                                                    .formattedAddress
                                            }{" "}
                                            <span className="text-black-50">
                                                |
                                            </span>{" "}
                                            {element?.jobListing.listingId}
                                        </p>
                                    </div>
                                </div>
                                {checkedOperative !== "" && (
                                    <div>
                                        <Button
                                            variant="green"
                                            className="py-3 font-semibold font-creatoMedium"
                                            style={{
                                                backgroundColor:
                                                    "rgba(77, 178, 93, 1)",
                                            }}
                                            iconLeft={
                                                <AiOutlineCheck size={20} />
                                            }
                                            data-testid="submit_btn"
                                            onClick={() => mutate(values)}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {ratingShiftsData?.length !== 0 ? (
                            <>
                                <div
                                    className="hidden lg:block "
                                    data-testid="rate_operatives"
                                >
                                    <Table
                                        style={{
                                            backgroundColor: "#FFFFFF",
                                            fontFamily: "CreatoDisplay",
                                            cursor: "pointer",
                                        }}
                                        className={"table"}
                                        verticalSpacing="md"
                                        data-testid="table-data"
                                        role="grid"
                                    >
                                        <thead>
                                            <tr>
                                                {tableHead.map(
                                                    (item, index) => (
                                                        <th key={index}>
                                                            {item?.list}
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody> {row} </tbody>
                                    </Table>
                                </div>
                                <div className="block lg:hidden p-6 mt-4">
                                    <MobileRateOperativesTable
                                        shiftsData={ratingShiftsData}
                                        handleCheckedOperative={
                                            handleCheckedOperative
                                        }
                                        professionalismScore={
                                            professionalismScore
                                        }
                                        setProfessionalismScore={
                                            setProfessionalismScore
                                        }
                                        punctualityScore={punctualityScore}
                                        setPunctualityScore={
                                            setPunctualityScore
                                        }
                                        helpfulnessScore={helpfulnessScore}
                                        setHelpfulnessScore={
                                            setHelpfulnessScore
                                        }
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="mx-4">
                                <EmptyView
                                    title="You have rated all operatives on this shift."
                                    description=""
                                    buttonText="Post shift"
                                    handleButtonClick={() => {
                                        navigate("/job-boards")
                                    }}
                                />
                            </div>
                        )}
                    </>
                )}
            </Layout>
        </>
    )
}

export default RateOperatives

export const ProfessionalismStar = ({
    professionalismScore,
    setProfessionalismScore,
}: {
    professionalismScore: number
    setProfessionalismScore: Dispatch<SetStateAction<number>>
}) => {
    return (
        <div>
            {[...Array(5)].map((item, index) => {
                index += 1
                // console.log(professionalismScore, "professionalism")
                return (
                    <button
                        type="button"
                        key={index}
                        onClick={() => setProfessionalismScore(index)}
                        className="px-1"
                    >
                        <span>
                            <AiFillStar
                                size={20}
                                className="inline"
                                style={
                                    index <= professionalismScore
                                        ? { color: "#FED70A" }
                                        : { color: "rgba(15, 13, 0, 0.4)" }
                                }
                            />
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
export const PunctualityStar = ({
    punctualityScore,
    setPunctualityScore,
}: {
    punctualityScore: number
    setPunctualityScore: Dispatch<SetStateAction<number>>
}) => {
    return (
        <div>
            {[...Array(5)].map((item, index) => {
                index += 1
                // console.log(punctualityScore, "punctuality")
                return (
                    <button
                        type="button"
                        key={index}
                        onClick={() => setPunctualityScore(index)}
                        className="px-1"
                    >
                        <span>
                            <AiFillStar
                                size={20}
                                className="inline"
                                style={
                                    index <= punctualityScore
                                        ? { color: "#FED70A" }
                                        : { color: "rgba(15, 13, 0, 0.4)" }
                                }
                            />
                        </span>
                    </button>
                )
            })}
        </div>
    )
}

export const HelpfulnessStar = ({
    helpfulnessScore,
    setHelpfulnessScore,
}: {
    helpfulnessScore: number
    setHelpfulnessScore: Dispatch<SetStateAction<number>>
}) => {
    return (
        <div>
            {[...Array(5)].map((item, index) => {
                index += 1
                // console.log(helpfulnessScore, "helpfulness")
                return (
                    <button
                        type="button"
                        key={index}
                        onClick={() => setHelpfulnessScore(index)}
                        className="px-1"
                    >
                        <span>
                            <AiFillStar
                                size={20}
                                className="inline"
                                style={
                                    index <= helpfulnessScore
                                        ? { color: "#FED70A" }
                                        : { color: "rgba(15, 13, 0, 0.4)" }
                                }
                            />
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
