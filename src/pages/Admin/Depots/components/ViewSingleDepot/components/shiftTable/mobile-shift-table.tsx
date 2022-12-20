import { DepotSingleTableInterface } from "../../../../../../../types/depot/depot-inteface"

const MobileShiftTable = ({ elements }: DepotSingleTableInterface) => {
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4 p-4" key={index}>
                    <div className="flex justify-between items-center">
                        <div>
                            <h6 className="text-black-50 text-3sm">LOCATION</h6>
                            <p className="text-2md mt-1">{element?.location}</p>
                        </div>
                        <div>
                            <h6 className="text-black-50 text-3sm">MODE</h6>
                            <p className="bg-yellow-100 w-fit rounded-full px-3 py-1 text-sm m-1">
                                {element?.mode}
                            </p>
                        </div>
                    </div>
                    <div className="flex  justify-between items-center mt-3">
                        <div>
                            <h6 className="text-black-50 text-3sm">APPLIED</h6>
                            <p className="text-2md mt-1">{element?.applied}</p>
                        </div>
                        <div>
                            <h6 className="text-black-50 text-3sm">HIRED</h6>
                            <p className="text-2md mt-1">{element?.hired}</p>
                        </div>
                    </div>
                    <div className="flex  justify-between items-center mt-3">
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                COMPLETED
                            </h6>
                            <p className="text-2md mt-1">
                                {element?.completed}
                            </p>
                        </div>
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                CANCELLED
                            </h6>
                            <p className="text-2md mt-1">
                                {element?.cancelled}
                            </p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h6 className="text-black-50 text-3sm">DATE</h6>
                        <p className="text-2md mt-1">{element?.date}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileShiftTable
