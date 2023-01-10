import PDFInvoice from "../../pages/invoice/document/Invoice"
import { ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { Button } from "../../components/index"
import { FaDownload } from "react-icons/fa"
import { FiArrowLeft } from "react-icons/fi"

const PDFLayout = ({
    children,
    title,
    showSignBtn,
}: {
    children: ReactNode
    title: string
    showSignBtn?: boolean
    openSelectSignature?: boolean
}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleDocumentDownload = () => {
        const isInvoiceRoute = location.pathname
            .toLowerCase()
            .includes("/invoice")
        const document = <PDFInvoice />
        const pdfName = isInvoiceRoute ? "invoice" : ""

        return {
            document,
            pdfName,
        }
    }

    return (
        <div className="lg:bg-primary-10 min-h-screen">
            <div className=" items-center justify-between p-4 lg:px-32 py-5 bg-white lg:sticky fixed w-full lg:top-0 bottom-0 flex">
                <button
                    type="button"
                    className="bg-primary-5 p-4 rounded-lg flex items-center justify-center cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <FiArrowLeft className="text-2xl" />
                </button>

                <p
                    className=" hidden lg:block text-2xl font-bold"
                    aria-label="page-title"
                >
                    {title}
                </p>

                <div className="flex gap-4">
                    <PDFDownloadLink
                        document={handleDocumentDownload().document}
                        fileName={`${handleDocumentDownload().pdfName}.pdf`}
                    >
                        {({ loading }) => (
                            <Button
                                type="button"
                                variant="primary"
                                iconLeft={<FaDownload />}
                                disabled={loading}
                            >
                                Download
                            </Button>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>

            <main className="lg:px-32 lg:pt-28 pt-10 pb-14">{children}</main>
        </div>
    )
}

export default PDFLayout
