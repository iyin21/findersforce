import Layout from "../../components/Layout"
import { FcMenu } from "react-icons/fc"
import { Input } from "../../components"

import CompanyLogo from "./assets/companyLogo.svg"
import { MdCall } from "react-icons/md"
import { HiVideoCamera } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import { AiOutlineMore } from "react-icons/ai"
import { useState } from "react"
import SendImg from "../Support/assets/images/send.svg"
import { Drawer } from "@mantine/core"
import ReadIcon from "./assets/read.svg"
import Avatar from "../Applications/assets/avatar.png"
import { MdGroup } from "react-icons/md"
import AddGroup from "../../components/Modals/Messaging/addGroupModal"


const Messaging = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const [message, setMessage] = useState("")
    const [activeIndex, setActiveIndex] = useState(0)
    const [openModal, setOpenModal]=useState(false);
    const chatList = [
        {
            title: "Revive Traffic one Way",
            message: "Hi Oluwafunmibi, Sam here from HR support",
            time: "2:22PM",
            count: "2235",
            image: Avatar,
            group: true,
        },
        {
            title: "Pierre yamfam",
            message: "Hi Oluwafunmibi, Sam here from HR support",
            time: "2:22PM",
            count: "2235",
            image: Avatar,
        },
    ]
    const messages = [
        {
            name: "Revive traffic",
            message:
                "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
            time: "5:29 PM",
        },
        {
            name: "David",
            message:
                "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
            time: "5:29 PM",
        },
    ]
    return (
        <Layout pageTitle="Messaging" noTopNav>
            <div>
                {openModal &&(
                    <AddGroup opened={openModal} setOpened={setOpenModal} />
                )}
                <>
                
                    <Drawer
                        opened={openMenu}
                        onClose={() => setOpenMenu(false)}
                        //size="75%"
                        withCloseButton={false}
                         overlayBlur={2}
                        overlayColor="#132013"
                         overlayOpacity={0.5}
                    >
                        <div className="pl-4 pt-4">
                        <img src={CompanyLogo} alt="" />
                        <h5 className="font-bold text-2lg">Revive Traffic</h5>
                        <p className="text-black-40 pt-2">+44 04 7743 1239</p>
                        </div>
                        
                        <hr className="text-[#E7E7E7] mt-4"/>
                        <div className="flex pt-4 pl-4 items-center">
                            <div className="bg-[#56B3F5] rounded p-2">
                            <MdGroup color="white" />
                                </div> 
                            <p className="pl-2 cursor-pointer" onClick={()=>setOpenModal(true)}>New Group</p>
                        </div>
                        <div className="absolute bottom-4 pl-4 text-black-40">
                            <p className="font-bold">Telegram Desktop</p>
                            <p className="font-normal">Version 4.1.1 -About</p>
                        </div>
                    </Drawer>
                </>
                <div className="flex justify-between  ">
                    <div className="border-r-2 h-screen border-[#E7E7E7] w-[500px] pt-8">
                        <div className="flex pl-4 items-center">
                            <div onClick={() => setOpenMenu(true)} data-testid="menu_btn" className="cursor-pointer">
                            <FcMenu
                                size={30}
                                
                            />
                            </div>
                            
                            
                            <Input
                                control=""
                                type="text"
                                placeholder="Search"
                                className="md:h-8.5 bg-black-5 ml-2"
                            />
                        </div>
                        <div className="mt-8">
                            {chatList.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex p-2 items-center ${
                                        activeIndex === index
                                            ? "bg-blue-100 text-white-100"
                                            : "bg-white-100 text-black-90"
                                    }`}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <img
                                        src={item.image}
                                        width="30px"
                                        height={50}
                                        alt=""
                                    />
                                    <div className="flex justify-between w-full">
                                        <div className="pl-2">
                                            <div className="flex items-center">
                                                {item.group && <MdGroup />}
                                                <h5 className="text-3md font-bold">
                                                    {item.title}
                                                </h5>
                                            </div>
                                            <p className="text-[8px]">
                                                {item.message}
                                            </p>
                                        </div>
                                        <div className="text-[8px] mr-0">
                                            <p className="flex">
                                                <img src={ReadIcon} alt="" />
                                                <span className="pl-2">
                                                    {item.time}
                                                </span>
                                            </p>
                                            <p
                                                className={`text-right rounded ml-8 ${
                                                    activeIndex === index
                                                        ? "bg-white-80"
                                                        : "bg-black-30"
                                                }`}
                                            >
                                                {item.count}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full pt-8">
                        <div className="flex justify-between pl-4 pr-8 pb-2">
                            <div>
                                <p className="body-small font-bold">
                                    Reveive Traffic
                                </p>
                                <p className="text-neutral-100 body-extra-small pt-1 font-bold">
                                    46 Members
                                </p>
                            </div>
                            <div className="flex gap-6 text-black-40 cursor-pointer">
                                <MdCall size={30} />
                                <HiVideoCamera size={30} />
                                <BiSearch size={30} />
                                <AiOutlineMore size={30} />
                            </div>
                        </div>
                        <hr className="text-[#E7E7E7]" />
                        {messages.map((item, index) => (
                            <div
                                className="bg-black-5 mt-8 ml-10 w-[500px] rounded-[20px] p-4 mb-8"
                                key={index}
                            >
                                <div className="flex justify-between">
                                    <p
                                        className={`${
                                            item.name === "David"
                                                ? "text-red-190"
                                                : "text-blue-90"
                                        } body-small`}
                                    >
                                        {item.name}
                                    </p>
                                    {/* <p className="text-black-40 text-md">
                                    Reply
                                </p> */}
                                </div>
                                <p className="mt-2 text-black-90 text-md">
                                    {item.message}
                                </p>
                                <p className="text-black-40 text-md flex justify-end mt-2">
                                    {item.time}
                                </p>
                            </div>
                        ))}
                        
                        <div className="fixed bottom-0 w-full border-t border-[#E7E7E7]  pl-10 h-14 items-center flex">
                            <input
                                type="text"
                                placeholder="Write a message"
                                className="focus:outline-none w-[500px] "
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.currentTarget.value)
                                }
                            />
                            {/* p
                            <img src={SendImg} alt="" /> */}
                            <button
                                className=" border-none ml-6"
                                //onClick={() => handleClick()}
                                //disabled={isLoading}
                            >
                                {/* {isUpdatingComplaintComment ? (
                                        <CgSpinner className="animate-spin text-primary-90 text-3xl" />
                                    ) : ( */}
                                <img src={SendImg} alt="" />
                                {/* )} */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Messaging
