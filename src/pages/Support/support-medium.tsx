import { HiChevronRight } from "react-icons/hi"
import Layout from "../../components/Layout"
import Email from "./assets/images/email.svg"
import Chat from "./assets/images/chat.svg"
import Support from "./assets/images/support.svg"
import AcctManager from "./assets/images/acct-manager.svg"
import { BsFillTelephoneOutboundFill, BsTelephoneFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { Modal } from "@mantine/core"
import { useState } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { RiFileCopyFill } from "react-icons/ri"
import { ImCross } from "react-icons/im"
import { useClipboard } from "@mantine/hooks"
import { useAuthContext } from "../../pages/auth/context/authContext"

const SupportMedium = () => {
    const navigate = useNavigate()
    const [opened, setOpened] = useState(false)
    const [open, setOpen] = useState(false)
    const clipboard = useClipboard({ timeout: 500 })
    const clipboard2 = useClipboard({ timeout: 500 })
    const clipboard3 = useClipboard({ timeout: 500 })
    const platformSupportNumber = "+44 7123 456 787"
    const opertativeSupportNumber = "+44 7123 456 788"
    const generalEnquiryNumber = "+44 7123 456 789"
    const { state } = useAuthContext()
    return (
        <Layout pageTitle="Support Medium">
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                withCloseButton={false}
                centered
                closeOnClickOutside={false}
                closeOnEscape={false}
                overlayBlur={3}
                size={600}
                overlayOpacity={0.55}
                styles={() => ({
                    modal: {
                        borderRadius: "10px",
                    },

                    body: {
                        padding: "10px",
                    },
                })}
            >
                <div className="font-creato">
                    <section className="flex items-center justify-between">
                        <div className="flex items-center">
                            <IoIosArrowBack
                                size={20}
                                onClick={() => setOpen(false)}
                                className="cursor-pointer"
                            />
                            <span
                                className="text-lg text-black-90 pl-4 cursor-pointer"
                                onClick={() => setOpen(false)}
                            >
                                Back to support
                            </span>
                        </div>
                        <ImCross
                            onClick={() => setOpen(false)}
                            className="cursor-pointer"
                        />
                    </section>
                    <div className="bg-black-100 w-fit rounded-full p-4 mt-10">
                        <BsTelephoneFill color="#FED70A" size={20} />
                    </div>
                    <h5 className="font-extrabold font-creato lg:text-3xl text-2xl pt-2">
                        Account Manager Support.
                    </h5>
                    <span className="text-black-60 text-lg">
                        Save your Account Managers number for faster support
                        next time round.
                    </span>
                    <section className="bg-black-3 lg:w-[543px] rounded-[10px]  mt-8 pb-5 pt-2 pr-6 pl-8">
                        <span className="text-black-60 text-lg">
                            My Account Manager
                        </span>
                        <div className="flex items-center justify-between">
                            <span className="text-black-100 text-3xl font-extrabold underline">
                                {generalEnquiryNumber}
                            </span>
                            <RiFileCopyFill
                                size={22}
                                onClick={() =>
                                    clipboard.copy(generalEnquiryNumber)
                                }
                                className={`cursor-pointer ${
                                    clipboard.copied ? "hidden" : "block"
                                } text-black-10 hover:text-black-100`}
                            />
                            {clipboard.copied && (
                                <span className="text-green-80">Copied</span>
                            )}
                        </div>
                    </section>
                </div>
            </Modal>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                withCloseButton={false}
                centered
                closeOnClickOutside={false}
                closeOnEscape={false}
                overlayBlur={3}
                size={600}
                overlayOpacity={0.55}
                styles={() => ({
                    modal: {
                        borderRadius: "10px",
                    },

                    body: {
                        padding: "10px",
                    },
                })}
            >
                <div className="font-creato">
                    <section className="flex items-center justify-between">
                        <div className="flex items-center">
                            <IoIosArrowBack
                                size={20}
                                onClick={() => setOpened(false)}
                                className="cursor-pointer"
                            />
                            <span
                                className="text-lg text-black-90 pl-4 cursor-pointer"
                                onClick={() => setOpened(false)}
                            >
                                Back to support
                            </span>
                        </div>
                        <ImCross
                            onClick={() => setOpened(false)}
                            className="cursor-pointer"
                        />
                    </section>
                    <div className="bg-black-100 w-fit rounded-full p-4 mt-10">
                        <BsTelephoneFill color="#FED70A" size={20} />
                    </div>
                    <h5 className="font-extrabold font-creato lg:text-3xl text-2xl pt-2">
                        Great Listener Support.
                    </h5>
                    <span className="text-black-60 text-lg">
                        Our lines are open 24/7 to ensure support across both
                        day and night shifts.
                    </span>
                    <div className="bg-black-3 lg:w-[543px] rounded-[10px]  mt-8 pb-5 pt-2 pr-6 pl-8">
                        <span className="text-black-60 text-lg">
                            Platform Support
                        </span>
                        <div className="flex items-center justify-between">
                            <span className="text-black-100 text-3xl font-extrabold underline">
                                {platformSupportNumber}
                            </span>
                            <RiFileCopyFill
                                size={22}
                                onClick={() =>
                                    clipboard.copy(platformSupportNumber)
                                }
                                className={`cursor-pointer ${
                                    clipboard.copied ? "hidden" : "block"
                                } text-black-10 hover:text-black-100`}
                            />
                            {clipboard.copied && (
                                <span className="text-green-80">Copied</span>
                            )}
                        </div>
                    </div>
                    <div className="bg-black-3 lg:w-[543px] rounded-[10px] mt-3 pb-5 pt-2 pr-6 pl-8">
                        <span className="text-black-60">Operative Support</span>
                        <div className=" flex items-center justify-between">
                            <span className="text-black-100 text-3xl font-extrabold underline">
                                {opertativeSupportNumber}
                            </span>
                            <RiFileCopyFill
                                size={22}
                                onClick={() =>
                                    clipboard2.copy(opertativeSupportNumber)
                                }
                                className={`cursor-pointer ${
                                    clipboard2.copied ? "hidden" : "block"
                                } text-black-10 hover:text-black-100`}
                            />
                            {clipboard2.copied && (
                                <span className="text-green-80">Copied</span>
                            )}
                        </div>
                    </div>
                    <div className="bg-black-3 lg:w-[543px] rounded-[10px]  mt-3 pb-5 pt-2 pr-6 pl-8">
                        <span className="text-black-60">General Enquiry</span>
                        <div className="flex items-center justify-between">
                            <span className="text-black-100 text-3xl font-extrabold underline">
                                {generalEnquiryNumber}
                            </span>
                            <RiFileCopyFill
                                size={22}
                                onClick={() =>
                                    clipboard3.copy(generalEnquiryNumber)
                                }
                                className={`cursor-pointer ${
                                    clipboard3.copied ? "hidden" : "block"
                                } text-black-10 hover:text-black-100`}
                            />
                            {clipboard3.copied && (
                                <span className="text-green-80">Copied</span>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="md:p-6 p-6 mt-4 md:mt-14 font-creato">
                <section>
                    <h5 className="font-bold lg:text-3xl text-2xl mb-2">
                        Hi {state.user?.lastName}, how can we help?
                    </h5>
                    <p className="text-black-60">
                        Reach out to us in a way that suits you best.
                    </p>
                </section>
                <section className="flex flex-col items-center mt-24">
                    <div>
                        <div className="bg-black-100 w-fit p-4 rounded-full mb-2">
                            <img src={Support} alt="support icon" />
                        </div>
                        <h5 className="font-bold lg:text-3xl text-2xl">
                            Choose Support
                        </h5>
                        <div className="bg-black-3 lg:w-[543px] rounded-[10px] flex items-center justify-between mt-8 py-5 pr-6 pl-8">
                            <img src={AcctManager} alt="account manager icon" />
                            <span className="mr-auto ml-5 text-black-90 text-lg font-medium">
                                <span className="text-yellow-100">Reach</span>{" "}
                                your Account Manager
                            </span>
                            <HiChevronRight
                                size={30}
                                style={{ color: "#889088" }}
                                className="cursor-pointer"
                                onClick={() => setOpen(true)}
                            />
                        </div>
                        <div className="bg-black-3 lg:w-[543px] rounded-[10px] flex justify-between mt-5 py-5 pr-6 pl-8">
                            <img src={Chat} alt="chat icon" />
                            <span className="mr-auto ml-5 text-black-90 text-lg font-medium">
                                <span className="text-yellow-100">Chat</span>{" "}
                                with someone helpful
                            </span>
                            <HiChevronRight
                                size={30}
                                style={{ color: "#889088" }}
                                className="cursor-pointer"
                                onClick={() => navigate("/messaging")}
                            />
                        </div>
                        <div className="bg-black-3 lg:w-[543px] rounded-[10px] flex justify-between mt-5 py-5 pr-6 pl-8">
                            <BsFillTelephoneOutboundFill size={24} />
                            <span className="mr-auto ml-7 text-black-90 text-lg font-medium">
                                <span className="text-yellow-100">Speak</span>{" "}
                                with a great listener
                            </span>
                            <HiChevronRight
                                size={30}
                                style={{ color: "#889088" }}
                                className="cursor-pointer"
                                onClick={() => setOpened(true)}
                            />
                        </div>
                        <div className="bg-black-3 lg:w-[543px] rounded-[10px] flex items-center justify-between mt-5 py-5 pr-6 pl-8">
                            <img src={Email} alt="email icon" />
                            <span className="mr-auto ml-5 text-black-90 text-lg font-medium">
                                <span className="text-yellow-100">Write</span> a
                                formal complaint
                            </span>
                            <HiChevronRight
                                size={30}
                                style={{ color: "#889088" }}
                                className="cursor-pointer"
                                onClick={() => navigate("/support/complaint")}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default SupportMedium
