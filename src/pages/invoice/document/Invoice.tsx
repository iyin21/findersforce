import FindersForceLogo from "../../../assets/FF-logo-dark.svg"
import FFSignature from "../../../assets/FF-signature.svg"
import {
    Page,
    View,
    Text,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer"
import { ReactNode, useEffect, useState } from "react"
import { SubscriptionResponse } from "types/subscriptions/interface"
import dayjs from "dayjs"


// Register font
// Font.register({
//     family: "creato",
//     fonts: [
//         { src: "../../../fonts/CreatoDisplay/CreatoDisplay-Bold.otf", fontWeight: "bold", fontStyle: "normal" },
//         {
//             src: "../../../fonts/CreatoDisplay/CreatoDisplay-Regular.otf",
//             fontWeight: "normal",
//             fontStyle: "normal",
//         },
//         {
//             src: "../../../fonts/CreatoDisplay/CreatoDisplay-Medium.otf",
//             fontWeight: "medium",
//             fontStyle: "normal",
//         },
//     ],
// });

// Create styles
const pdfStyles = StyleSheet.create({
    page: {
        backgroundColor: "#000000",
        padding: "20px",
        width: "100%",
        // fontFamily: "creato",
        // fontWeight: "normal",
    },
    
    // text: {
    //     color: "rgba(255, 255, 255, 1)",
    //     fontSize: "10px",
    //     lineHeight: "14px",
    //     letterSpacing: "0.002rem"

    // },
    recieverTitle: {
        marginBottom: "4px",
        color: "#fff",
        fontWeight: "semibold",
        fontSize: 14,
    },
    signature: {
        marginBottom: "4px",
        color: "#fff",
        fontWeight: "semibold",
        fontSize: 12,
    },
    recieverData: {
        marginBottom: "4px",
        marginLeft: "24px",
        color: "#fff",
        fontWeight: "semibold",
        fontSize: 14,
    },
    recieverAddress: {
        fontSize: 12,
        fontWeight: "normal",
        color: "rgba(255, 255, 255, 0.2)",
        marginBottom: "2px",
    },
    table: {
        width: "100%",
        // marginBottom: "40px",
    },
    disclaimer: {
        margin: "40px 0",
        // fontSize: 12,
        lineHeight: "1.5",
        color: "rgba(19, 32, 19, 0.9)",
        // fontWeight: "normal",
    },
    tableHeader: {
        // fontWeight: "bold",
        paddingBottom: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "10px",
        // border: "1px solid ",
        marginBottom: "10px",
        fontSize: "10px",
        color:"rgba(253, 203, 55, 1)",
        backgroundColor: "rgba(254, 215, 10, 0.4)",
    },
    total: {
        fontSize: "10px", 
        color:"rgba(253, 203, 55, 1)",
        marginRight: "4px",
        marginLeft: "auto",
        marginTop: "10px"
    },
    totalWrapper: {
        fontSize: "15px", 
        color:"#000000",
        backgroundColor: "rgba(253, 203, 55, 1)",
    },
    tableCell: {
        paddingBottom: "20px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "20px",
        // border: "1px solid #ccc",
        fontSize: "10px",
        color: "#fff",
        backgroundColor: "#1A1A1A"
    },
    // tableName: {
    //     marginBottom: "16px",
    //     color: "rgba(19, 32, 19, 0.7)",
    //     textTransform: "uppercase",
    //     fontWeight: "bold",
    //     // fontSize: "10.5",
    // },
    deliveryPeriodSection: {
        backgroundColor: "rgba(52, 101, 52, 1)",
        padding: "36px 24px 36px 24px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
        marginBottom: "56px",
    },
    deliveryPeriodWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "40px"
    },
    deliveryPeriodDates: {},
    deliveryPeriodHeading: {},
    deliveryDateWrapper: {},
    deliveryDetailsTitle: {
        color: "rgba(243, 188, 9, 1)",
        // fontSize: "9.75",
    },
    deliveryDate: {
        color: "white",
        // fontSize: "13",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    address:{
        display: "flex",
        justifyContent: "space-between"
    }
})


