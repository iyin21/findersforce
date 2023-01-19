import { Dispatch, SetStateAction } from "react"
import { Result } from "../../../../types/planner/interfaces"
import { Checkbox } from "../../../../components/index"
import Profile from "../../../../assets/Profile.png"
import {
    HelpfulnessStar,
    ProfessionalismStar,
    PunctualityStar,
} from "./RateOperatives"

interface Props {
    shiftsData: Result[] | undefined
    handleCheckedOperative: any
    professionalismScore: number
    setProfessionalismScore: Dispatch<SetStateAction<number>>
    punctualityScore: number
    setPunctualityScore: Dispatch<SetStateAction<number>>
    helpfulnessScore: number
    setHelpfulnessScore: Dispatch<SetStateAction<number>>
}
const MobileRateOperativesTable = ({
    shiftsData,
    handleCheckedOperative,
    professionalismScore,
    setProfessionalismScore,
    punctualityScore,
    setPunctualityScore,
    helpfulnessScore,
    setHelpfulnessScore,
}: Props) => {
    return (
        <>
            {shiftsData?.map((item, index) => (
                <div className="mt-4" key={index}>
                    <div className="rounded bg-black-5 mb-4">
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <div className="flex items-center gap-2">
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
                                    <label htmlFor={item?.operative?._id}>
                                        {}
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <img
                                    src={
                                        item?.operative?.profileImageUrl ||
                                        Profile
                                    }
                                    alt="logo"
                                    className="rounded-full  h-10 w-10"
                                />
                                <p className="text-lg font-bold mt-1">
                                    {item?.operative.firstName}{" "}
                                    {item?.operative.lastName}
                                </p>
                            </div>
                        </div>
                        <div className="p-4">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    PROFESSIONALISM
                                </h6>
                                <div>
                                    <ProfessionalismStar
                                        professionalismScore={
                                            professionalismScore
                                        }
                                        setProfessionalismScore={
                                            setProfessionalismScore
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    PUNCTUALITY
                                </h6>
                                <div>
                                    <PunctualityStar
                                        punctualityScore={punctualityScore}
                                        setPunctualityScore={
                                            setPunctualityScore
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    HELPFULNESS
                                </h6>
                                <div>
                                    <HelpfulnessStar
                                        helpfulnessScore={helpfulnessScore}
                                        setHelpfulnessScore={
                                            setHelpfulnessScore
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MobileRateOperativesTable
