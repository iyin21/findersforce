import { Button } from "../../../components"
import UploadIcon from "../../../assets/image.svg"
import { Dispatch, SetStateAction, useRef } from "react"
import { Modal } from "@mantine/core"
import Pdf from "../../../assets/pdf.png"
interface Props {
    openPayment: boolean
    setOpenPayment: Dispatch<SetStateAction<boolean>>
    totalAmount: any
    handleDocumentUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleFinishPayment: any
    buttonState: boolean
    data: any
}
const PaymentEvidenceUpload = ({
    openPayment,
    setOpenPayment,
    totalAmount,
    handleDocumentUpload,
    handleFinishPayment,
    buttonState,
    data,
}: Props) => {
    const ref = useRef<HTMLInputElement | null>(null)

    return (
        <Modal
            centered
            opened={openPayment}
            onClose={() => setOpenPayment(false)}
            withCloseButton={false}
            overlayOpacity={0.55}
            overlayBlur={3}
            padding={0}
            closeOnClickOutside={false}
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            // styles={() => ({
            //     modal: {
            //         width: "40%",
            //     },
            // })}
        >
            <div className="p-4">
                <p className="font-extrabold font-creatoBold text-2xl">
                    Pay £{totalAmount}
                </p>
                <p className="font-creato text-2md text-black-50 ">
                    Proceed to your bank app to complete this transfer and
                    upload an evidence of payment to verify this payment.
                </p>
                <section className="font-creato flex justify-around gap-4 p-3 mt-4 cursor-pointer text-md bg-gray-70">
                    <div className="font-bold">
                        <p className="pb-1">Account Name</p>
                        <p className="pb-1">Account Type</p>
                        <p className="pb-1">Sort Code</p>
                        <p className="pb-1">Account Number</p>
                        <p className="pb-1">Banking Institution</p>
                        <p className="pb-1">Bank Address</p>
                        <hr />
                        <p className="p-1">Company Address</p>
                    </div>
                    <div>
                        <p className="pb-1">IMPACT SOLUTIONS GLOBAL LIMITED</p>
                        <p className="pb-1">Business</p>
                        <p className="pb-1">0 4 - 0 3 - 7 0</p>
                        <p className="pb-1">0 4 4 0 9 9 6 8</p>
                        <p className="pb-1">Payrnet</p>
                        <p className="pb-1">Po Box 1130, Cardiff, CF11 1WF</p>
                        <hr />
                        <p className="p-1">
                            IMPACT SOLUTIONS GLOBAL LIMITED 86-90 <br /> Paul
                            Street, London, England, EC2A 4NE
                        </p>
                    </div>
                </section>
                <div className="mt-8 mb-2">
                    <p className="font-bold font-creatoBold text-3md text-black-100 ">
                        Upload Evidence of Payment
                    </p>
                    <p className="font-creato text-2md text-black-50 ">
                        Once bank transfer is complete, upload evidence of
                        payment for verification
                    </p>
                </div>
                <div className="border-dashed border-2 border-yellow-60 rounded-lg p-2 mt-4">
                    {data?.status === "success" ? (
                        <div className="mt-3 flex flex-row relative gap-6">
                            <div className="relative ">
                                <img
                                    // @ts-ignore
                                    src={Pdf}
                                    alt="findersforce"
                                    className="w-[100px] h-[100px] object-cover rounded-xl"
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className="bg-yellow-5 text-black-100 p-6 rounded gap-5 text-center"
                            onClick={() => {
                                ref.current?.click()
                            }}
                        >
                            <img
                                src={UploadIcon}
                                alt="upload"
                                className="w-auto mx-auto mb-2"
                            />
                            <div className="text-center">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleDocumentUpload}
                                    multiple
                                    accept="image/png,image/jpeg"
                                    ref={ref}
                                />

                                <p className="">Tap to Upload</p>
                                <span className="text-black-60 text-md">
                                    (JPEG, PNG, PDF accepted | max file size:
                                    10MB)
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-between  py-5 mx-auto mb-8">
                    {!buttonState && (
                        <Button onClick={() => setOpenPayment(!openPayment)}>
                            Cancel
                        </Button>
                    )}
                    {!buttonState ? (
                        <Button
                            variant="primary"
                            className="text-white-100 "
                            size="small"
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                cursor: "default",
                            }}
                        >
                            Completed
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            className="text-white-100 ml-auto"
                            size="small"
                            style={{
                                backgroundColor: "rgba(77, 178, 93, 1)",
                                cursor: "pointer",
                            }}
                            onClick={(e) => handleFinishPayment(e)}
                        >
                            Completed
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default PaymentEvidenceUpload
