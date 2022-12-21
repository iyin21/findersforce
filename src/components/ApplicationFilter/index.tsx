import { Drawer } from "@mantine/core"
import { Dispatch, SetStateAction, useState } from "react"
import { BiFilter, BiX } from "react-icons/bi"
import Button from "../Core/Buttons/Button"
import Checkbox from "../Core/Checkbox/checkbox"
import { useMediaQuery } from "@mantine/hooks"
import { ApplicationFilterRequest } from "../../types/filter/filter"
import { useGetJobType } from "../../hooks/job-board/useJobBoard.hooks"

const FilterContent = ({
    applyFilter,
    setFilter,
}: {
    applyFilter: (filter: ApplicationFilterRequest) => void
    setFilter: Dispatch<SetStateAction<boolean>>
}) => {

    const {data: jobType} = useGetJobType();
    

    const match = [
        {
            title: "0-40%",
            value: "00-40%",
        },
        {
            title: "41-60%",
            value: "41-60%",
        },
        {
            title: "61-80%",
            value: "61-80%",
        },
        {
            title: "81-100%",
            value: "81-100%",
        },
    ]
    
    const [checkedJobMode, setCheckedJobMode] = useState<string>("")
    const [checkedMatch, setCheckedMatch] = useState<string>("")
    

    const handleJobMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setCheckedJobMode(value)
        }
    }
    const handleMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setCheckedMatch(value)
        }
    }
   
    const handleApply = () => {
        applyFilter({
            jobTypeId: checkedJobMode,
            jobMatchPercentageMin: checkedMatch.slice(0,2),
            jobMatchPercentageMax: checkedMatch.slice(3,5),
        })
    }

    return (
        <div className="w-72 rounded-lg px-4 pt-0 pb-4 md:p-4 ml-2 md:mt-6 md:absolute md:right-1 bg-white-100 lg:bg-black-90 lg:text-white-100 text-black-90 lg:shadow-lg lg:shadow-red-500">
            <div className="flex justify-between items-center">
                {" "}
                <h5 className="font-bold">Filters</h5>
                <BiX
                    className="text-2lg p-0"
                    size={30}
                    onClick={() => setFilter(false)}
                />
            </div>
            
             <p className="text-[15px] font-normal text-black-90 lg:text-white-70  py-4">
                Task Type
            </p>
            <ul className="flex flex-col gap-y-4 overflow-visible lg:overflow-y-scroll lg:h-[100px]">
                {jobType?.map((item, index) => (
                    <li key={index}>
                        <Checkbox
                            id={item?._id}
                            onChange={handleJobMode}
                            value={item?._id}
                            checked={checkedJobMode.includes(item?._id)}
                            label={item?.name}
                            className="bg-black-90"
                        />
                    </li>
                ))}
            </ul>

            <p className="text-[15px] font-normal text-black-90 lg:text-white-70  py-4">
                Match
            </p>
            <ul className="flex flex-col gap-y-4 overflow-visible lg:overflow-y-scroll lg:h-[100px]">
                {match.map((item, index) => (
                    <li key={index}>
                        <Checkbox
                            id={item.value}
                            onChange={handleMatch}
                            value={item.value}
                            checked={checkedMatch.includes(item.value)}
                            label={item.title}
                            className="bg-black-90"
                        />
                    </li>
                ))}
            </ul>

            

            <Button
                // type="button"
                variant="primary"
                size="normal"
                className="w-64 btn--primary btn mt-6"
                onClick={handleApply}
            >
                Apply
            </Button>
        </div>
    )
}

const Filter = ({
    className,
    applyFilter,
}: {
    className?: string
    applyFilter: (filter: ApplicationFilterRequest) => void
}) => {
    const [filter, setFilter] = useState(false)
    const matches = useMediaQuery("(max-width: 900px)")

    return (
        <div>
            <div className="relative ">
                {!filter ? (
                    <Button
                        type="button"
                        variant="clear"
                        size="normal"
                        onClick={() => setFilter(true)}
                        className={className}
                        iconLeft={<BiFilter size={23} className={className} />}
                    >
                        Filter
                    </Button>
                ) : (
                    <Button
                        type="button"
                        variant="clear"
                        size="normal"
                        onClick={() => setFilter(false)}
                        className="text-dark-green-500"
                        iconLeft={<BiX className="text-2lg" size={25} />}
                    >
                        Hide Filters
                    </Button>
                )}
                {filter && matches ? (
                    <>
                        <Drawer
                            className="mb-0"
                            opened={filter}
                            onClose={() => setFilter(false)}
                            position="right"
                            transitionDuration={250}
                            withCloseButton={false}
                            transitionTimingFunction="ease"
                            classNames={{
                                drawer: "overflow-y-auto margin-bottom-0 rounded-l-3xl",
                                closeButton:
                                    "text-black-100 font-bold text-6xl relative top-10 right-4",
                            }}
                        >
                            <FilterContent
                                applyFilter={applyFilter}
                                setFilter={setFilter}
                            />
                        </Drawer>
                    </>
                ) : (
                    <>
                        {filter && (
                            <FilterContent
                                applyFilter={applyFilter}
                                setFilter={setFilter}
                            />
                        )}
                    </>
                )}
            </div>{" "}
        </div>
    )
}

export default Filter
