import { Drawer } from "@mantine/core"
import { Dispatch, SetStateAction, useState } from "react"
import { BiFilter, BiX } from "react-icons/bi"
import Button from "../Core/Buttons/Button"
import Checkbox from "../Core/Checkbox/checkbox"
import { useMediaQuery } from "@mantine/hooks"
import { FilterRequest } from "../../types/filter"

const FilterContent = ({
    applyFilter,
    setFilter,
}: {
    applyFilter: (filter: FilterRequest) => void
    setFilter: Dispatch<SetStateAction<boolean>>
}) => {
    const jobType = ["Meet Onsite", "Depot First"]
    const jobMode = [
        "2-Way",
        "2 - Way peds",
        " 3 - Way",
        "3 -Way peds",
        "4 - Way",
        "4 - Way peds",
        "5 - Way",
        "5 - Way peds",
    ]
    const amount = [
        "£0 - £50",
        "£50 - £100",
        "£100 - £150",
        "£150 - £200",
        "> £200",
    ]

    const [checkedJobType, setCheckedJobType] = useState<string[]>([])
    const [checkedJobMode, setCheckedJobMode] = useState<string[]>([])
    const [checkedAmount, setCheckedAmount] = useState<string[]>([])

    const handleJobType = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setCheckedJobType([...checkedJobType, value])
        } else {
            setCheckedJobType(checkedJobType.filter((item) => item !== value))
        }
    }
    const handleJobMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setCheckedJobMode([...checkedJobMode, value])
        } else {
            setCheckedJobMode(checkedJobMode.filter((item) => item !== value))
        }
    }
    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setCheckedAmount([...checkedAmount, value])
        } else {
            setCheckedAmount(checkedAmount.filter((item) => item !== value))
        }
    }
    const handleApply = () => {
        applyFilter({
            jobMode: checkedJobType,
            jobType: jobType,
            amount: amount,
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
                Type
            </p>
            <ul className="flex flex-col gap-y-4 overflow-visible lg:overflow-y-scroll lg:h-[100px]">
                {jobType.map((item, index) => (
                    <li key={index}>
                        <Checkbox
                            id={item}
                            onChange={handleJobType}
                            value={item}
                            checked={checkedJobType.includes(item)}
                            label={item}
                            className="bg-black-90"
                        />
                    </li>
                ))}
            </ul>

            <p className="text-[15px] text-black-90 lg:text-white-70 font-normal pt-6 pb-4">
                JOB MODE
            </p>
            <ul className="flex flex-col gap-y-4 overflow-visible lg:overflow-y-scroll lg:h-[100px]">
                {jobMode.map((item, index) => (
                    <li key={index}>
                        <Checkbox
                            id={item}
                            onChange={handleJobMode}
                            value={item}
                            checked={checkedJobMode.includes(item)}
                            label={item}
                            className="bg-black-90"
                        />
                    </li>
                ))}
            </ul>
            <p className="text-[15px] text-black-90 lg:text-white-70 font-normal pt-6 pb-4">
                AMOUNT/HOUR
            </p>
            <ul className="flex flex-col gap-y-4 overflow-visible lg:overflow-y-scroll lg:h-[100px]">
                {amount.map((item, index) => (
                    <li key={index}>
                        <Checkbox
                            id={item}
                            onChange={handleAmount}
                            value={item}
                            checked={checkedAmount.includes(item)}
                            label={item}
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
    applyFilter: (filter: FilterRequest) => void
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
