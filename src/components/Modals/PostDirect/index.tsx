import { Modal } from "@mantine/core"
import Button from "../../../components/Core/Buttons/Button"
import { Dispatch, SetStateAction, useState } from "react"
import Checkbox from "../../../components/Core/Checkbox/checkbox"
import starIcon from "../../../assets/YellowStar.svg"
import SearchBar from "../../../components/SearchBar"
import { useSearchOperatives } from "../../../hooks/job-board/useJobBoard.hooks"
import { FormikValues } from "formik"
import { JobBoardByIdResponse } from "../../../types/job-board/interface"

export interface PostDirectInterface {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    values: FormikValues
    createJob: (values: FormikValues) => void
    jobQualification: JobBoardByIdResponse[] | undefined
    jobType: JobBoardByIdResponse[] | undefined
}

const PostDirect = ({
    opened,
    setOpened,
    jobType,
    jobQualification,
    isLoading,
    values,
    createJob,
}: PostDirectInterface) => {
    const [checkedOps, setCheckedOps] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const { data } = useSearchOperatives({})

    const handleCheckedOperatives = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setCheckedOps([...checkedOps, value])
        } else {
            setCheckedOps(checkedOps.filter((item) => item !== value))
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handlePost = () => {
        const jobObject = {
            ...values,
            jobTypeId: jobType?.filter(
                (item: { name: string }) => item?.name === values?.jobTypeId
            )[0]?._id,
            jobQualificationId: jobQualification?.filter(
                (item: { name: string }) =>
                    item.name === values?.jobQualificationId
            )[0]?._id,
            isPublished: true,
            jobAccessibleTo: "SELECTED_OPERATIVES",
            operativeIds: checkedOps,
        }
        createJob(jobObject)
    }

    return (
        <div>
            <Modal
                opened={opened}
                withCloseButton={false}
                onClose={() => setOpened(false)}
                size="lg"
                centered
            >
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold font-creatoMedium">
                        Post to Selected Operatives
                    </h3>
                    <p className="text-black-60 font-creatoLight text-md">
                        Select operatives you want to post to
                    </p>
                </div>
                <div className="flex justify-between mt-5">
                    <SearchBar
                        text="Search by operative name"
                        handleSearch={(e) => {
                            handleSearch(e)
                        }}
                    />
                    <span className="text-black-60 text-3sm font-creato font-semibold text-green-100">
                        Already selected ({checkedOps.length})
                    </span>
                </div>

                <div className="flex pt-6 pb-5 justify-between items-center font-creato">
                    <h6>Name</h6>
                    <h6>Ratings</h6>
                </div>

                <div className="h-96 overflow-auto">
                    {data?.results
                        .filter((element) =>
                            element.firstName
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        )
                        .map((element, index) => (
                            <div
                                key={index}
                                className="flex  justify-between items-center border-b border-black-5 pb-1 mb-3"
                            >
                                <div className="flex items-center gap-2 ">
                                    <Checkbox
                                        onChange={handleCheckedOperatives}
                                        checked={checkedOps.includes(
                                            element._id
                                        )}
                                        name={element.firstName}
                                        id={element._id}
                                        value={element._id}
                                    />
                                    <label
                                        htmlFor={element?._id}
                                        className="capitalize font-creato"
                                    >
                                        {element?.firstName} {element?.lastName}
                                    </label>
                                </div>

                                <div className="flex items-center gap-2 font-creato">
                                    <img src={starIcon} alt="star" />
                                    {element?.averageRating}
                                </div>
                            </div>
                        ))}
                </div>

                <div className="flex  justify-between items-center py-3 md:py-5 ">
                    <Button
                        variant="clear"
                        onClick={() => {
                            setOpened(false)
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        className="text-white-100 "
                        // type="submit"
                        onClick={() => {
                            handlePost()
                        }}
                    >
                        {isLoading ? "Posting..." : "Post Shift"}
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default PostDirect
