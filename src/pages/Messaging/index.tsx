import Layout from "../../components/Layout"
import { FcMenu } from "react-icons/fc"
import { Input } from "../../components"

import CompanyLogo from "./assets/companyLogo.svg"
import { MdCall } from "react-icons/md"
import { HiVideoCamera } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import { AiOutlineMore } from "react-icons/ai"
import { useState, useCallback, ChangeEvent } from "react"
import SendImg from "../Support/assets/images/send.svg"
import { Drawer } from "@mantine/core"
// import ReadIcon from "./assets/read.svg"
import { MdGroup } from "react-icons/md"
import AddGroup from "../../components/Modals/Messaging/addGroupModal"
import { TelegramClient, Api } from "telegram"
import { StringSession } from "telegram/sessions"
import { useEffect, useRef } from "react"
// import { chats, message,  } from "telegram/client"
import dayjs from "dayjs"
import { CgSpinner } from "react-icons/cg"
import { NewMessageEvent, NewMessage } from "telegram/events"
import { showNotification } from "@mantine/notifications"

import ImageMessage from "./components/ImageMessage"
import { GrAttachment } from "react-icons/gr"

import FileModal from "./components/fileModal"
import SignIn from "./components/signIn"
import SendCode from "./components/sendCode"
import { Dialog } from "telegram/tl/custom/dialog"
import calendar from "dayjs/plugin/calendar"
import AddMembersModal from "../../components/Modals/Messaging/addMemberModal"
import { Overlay } from "@mantine/core"
import ProfilePicture from "./components/profilePicture"
import ProfileDrawer from "./components/profileDrawer"

//2.14.8
dayjs.extend(calendar)

