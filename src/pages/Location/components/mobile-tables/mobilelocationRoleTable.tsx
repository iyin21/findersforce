import { Key } from "react"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"

const MobileLocationRoleTable = ({ elements }: { elements: any }) => {
    return (
        <div className="mt-4">
            {elements?.map(
                (
                    element: {
                        user: {
                            firstName: string
                            lastName: string
                            email: string
                        }
                        role: string
                    },
                    index: Key | null | undefined
                ) => (
                    <div className="rounded bg-black-5 mb-4" key={index}>
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <p>
                                {element?.user?.firstName}{" "}
                                {element?.user?.lastName}
                            </p>

                            <div className="flex items-center gap-2">
                                <div className="cursor-pointer">
                                    {index === 0 ? (
                                        <MdEdit
                                            color="rgba(15, 13, 0, 0.6)"
                                            size={16}
                                        />
                                    ) : (
                                        <RiDeleteBin5Line
                                            color="#E94444"
                                            size={16}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between mt-3">
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        EMAIL ADDRESS
                                    </h6>
                                    <p className="text-2md mt-1 pr-5">
                                        {element?.user.email}
                                    </p>
                                </div>
                                <div>
                                    <h6 className="text-black-50 text-3sm pr-14">
                                        ROLE TYPE
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {element?.role}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between mt-3 pr-14">
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        DATE ADDED
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {"AUG 25, 2022 | 9-53 AM"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default MobileLocationRoleTable