export default function PDFInvoice({}: { data?: SubscriptionResponse["data"] | null}) {
    
    const [pdfDataMemoized, setPdfDataMemoized] = useState<
        SubscriptionResponse["data"]["results"] | null
    >(null)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const pdfData = window.sessionStorage.getItem("pdfData")
            if (pdfData) {
                setPdfDataMemoized(JSON.parse(pdfData))
            } else {
                setPdfDataMemoized(null)
            }
            
        }
        
    }, [])


    const tableHeader = ["DESCRIPTION", "QTY", "AMOUNT", "SUBTOTAL"]

    const tableBody = [
        `${`Finder’s Force Elite Plan for ${dayjs(pdfDataMemoized?.[0].paymentDate).format("MMMM")}` || "Finder’s Force Elite Plan for November"}`,
        `${"1"}`,
        `${`£ ${pdfDataMemoized?.[0].totalAmountPaid}` || "£ 10,000"}`,
        `${`£ ${pdfDataMemoized?.[0].totalAmountPaid}` || "£ 10,000"}`,
    ]

    return (
        <Document
            title="Invoice"
            author="Finders Force"
            creator="Finders Force"
        >
            <Page size="A4" style={pdfStyles.page} wrap>
                {/* <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Image src={FindersForceLogo} />
                </View> */}
                <View style={pdfStyles.deliveryPeriodWrapper}
                >
                    <View>
                        <Text style={pdfStyles.recieverAddress}>FROM</Text>
                        <Text style={pdfStyles.recieverTitle}>
                            {" "}
                            Finders Force
                        </Text>
                        <Text style={pdfStyles.recieverAddress}>
                            121, King Street Melbourne, VIC 3000
                        </Text>
                        <Text style={pdfStyles.recieverAddress}>
                            revivetrafficfieldlabs@email.com
                        </Text>
                    </View>
                    <View>
                        <Text style={pdfStyles.recieverAddress}>ISSUED TO</Text>
                        <Text style={pdfStyles.recieverTitle}>
                            {" "}
                            {pdfDataMemoized?.[0]?.depotCompany?.name}
                        </Text>
                        <Text style={pdfStyles.recieverAddress}>
                            {pdfDataMemoized?.[0]?.depotCompany?.address}
                        </Text>
                        <Text style={pdfStyles.recieverAddress}>
                            {pdfDataMemoized?.[0]?.depotCompany?.createdBy?.email}
                        </Text>
                    </View>
                </View>
                <View style={{
                    marginBottom: "20px"
                }}>
                    <Text style={pdfStyles.recieverAddress}>
                        INVOICE NO : <Text style={pdfStyles.recieverData}> {pdfDataMemoized?.[0]?.paymentInvoice}</Text>
                    </Text>
                    <Text style={pdfStyles.recieverAddress}>
                        DATE ISSUED : <Text style={pdfStyles.recieverData}> {dayjs(pdfDataMemoized?.[0]?.paymentDate).format("MMMM DD, YYYY")}</Text>
                    </Text>
                </View>
                <Table
                    tableHeader={tableHeader}
                    tableBody={tableBody}
                ></Table>
                <Text style={pdfStyles.total}>TOTAL <Text style={pdfStyles.totalWrapper}>$ {pdfDataMemoized?.[0]?.totalAmountPaid}</Text></Text>
                <View>
                    {/* <Image src={FFSignature} /> */}
                    <Text style={pdfStyles.signature}>
                        {" "}
                        Audrey Childs-Mee
                    </Text>
                    <Text style={pdfStyles.signature}>Finder’s Force</Text>
                </View>
            </Page>
        </Document>
    )
}

