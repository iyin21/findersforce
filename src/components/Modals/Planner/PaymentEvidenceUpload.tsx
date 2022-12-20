import { Button } from "../../../components"
import UploadIcon from "../../../assets/image.svg"
import { Dispatch, SetStateAction, useRef } from "react"
import { Modal } from "@mantine/core"

interface Props {
    openPayment: boolean
    setOpenPayment: Dispatch<SetStateAction<boolean>>
    totalAmount: any
    handleDocumentUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleFinishPayment: any
    buttonState: boolean
}
const PaymentEvidenceUpload = ({
    openPayment,
    setOpenPayment,
    totalAmount,
    handleDocumentUpload,
    handleFinishPayment,
    buttonState,
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
                <section className="py-4 my-3 bg-gray-100 rounded-lg">
                    <p className="px-2">Account Details</p>
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
                                (JPEG, PNG, PDF accepted | max file size: 10MB)
                            </span>
                        </div>
                    </div>
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
                            Proceed
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            className="text-white-100 ml-auto"
                            size="small"
                            onClick={(e) => handleFinishPayment(e)}
                        >
                            Proceed
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default PaymentEvidenceUpload
