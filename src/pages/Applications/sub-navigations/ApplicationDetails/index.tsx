import { HiArrowLeft } from "react-icons/hi"
import { HiChevronRight } from "react-icons/hi"
import Avatar from "../../assets/avatar.png"
import { useNavigate } from "react-router-dom"
import Resume from "../../assets/resume.svg"
import Google from "../../assets/google.svg"
import { BsCheck, BsX } from "react-icons/bs"
import Download from "../../assets/downloadIcon.svg"
import Message from "../../assets/message.svg"
import { useParams } from "react-router-dom";
import { useGetApplicationDetails } from "../../hooks/application.hook"

const ApplicationDetails = () => {
    const { applicationId } = useParams<{ applicationId: string }>()
    const navigate = useNavigate()

    const {data,isLoading}=useGetApplicationDetails({id:applicationId||""})
    return (
        <div className="pt-4 px-6">
            <span
                onClick={() => navigate(-1)}
                onKeyDown={() => navigate(-1)}
                className="p-3 rounded inline-flex items-center justify-center bg-black-10 cursor-pointer"
                aria-hidden="true"
            >
                <HiArrowLeft className="text-2lg" />
            </span>
            <div className="pt-4 flex justify-between">
                <div className="flex">
                    <div>
                        <img src={Avatar} alt="" />{" "}
                    </div>

                    <div className="pl-4 ">
                        <h5 className="font-bold"> Shaquan Roberts</h5>
                        <p className="text-black-70">
                            Joined 2 years ago
                            <span className="text-black-10 pl-1">|</span>
                            <span className="text-green-100 pl-1 font-bold">
                                90% Match
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <button className="bg-red-10 p-4 rounded rounded-tr-2xl flex items-center font-bold body-medium px-6">
                        <BsX size="30px" color="red" />
                        Reject
                    </button>
                    <button className="bg-green-100 p-4 ml-4 flex text-white-100 items-center rounded rounded-tr-2xl font-bold body-medium px-6">
                        <BsCheck size="30px" color="white" />
                        Approve
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 mt-4">
                <div className="">
                    <div className="flex items-center">
                        <button className="bg-green-10 p-6 mr-4 flex text-green-100 font-bold items-center px-10 rounded rounded-tr-2xl">
                            <img src={Message} alt="" className="mr-2" />
                            Message Shaquan
                        </button>
                        <a
                            href="/applications/33/u65"
                            className="flex ml-4 items-center font-bold"
                        >
                            View Job Details <HiChevronRight size="25px" />{" "}
                        </a>
                    </div>

                    <div className="bg-pink mt-4 p-6">
                        <div className="flex">
                            <div>
                                <p className="body-medium text-black-50 pb-2 font-medium">
                                    QUALIFICATION
                                </p>
                                <p className="font-medium body-regular">
                                    SLG UNIT 1
                                </p>
                            </div>
                            <div className="ml-24">
                                <p className="body-medium text-black-50 pb-2 font-medium">
                                    RATING
                                </p>
                                <p className="font-bold body-regular">
                                    4.9{" "}
                                    <span className="font-medium text-black-50 ">
                                        (130 shifts)
                                    </span>
                                </p>
                            </div>
                        </div>
                        <p className="mt-6 text-black-50 font-medium body-mediumn mb-2">
                            PROFESSIONAL SUMMARY
                        </p>
                        <p>
                            Far far away, behind the word mountains, far from
                            the countries Vokalia and Consonantia, there live
                            the blind texts. Separated they live in
                            Bookmarksgrove right at the coast of the Semantics,
                            a large language ocean. A small river named Duden
                            flows by their place and supplies it with the
                            necessary regelialia. It is a paradisematic country,
                            in which roasted parts of sentences fly into your
                            mouth. Far far away, behind the word mountains, far
                            from the countries Vokalia and Consonantia, there
                            live the blind texts.{" "}
                        </p>
                    </div>
                </div>
                <div className="pl-4">
                    <div className="flex">
                        <div>
                            <p className="body-medium text-black-50 pb-2 font-medium">
                                DATE APPLIED
                            </p>
                            <p className="font-bold body-regular">
                                December 09, 2022 <span>|</span> 09:33AM{" "}
                            </p>
                        </div>
                        {/* <div>
                        <p>DATE ACCEPTED</p>
                        <h5>
                            December 09, 2022 <span>|</span> 09:33AM{" "}
                        </h5>
                    </div> */}
                    </div>
                    <div className="flex bg-black-100 p-6 rounded-[10px] justify-between  mt-4">
                        <div className="flex">
                            <img src={Resume} alt="Resume" />
                            <div className="pl-4">
                                <p className="text-white-50 body-small pb-1">
                                    RESUME
                                </p>
                                <p className="text-white-100 font-bold text-[17px] pb-1">
                                    Alison-Eyo-Reume-2.pdf
                                </p>
                                <p className="text-white-50 body-extra-small">
                                    5.93 MB
                                </p>
                            </div>
                        </div>

                        <button className="rounded-md p-4 border border-white-100 flex items-center">
                            <img src={Download} alt="" />
                            <p className="text-white-100 pl-2">Download</p>
                        </button>
                    </div>
                    <div className="mt-4 p-4 border border-black-10 rounded-[10px]">
                        <p className="body-medium text-black-50 pb-2 font-medium">
                            CERTIFICATIONS
                        </p>
                        <div className="flex items-start">
                            <img src={Google} alt="" />
                            <div className="pl-2">
                                <p className="font-bold body-normal">
                                    Certified Network Associate
                                </p>
                                <p className="text-black-90 body-medium pb-1">
                                    Microsoft
                                </p>
                                <p className="body-small text-black-70">
                                    Issued Jun 2022
                                </p>
                                <p className="body-small text-black-70">
                                    Credential ID VI6CUCQBOYHB
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <img src="" alt="" />
                            <div>
                                <h5>Certified Network Associate</h5>
                                <p>Microsoft</p>
                                <p>Issued Jun 2022</p>
                                <p>Credential ID VI6CUCQBOYHB</p>
                            </div>
                        </div>
                        <div className="flex">
                            <img src="" alt="" />
                            <div>
                                <h5>Certified Network Associate</h5>
                                <p>Microsoft</p>
                                <p>Issued Jun 2022</p>
                                <p>Credential ID VI6CUCQBOYHB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ApplicationDetails