const Messaging = () => {
    const [phase, setPhase] = useState<number | null>(null)
    const [phone, setPhone] = useState("")
    const [phoneCodeHash, setPhoneCodeHash] = useState("")
    const [newClient, setNewClient] = useState<TelegramClient>()
    //const [session, setSession] = useState("")
    const [dialog, setDialog] = useState<Dialog[]>([])
    const [activeChat, setActiveChat] = useState("")
    const [chatHistory, setChatHistory] = useState<Api.Message[]>([])
    const [isLoadingMessages, setIsLoadingMessages] = useState(false)
    const [me, setMe] = useState<Api.User>()
    const [isFetchingDialog, setIsFetchingDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [chatId, setChatId] = useState<bigInt.BigInteger>()

    //Telegram

    const apiId = import.meta.env.VITE_TELEGRAM_API_ID as number

    const apiHash = import.meta.env.VITE_TELEGRAM_API_HASH
    const stringSession = new StringSession(
        sessionStorage.getItem("session") || ""
    ) // fill this later with the value from session.save()

    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 10000,
        //testServers: true,
    })

    // console.log(sessionStorage.getItem("session"))
    // const getDialogs = async () => {
    //     const result = await client.getDialogs({})
    //     if (result) {
    //         setDialog(result)
    //     }
    // }
    useEffect(() => {
        const run = async () => {
            setIsFetchingDialog(true)
            await client.connect()
            try {
                const meResult = await client.getMe()
                if (meResult) {
                    // @ts-expect-error
                    setMe(meResult)
                }
                const result = await client.getDialogs({})
                if (result) {
                    setDialog(result)
                    setNewClient(client)
                    // const result3 = await client.invoke(
                    //     new Api.photos.GetUserPhotos({
                    //       userId: "username",
                    //       offset: 43,
                    //       maxId: 3,
                    //       limit: 100,
                    //     })
                    //   );
                }
            } finally {
                setIsFetchingDialog(false)
            }
        }

        if (phase === 3) {
            run()
        }
    }, [phase])
    useEffect(() => {
        async function eventPrint(event: any) {
            console.log("event", event)
            const message = event.message
            console.log("chatkklid", chatId)
            console.log(message, "message")
            // const sender = await message.getSender()
            // const sender2 = await message.getInputSender()
            // const getChat = await message.getChat()
            const id = message.peerId.userId

            // Checks if it's a private message (from user or bot)
            if (event.isPrivate && id) {
                // @ts-expect-error
                if (chatId?.value === id.value) {
                    console.log("hey")
                    setChatHistory((chat) => [...chat, message])
                } else {
                    console.log("trial")
                    //// @ts-expect-error
                    //console.log("hjhj", dialog[0].message.chat?.id?.value)
                    // const getDialogs = async () => {
                    const result = await client.getDialogs({})
                    if (result) {
                        setDialog(result)
                    }
                }
            }
        }
        // adds an event handler for new messages
        client.addEventHandler(eventPrint, new NewMessage({}))
        // client.addEventHandler((update: Api.TypeUpdate) => {
        //     console.log("Received new Update")
        //     console.log(update)
        // })
    }, [client])
    useEffect(() => {
        const run = async () => {
            setIsLoading(true)

            await client.connect()

            try {
                if (!(await client.checkAuthorization())) {
                    setPhase(1)
                } else {
                    setPhase(3)
                }
            } catch (err) {
                sessionStorage.removeItem("session")
                setPhase(1)
            } finally {
                setIsLoading(false)
            }
        }
        run()
    }, [])

    const handleShowMessages = async (value: string) => {
        setIsLoadingMessages(true)
        await client.connect()

        setActiveChat(value)
        try {
            const result = await newClient?.getMessages(value, {
                limit: 100,
                reverse: true,
            })
            if (result) {
                console.log("result", result)
                console.log("chatId", result[0].chat?.id)
                setChatId(result[0].chat?.id)

                setChatHistory(() => [
                    // ...chat,
                    ...result
                        .filter(
                            (item: Api.Message) => item.message !== undefined
                        )
                        .map((item: Api.Message) => item),
                ])
                await newClient?.markAsRead(value, result[result.length - 1].id)
            }
        } finally {
            setIsLoadingMessages(false)
        }
    }
    console.log("jhhj", chatId)
    const [openMenu, setOpenMenu] = useState(false)
    const [message, setMessage] = useState("")
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [openModal, setOpenModal] = useState(false)
    const [isLoadingSendMessage, setIsLoadingSendMessage] = useState(false)
    const [openFileModal, setOpenFileModal] = useState(false)
    const [fileUpload, setFileUpload] = useState<File>()
    const [uploadedFile, setUploadedFile] = useState<
        Api.InputFile | null | Api.InputFileBig
    >(null)
    const [groupPhoto, setGroupPhoto] = useState<File | null>(null)
    const [groupName, setGroupName] = useState("")
    const [openAddMember, setOpenAddMember] = useState(false)
    const [searchParam] = useState(["title"])
    const [searchQuery, setSearchQuery] = useState("")
    const [openProfileDrawer, setOpenProfileDrawer] = useState(false)

    const dialogData = dialog?.filter((item: Dialog) => {
        return searchParam.some((newItem) => {
            return (
                // @ts-expect-error
                item[newItem as keyof Dialog]
                    .toString()
                    .toLowerCase()
                    .indexOf(searchQuery.toLowerCase()) > -1
            )
        })
    })

    const handleSendMessage = async () => {
        setIsLoadingSendMessage(true)
        try {
            const result = await newClient?.sendMessage(activeChat, {
                message: message,
            })
            if (result) {
                console.log("result", result)
                setChatHistory((chat) => [...chat, result])
                setMessage("")
            }
        } catch (err: any) {
            showNotification({
                title: "Error",
                message:
                    err.errorMessage || "An error occured, pleease try again",
                color: "red",
            })
        } finally {
            setIsLoadingSendMessage(false)
        }
    }
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = useCallback(() => {
        if (containerRef && containerRef.current) {
            const scrollHeight = containerRef.current.scrollHeight
            const height = containerRef.current.clientHeight
            const maxScrollTop = scrollHeight - height
            containerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
        }
    }, [containerRef, chatHistory])

    useEffect(() => {
        scrollToBottom()
    }, [containerRef, chatHistory])

    // this handles the ref that gets triggered when the user clicks on the attach icon
    const ref = useRef<HTMLInputElement | null>(null)

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setVisible(true)
            try {
                const result = await newClient?.uploadFile({
                    file: file,
                    workers: 1,
                })
                if (result) {
                    setVisible(false)
                    setOpenFileModal(true)

                    setFileUpload(e.target.files?.[0])
                    setUploadedFile(result)
                }
            } catch (err) {
                showNotification({
                    title: "Error",
                    message: "Error uploading file, plese try again",

                    color: "red",
                })
            }
        }
    }

    const [visible, setVisible] = useState(false)
    const handleFileResult = (item: Api.Message) => {
        setChatHistory((chat) => [...chat, item])
    }
    
    return (
        <Layout pageTitle="Messaging" noTopNav>
            <FileModal
                opened={openFileModal}
                setOpened={setOpenFileModal}
                file={fileUpload}
                client={newClient}
                chat={activeChat}
                uploadedFile={uploadedFile}
                handleResult={handleFileResult}
            />
            <ProfileDrawer
                openProfileDrawer={openProfileDrawer}
                setOpenProfileDrawer={setOpenProfileDrawer}
                client={newClient}
                isGroup={
                    //@ts-expect-error
                    chatHistory&& chatHistory?.length>0 && chatHistory[0]._chat.className === "Chat" ? true : false
                }
                chatId={chatId}
                activeChat={activeChat}

            />
            <div>
                {isLoading || isFetchingDialog ? (
                    <div className="h-screen w-full flex mt-24 justify-center">
                        <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                    </div>
                ) : phase === 1 ? (
                    <SendCode
                        client={client}
                        setNewClient={setNewClient}
                        setPhone={setPhone}
                        setPhoneCodeHash={setPhoneCodeHash}
                        setPhase={setPhase}
                    />
                ) : phase === 2 ? (
                    <SignIn
                        newClient={newClient}
                        phone={phone}
                        setPhase={setPhase}
                        phoneCodeHash={phoneCodeHash}
                    />
                ) : (
                    <div className="h-screen relative">
                        {openModal && (
                            <AddGroup
                                opened={openModal}
                                setOpened={setOpenModal}
                                setGroupName={setGroupName}
                                setGroupPhoto={setGroupPhoto}
                                setOpenAddMember={setOpenAddMember}
                            />
                        )}
                        <AddMembersModal
                            opened={openAddMember}
                            setOpened={setOpenAddMember}
                            client={client}
                            groupName={groupName}
                            groupPhoto={groupPhoto}
                        />
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
                                    <h5 className="font-bold text-2lg">
                                        {me?.firstName + " " + me?.lastName}
                                    </h5>
                                    <p className="text-black-40 pt-2">
                                        +{me?.phone}
                                    </p>
                                </div>

                                <hr className="text-[#E7E7E7] mt-4" />
                                <div className="flex pt-4 pl-4 items-center">
                                    <div className="bg-[#56B3F5] rounded p-2">
                                        <MdGroup color="white" />
                                    </div>
                                    <p
                                        className="pl-2 cursor-pointer"
                                        onClick={() => {
                                            setOpenMenu(false)
                                            setOpenModal(true)
                                        }}
                                    >
                                        New Group
                                    </p>
                                </div>
                                <div className="absolute bottom-4 pl-4 text-black-40">
                                    <p className="font-bold">Telegram Web</p>
                                    <p className="font-normal">
                                        Version 4.1.1 -About
                                    </p>
                                </div>
                            </Drawer>
                        </>
                        <div className="flex justify-between  h-[90%]">
                            <div className="border-r-2 h-screen border-[#E7E7E7] w-[500px] pt-8">
                                <div className="flex pl-4 items-center">
                                    <div
                                        onClick={() => setOpenMenu(true)}
                                        data-testid="menu_btn"
                                        className="cursor-pointer"
                                    >
                                        <FcMenu size={30} />
                                    </div>

                                    <Input
                                        control=""
                                        type="text"
                                        placeholder="Search"
                                        className="md:h-8.5 bg-black-5 ml-2"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-8 overflow-y-auto h-[80%]">
                                    {dialogData.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`flex p-2 items-center ${
                                                activeIndex === index
                                                    ? "bg-blue-100 text-white-100"
                                                    : "bg-white-100 text-black-90"
                                            }`}
                                            onClick={() => {
                                                setActiveIndex(index)
                                                handleShowMessages(
                                                    item?.title || ""
                                                )
                                            }}
                                        >
                                            <ProfilePicture
                                                client={newClient}
                                                data={item}
                                            />
                                            {/* <img
                                                width="30px"
                                                height={50}
                                                src={`https://ui-avatars.com/api/?name=${item.title}&background=rgba(67, 107, 46, 0.5)&color=fff`}
                                                alt=""
                                                // width={24}
                                                // height={22}
                                                // alt=""
                                                className="rounded-full bg-blue-100"
                                            /> */}
                                            <div className="flex justify-between w-full">
                                                <div className="pl-2">
                                                    <div className="flex items-center">
                                                        {!item.isUser && (
                                                            <MdGroup className="mr-1" />
                                                        )}
                                                        <h5 className="text-3md font-bold items-center">
                                                            {item.title?.slice(
                                                                0,
                                                                25
                                                            )}
                                                        </h5>
                                                    </div>
                                                    <p className="text-[10px]">
                                                        {item?.message?.message?.slice(
                                                            0,
                                                            40
                                                        ) || ""}
                                                    </p>
                                                </div>
                                                <div className="text-[10px] mr-0">
                                                    <p className="flex">
                                                        {/* <img
                                                            src={ReadIcon}
                                                            alt=""
                                                        /> */}
                                                        <span className="pl-2">
                                                            {dayjs(
                                                                new Date(
                                                                    item.date *
                                                                        1000
                                                                )
                                                            ).calendar(null, {
                                                                sameDay:
                                                                    "h:mm A", // The same day ( Today at 2:30 AM )
                                                                nextDay:
                                                                    "[Tomorrow]", // The next day ( Tomorrow at 2:30 AM )
                                                                nextWeek:
                                                                    "dddd", // The next week ( Sunday at 2:30 AM )
                                                                lastDay:
                                                                    "[Yesterday]", // The day before ( Yesterday at 2:30 AM )
                                                                lastWeek:
                                                                    "DD/MM/YYYY", // Last week ( Last Monday at 2:30 AM )
                                                                sameElse:
                                                                    "DD/MM/YYYY", // Everything else ( 7/10/2011 )
                                                            })}
                                                        </span>
                                                    </p>
                                                    {item.unreadCount > 0 && (
                                                        <p
                                                            className={`rounded  float-right  font-bold p-1 ${
                                                                activeIndex ===
                                                                index
                                                                    ? "bg-white-80"
                                                                    : "bg-black-30"
                                                            }`}
                                                        >
                                                            {item.unreadCount}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {(chatHistory && chatHistory.length > 0) ||
                            activeChat ? (
                                <div className="w-full pt-8">
                                    <div className="flex justify-between pl-4 pr-8 pb-2">
                                        <div>
                                            <p className="body-small font-bold">
                                                {activeChat}
                                            </p>
                                            <p className="text-neutral-100 body-extra-small pt-1 font-bold">
                                                46 Members
                                            </p>
                                        </div>
                                        <div className="flex gap-6 text-black-40 cursor-pointer">
                                            <MdCall size={30} />
                                            <HiVideoCamera size={30} />
                                            <BiSearch size={30} />
                                            <AiOutlineMore
                                                size={30}
                                                onClick={() =>
                                                    setOpenProfileDrawer(true)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <hr className="text-[#E7E7E7]" />
                                    <div
                                        className="overflow-y-auto h-full pb-9"
                                        ref={containerRef}
                                    >
                                        {visible && (
                                            <Overlay
                                                opacity={0.6}
                                                color="#000"
                                                zIndex={5}
                                            />
                                        )}

                                        {visible && (
                                            <div className="h-screen flex mt-56 justify-center absolute">
                                                <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                                            </div>
                                        )}
                                        {chatHistory.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`${
                                                    item._sender?.firstName ===
                                                    me?.firstName
                                                        ? "ml-64 flex justify-end mr-10"
                                                        : !item._sender
                                                              ?.firstName
                                                        ? "ml-64 flex justify-end mr-10"
                                                        : "ml-10 mr-64"
                                                }`}
                                            >
                                                {item.media ? (
                                                    <div>
                                                        <div className="bg-black-5 mt-8 ml-10 rounded-tl-[20px] rounded-tr-[20px] p-4 ">
                                                            <p
                                                                className={`${
                                                                    (item
                                                                        ._sender
                                                                        ?.username ||
                                                                        item
                                                                            ._sender
                                                                            ?.firstName,
                                                                    me?.firstName
                                                                        ? "text-red-190"
                                                                        : "text-blue-90")
                                                                } body-small`}
                                                            >
                                                                {item._sender
                                                                    ?.username ||
                                                                    item._sender
                                                                        ?.firstName}
                                                            </p>
                                                        </div>
                                                        <ImageMessage
                                                            data={item.media}
                                                            client={client}
                                                            item={item}
                                                        />
                                                        <div className="bg-black-5 ml-10 w-[300px] rounded-br-[20px] rounded-bl-[20px] p-4 ">
                                                            <p className="mt-2 text-black-90 text-md">
                                                                {item.text}
                                                            </p>
                                                            <p className="text-black-40 text-md flex justify-end mt-2">
                                                                {dayjs(
                                                                    new Date(
                                                                        item.date *
                                                                            1000
                                                                    )
                                                                ).format(
                                                                    "h:mm A, DD, MMM YYYY"
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={`bg-black-5 mt-8   max-w-fit rounded-[20px] p-4 mb-2`}
                                                    >
                                                        <div className="flex justify-between">
                                                            <p
                                                                className={`${
                                                                    item._sender
                                                                        ?.username ||
                                                                    item._sender
                                                                        ?.firstName ===
                                                                        me?.firstName
                                                                        ? "text-red-190"
                                                                        : "text-blue-90"
                                                                } body-small`}
                                                            >
                                                                {item._sender
                                                                    ?.username ||
                                                                    item._sender
                                                                        ?.firstName}
                                                            </p>
                                                            {/* <p className="text-black-40 text-md">
                                            Reply
                                        </p> */}
                                                        </div>
                                                        <p className="mt-2 text-black-90 text-md">
                                                            {item.text}
                                                        </p>
                                                        <p className="text-black-40 text-md flex justify-end mt-2">
                                                            {dayjs(
                                                                new Date(
                                                                    item.date *
                                                                        1000
                                                                )
                                                            ).format(
                                                                "h:mm A, DD, MMM YYYY"
                                                            )}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="fixed bottom-0 w-full border-t border-[#E7E7E7] bg-white-100  pl-10 h-14 mt-0 items-center flex">
                                        <div
                                            className="pr-2"
                                            onClick={() => {
                                                ref.current?.click()
                                            }}
                                        >
                                            {" "}
                                            <GrAttachment color="rgba(15, 13, 0, 0.5)" />
                                            <input
                                                data-testid="file-upload"
                                                //ref={fileInputRef}
                                                type="file"
                                                hidden
                                                onChange={handleUpload}
                                                ref={ref}
                                            />
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="Write a message"
                                            className="focus:outline-none w-[500px] "
                                            value={message}
                                            onChange={(e) =>
                                                setMessage(
                                                    e.currentTarget.value
                                                )
                                            }
                                        />
                                        {/* p
                                    <img src={SendImg} alt="" /> */}
                                        <button
                                            className=" border-none ml-6"
                                            onClick={() =>
                                                message && handleSendMessage()
                                            }
                                            //disabled={isLoading}
                                        >
                                            {isLoadingSendMessage ? (
                                                <CgSpinner className="animate-spin text-primary-90 text-3xl" />
                                            ) : (
                                                <img src={SendImg} alt="" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : isLoadingMessages ? (
                                <div className="h-screen w-full flex mt-24 justify-center">
                                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                                </div>
                            ) : (
                                <div className="h-screen w-full flex mt-40 justify-center">
                                    <p>Select a chat to start messaging</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Messaging
