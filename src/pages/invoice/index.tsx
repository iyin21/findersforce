import { PDFViewer } from "@react-pdf/renderer"
import PDFLayout from "../../components/Layout/pdf-documents-layout"
import InvoiceWrapper from "./component/InvoiceWrapper"
import PDFInvoice from "./document/Invoice"

export default function Invoice() {
    return (
        <InvoiceWrapper>
            <PDFLayout title="Invoice">
                <PDFViewer
                    style={{ height: "100vh", width: "100%" }}
                    showToolbar={false}
                >
                    <PDFInvoice />
                </PDFViewer>
            </PDFLayout>
        </InvoiceWrapper>
    )
}
