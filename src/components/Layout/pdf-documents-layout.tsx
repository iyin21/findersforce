import { ReactNode } from "react";


const PDFLayout = ({
                children,
                title,
                showSignBtn,
            }: {
                children: ReactNode;
                title: string;
                showSignBtn?: boolean;
                openSelectSignature?: boolean;
            }) => {
  return (
                <div className="lg:bg-primary-10 min-h-screen">
                <div className=" items-center justify-between p-4 lg:px-32 py-5 bg-white lg:sticky fixed w-full lg:top-0 bottom-0 flex">
                    {/* <button
                        type="button"
                        className="bg-primary-5 p-4 rounded-lg flex items-center justify-center cursor-pointer"
                        onClick={() => router.back()}
                    >
                        <FiArrowLeft className="text-2xl" />
                    </button> */}
    
                    <p className=" hidden lg:block text-2xl font-bold" aria-label="page-title">
                        {title}
                    </p>
    
                    {/* <div className="flex gap-4">
                        <ConfirmSignature
                            isOpen={IsConfirmSignature}
                            onClose={() => dispatch({ type: "close-modal" })}
                            font="msmadi"
                        />
                        <UploadSignature
                            isOpen={isUploadMenuOpen}
                            onClose={() => setUploadMenuOpen(false)}
                        />
    
                        {showSignBtn && isFoodProcessor
                            ? !pdfDataMemoized?.signature?.link && (
                                  <Button
                                      type="button"
                                      variant="secondary"
                                      iconRight={<SignatureIcon />}
                                      onClick={handleMenuClick}
                                  >
                                      Sign
                                  </Button>
                              )
                            : !pdfDataMemoized?.caSignatureDetails?.link && (
                                  <Button
                                      type="button"
                                      variant="secondary"
                                      iconRight={<SignatureIcon />}
                                      onClick={handleMenuClick}
                                  >
                                      Sign
                                  </Button>
                              )}
    
                        {isClient && (
                            <PDFDownloadLink
                                document={handleDocumentDownload().document}
                                fileName={`${handleDocumentDownload().pdfName}.pdf`}
                            >
                                {({ loading }) => (
                                    <Button
                                        type="button"
                                        variant="primary"
                                        iconLeft={<DownloadIcon />}
                                        disabled={loading}
                                    >
                                        Download
                                    </Button>
                                )}
                            </PDFDownloadLink>
                        )}
                    </div> */}
                </div>
    
                <main className="lg:px-32 lg:pt-28 pt-10 pb-14">{children}</main>
            </div>
  )
}

export default PDFLayout
