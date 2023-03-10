import { Pagination } from "@mantine/core"

interface IPaginateProps {
    page: number
    total: number
    onChange?: (page: number) => void
    initialPage?: number
    boundaries: number
    recordPerpage: number
}

const Paginate = ({
    page,
    onChange,
    total,
    boundaries,
    initialPage,
    recordPerpage,
}: IPaginateProps) => {
    return (
        <div className=" grid-cols-2 flex justify-between lg:mt-12 col-span-full">
            <div>
                <p className="text-black-80 text-2md md:text-3md">
                    <span className="hidden md:inline-block font-semibold">
                        Showing Results:
                    </span>{" "}
                    <span className="text-yellow-100">
                        {(page - 1) * recordPerpage + 1}-{recordPerpage * page}{" "}
                    </span>{" "}
                    of {total}
                </p>
            </div>
            <div className="col-span">
                <Pagination
                    classNames={{
                        item: "border-none text-3sm md:text-3md",
                    }}
                    styles={() => ({
                        item: {
                            "&[data-active]": {
                                backgroundImage: "",
                                backgroundColor: "#0F0D00E5",
                                color: "#fff",
                                padding: "0.9rem .8rem",
                            },
                        },
                    })}
                    boundaries={boundaries}
                    page={page}
                    onChange={onChange}
                    size="xs"
                    spacing="xs"
                    total={total}
                    initialPage={initialPage}
                    data-testid="paginate"
                    className="gap-0.5 md:gap-2"
                />
            </div>
        </div>
    )
}

export default Paginate