export const Table = ({
    tableHeader,
    tableBody,
    children,
}: {
    tableHeader: Array<string>
    tableBody: Array<string>
    children?: ReactNode
}) => {
    return (
        <View
            // style={{
            //     marginBottom: "40px",
            // }}
        >
            

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    borderRadius: "5px",
                }}
            >
                {tableHeader.map((item, index) => (
                    <Text
                        key={index}
                        style={[
                            pdfStyles.tableHeader,
                            {
                                width: `${200 / tableHeader.length}%`,
                                borderRight:
                                    index === tableHeader.length - 1
                                        ? ""
                                        : "none",
                            },
                        ]}
                    >
                        {item}
                    </Text>
                ))}
            </View>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                {tableBody.map((item, index) => (
                    <Text
                        key={index}
                        style={[
                            pdfStyles.tableCell,
                            {
                                width: `${100 / tableHeader.length}%`,
                                borderRight:
                                    index === tableHeader.length - 1
                                        ? ""
                                        : "none",
                                borderTop: 0,
                            },
                        ]}
                    >
                        {item}
                    </Text>
                ))}
            </View>
            {children}
        </View>
    )
}

// const Invoice = () => {
//     return (
//         <>
//             <main className="py-6 px-14 bg-black-100 text-white-100 text-2sm">
//                 <div className="flex justify-center ">
//                     <img src={FindersForceLogo} alt="logo" />
//                 </div>
//                 <header className="flex justify-between mt-20 mb-12 text-gray-80">
//                     <div>
//                         <h6>From</h6>
//                         <p className="text-white-100 text-3sm"> Finders Force</p>
//                         <p>
//                             121, King Street <br />
//                             Melbourne, VIC 3000
//                         </p>
//                         <p>revivetrafficfieldlabs@email.com</p>
//                     </div>
//                     <div>
//                         <h6>Issued to</h6>
//                         <p className="text-white-100 text-3sm"> Revive Traffic</p>
//                         <p>
//                             121, King Street <br />
//                             Melbourne, VIC 3000
//                         </p>
//                         <p>revivetrafficfieldlabs@email.com</p>
//                     </div>
//                 </header>
//                 <hr />
//                 <div className="mt-12 text-gray-80 mb-20">
//                     <p className="">INVOICE NO : <span className="text-white-100 text-3sm ml-5 ">INVO0989</span></p>
//                     <p className="mt-6">DATE ISSUED : <span className="text-white-100 text-3sm ml-5 ">June 12, 2022</span></p>
//                 </div>
//                 <div>
//                     <table
//                         data-testid="table-data"
//                         role="grid"
//                         className="w-full text-left"
//                     >
//                         <thead className="text-yellow-100 text-2sm">
//                             <tr className="h-10 bg-yellow-20 rounded-lg">
//                                 <th>DESCRIPTION</th>
//                                 <th>QTY</th>
//                                 <th>AMOUNT</th>
//                                 <th>SUBTOTAL</th>
//                             </tr>
//                         </thead>
//                         <tbody className=" bg-white-10 h-20 text-gray-80 text-3sm">
//                           <tr>
//                             <td>Finder’s Force Elite Plan for November</td>
//                             <td>1</td>
//                             <td>£ 10,000</td>
//                             <td>£ 10,000</td>
//                           </tr>
//                         </tbody>

//                     </table>
//                     <p className="text-yellow-100 mt-4 flex justify-end p-2 items-center text-sm">TOTAL <span className="bg-yellow-100 text-black-100 py-2 px-4 ml-2 text-lg font-bold">$ 12,090.90</span></p>
//                 </div>
//                 <div>
//                   <img src={FFSignature} alt="signature" />
//                   <p className="text-md mt-2">Audrey Childs-Mee</p>
//                   <p className="text-sm mt-2">FOR: Finder’s Force</p>
//                 </div>
//             </main>
//         </>
//     )
// }

// export default Invoice
