import { useGetSingleSubscriptions } from "../../../hooks/subscriptions/useSubscriptions.hooks"
import { ReactNode, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { CgSpinner } from "react-icons/cg"

export default function InvoiceWrapper({ children }: { children: ReactNode }) {
    const location = useLocation()
    const id = location?.state?.subscriptionId
    console.log(id, "God Abeg")

    const [hasStorage, setHasStorage] = useState(false)
    const { data, isLoading } = useGetSingleSubscriptions({
        subscriptionId: id as string,
    })

    useEffect(() => {
        if (typeof window === "undefined") return
        if (data) {
            setTimeout(() => {
                setHasStorage(true)
            }, 1500)
        } else {
            setHasStorage(false)
        }
    }, [data])

    useEffect(() => {
        return () => {
            setHasStorage(false)
            window.sessionStorage.removeItem("pdfData")
        }
    }, [])

    if (isLoading && !hasStorage) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <div className="flex items-center justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl mr-4" />
                    Retrieving Invoice...
                </div>
            </div>
        )
    }
    if (data?.results && !hasStorage) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <div className="flex items-center justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl mr-4" />
                    Creating Invoice...
                </div>
            </div>
        )
    }
    return (
        <div>
            {/* {!data.data.signature && (
                        <div className="w-full justify-center fixed lg:top-32 top-5">
                            <p className="flex items-center justify-center py-4 px-7 mx-auto z-[50px] w-fit bg-red-100  rounded-xs text-white">
                                {' '}
                                <IoIosInformationCircle className="text-white" /> This trade term has not
                                been signed by you.
                            </p>
                        </div>
                    )} */}

            {children}
        </div>
    )
}
