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
import ReadIcon from "./assets/read.svg"
import Avatar from "../Applications/assets/avatar.png"
import { MdGroup } from "react-icons/md"
import AddGroup from "../../components/Modals/Messaging/addGroupModal"
import { TelegramClient, Api } from "telegram"
import { StringSession } from "telegram/sessions"
import { useEffect, useRef } from "react"
import { Field, Formik, Form, FormikValues } from "formik"
import FormikControls from "../../components/Form/FormControls/form-controls"
import {
    validateTelegramLoginRequest,
    validateTelegramSigninRequest,
} from "./utils/validateTelegramLoginRequest"
import { DialogType } from "./types/telegram.type"
import { chats, message } from "telegram/client"
import dayjs from "dayjs"
import { CgSpinner } from "react-icons/cg"
import { NewMessageEvent, NewMessage } from "telegram/events"
import TelegramLogo from "./assets/telegramLogo.svg"
import { showNotification } from "@mantine/notifications"
import { Buffer } from "buffer"
import FileDownloadIcon from "./assets/fileDownloadIcon.svg"
import ImageMessage from "./components/ImageMessage"
import { GrAttachment } from "react-icons/gr"
import { betterConsoleLog } from "telegram/Helpers"
import FileModal from "./components/fileModal"

interface Message {
    text: string
    name: string
    time: string
    media?: Api.TypeMessageMedia
    fileName?: string
    fileSize?: string
}

const Messaging = () => {
    const [phase, setPhase] = useState(1)
    const [phone, setPhone] = useState("")
    const [phoneCodeHash, setPhoneCodeHash] = useState("")
    const [newClient, setNewClient] = useState<TelegramClient>()
    //const [session, setSession] = useState("")
    const [dialog, setDialog] = useState<any[]>([])
    const [activeChat, setActiveChat] = useState("")
    const [chatHistory, setChatHistory] = useState<Api.Message[]>([])
    const [isLoadingMessages, setIsLoadingMessages] = useState(false)
    const [me, setMe] = useState<any>()
    const [isFetchingDialog, setIsFetchingDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [chatId, setChatId] = useState<bigInt.BigInteger>()
    const [isSendingCode, setIsSendingCode] = useState(false)
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [imgBuffer, setImgBuffer] = useState("")
    const [ibuffer, setIBuffer] = useState<Buffer | null>(null)

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

    console.log("session", sessionStorage.getItem("session"))
    //const item = appointments?.find((item) => item.patient._id === patient_id);

    useEffect(() => {
        const run = async () => {
            setIsFetchingDialog(true)
            await client.connect()
            try {
                const meResult = await client.getMe()
                if (meResult) {
                    setMe(meResult)
                }
                const result = await client.getDialogs({})
                if (result) {
                    setDialog(result)
                    setNewClient(client)

                    console.log("dialog", result)
                    // const result3 = await client.invoke(
                    //     new Api.photos.GetUserPhotos({
                    //       userId: "username",
                    //       offset: 43,
                    //       maxId: 3,
                    //       limit: 100,
                    //     })
                    //   );
                    for await (const message of client.iterMessages(
                        "Paul",
                        {}
                    )) {
                        console.log(message.id, message._sender.firstName)
                    }
                }
            } finally {
                setIsFetchingDialog(false)
            }
        }

        if (phase === 3) {
            run()

            async function eventPrint(event: NewMessageEvent) {
                const message = event.message
                const sender = await message.getSender()
                const sender2 = await message.getInputSender()
                const getChat = await message.getChat()
                const id = message.chat?.id
                // Checks if it's a private message (from user or bot)
                if (event.isPrivate && id) {
                    // prints sender id
                    console.log("gcc", message)
                    console.log("ggg", event)
                    console.log("inputChat", await message.getChat())
                    if (sender) {
                        console.log("gigi", sender)
                    }
                    if (sender2) {
                        console.log("yfytd", sender2)
                    }
                    //@ts-expect-error
                    console.log(getChat?.firstName + " " + getChat?.lastName)
                    //@ts-expect-error
                    if (chatId?.value === id.value) {
                        setChatHistory((chat) => [
                            ...chat, message
                            // {
                            //     text: message.text,
                            //     name:
                            //         message._sender?.username ||
                            //         message._sender?.firstName,
                            //     time: dayjs(
                            //         new Date(message.date * 1000)
                            //     ).format("h:mm A,"),
                            //     ...(message.media && { media: message.media }),
                            //     ...(message.file?.name && {
                            //         fileName: message.file.name,
                            //     }),
                            //     ...(message.file?.size && {
                            //         fileSize: message.file.size,
                            //     }),
                            // },
                        ])
                    } else {
                        console.log("hjhj", dialog[0].message.chat?.id?.value)
                        // const item = dialog.find(
                        //     (item) =>
                        //         //@ts-expect-error
                        //         item.message.chat?.id.value === chatId.value
                        // )
                        // console.log("ggg", item)
                        // setDialog(
                        //     dialog.map((item) => {
                        //         console.log(
                        //             //@ts-expect-error
                        //             item.message.chat?.id?.value === chatId?.value
                        //                 ? item.unreadCount + 1
                        //                 : item.unreadCount
                        //         )
                        //         //@ts-expect-error
                        //         return item.message.chat?.id?.value === chatId?.value
                        //             ? item.unreadCount + 1
                        //             : item.unreadCount
                        //     })
                        // )

                        // dialog.forEach(function (item, i) {
                        //     //@ts-expect-error
                        //     if (item.message.chat?.id?.value === chatId.value)
                        //         console.log("count", dialog[i].unreadCount)
                        //     setDialog(
                        //     )
                        // })
                    }
                    // else {
                    //     console.log("HELLo jsdhds")
                    // }
                }
            }
            // adds an event handler for new messages
            client.addEventHandler(eventPrint, new NewMessage({}))
        }
    }, [phase, client.getDialogs, client.addEventHandler])
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
            } finally {
                setIsLoading(false)
            }
        }
        run()
        // sessionStorage.removeItem(
        //     "session"
        // )
        // setPhase(1)
    }, [])

    const handleSubmit = async (
        values: FormikValues,
        callback: () => Promise<unknown>
    ) => {
        await client.connect()

        try {
            const result = await callback()
            if (result) {
                console.log("result", result)
                if (phase === 1) {
                    setPhase(2)
                } else {
                    setPhase(3)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleShowMessages = async (value: string) => {
        setIsLoadingMessages(true)
        await client.connect()

        // if (me) {
        //     console.log("me", me)
        // }

        setActiveChat(value)
        try {
            const result = await newClient?.getMessages(value, {
                limit: 100,
                reverse: true,
            })
            if (result) {
                console.log("njhi", result)
                //CustomMessage.file
                if (result[7].media) {
                    //setTimeout(some code, 600000)
                    
                    const buffer = await client.downloadMedia(result[7].media, {
                        //@ts-expect-error
                        workers: 1,
                    })
                    console.log("jhj", buffer)
                    if (buffer) {
                        // //@ts-expect-error
                        // const img = new Buffer.from(buffer).toString("base64")
                        const hh = Buffer.from(buffer).toString("base64")
                        //console.log("jhjh", img);
                        console.log("jhjh", `data:image/png;base64,${hh}`)
                        setImgBuffer(hh)
                    }

                    
                }
                setChatId(result[0].chat?.id)

                setChatHistory(() => [
                    // ...chat,
                    ...result
                        .filter(
                            (item: Api.Message) => item.message !== undefined
                        )
                        .map((item: Api.Message) => (
                            item
                        //     {
                        //     // text: item?.message,

                        //     // name:
                        //     //     item._sender?.username ||
                        //     //     item._sender?.firstName,
                        //     // time: dayjs(new Date(item.date * 1000)).format(
                        //     //     "h:mm A, DD, MMM YYYY"
                        //     // ),
                        //     // ...(item.media && { media: item.media }),
                        //     // ...(item.file?.name && {
                        //     //     fileName: item.file.name,
                        //     // }),
                        //     // ...(item.file?.size && {
                        //     //     fileSize: item.file.size,
                        //     // }),
                        // }
                        )),
                ])
            }
        } finally {
            setIsLoadingMessages(false)
        }
    }
    const handleSendCode = async (values: FormikValues) => {
        setIsSendingCode(true)
        await client.connect()

        //const { phoneCodeHash, isCodeViaApp }
        try {
            const result = await client.sendCode(
                {
                    apiId: apiId,
                    apiHash: apiHash,
                },
                values.phoneNumber
                //forceSMS
            )
            if (result) {
                setNewClient(client)
                setPhoneCodeHash(result.phoneCodeHash)
                setPhase(2)
                console.log("result:", result)
            }
        } catch (err: any) {
            showNotification({
                title: "Error",
                message:
                    err.errorMessage || "An error occured, pleease try again",
                color: "red",
            })
        } finally {
            setIsSendingCode(false)
        }
    }
    const handleSignIn = async (values: FormikValues) => {
        //await client.connect()
        setIsSigningIn(true)

        try {
            const result = await newClient?.invoke(
                new Api.auth.SignIn({
                    phoneNumber: phone,
                    phoneCodeHash,
                    phoneCode: values.code,
                })
            )

            if (result) {
                console.log("result", result)

                sessionStorage.setItem(
                    "session",
                    newClient?.session.save() || ""
                )
                setPhase(3)
            }
        } catch (err: any) {
            setIsSigningIn(false)
            showNotification({
                title: "Error",
                message:
                    err.errorMessage || "An error occured, pleease try again",
                color: "red",
            })
        } finally {
            setIsSigningIn(false)
        }
    }
    const [openMenu, setOpenMenu] = useState(false)
    const [message, setMessage] = useState("")
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [openModal, setOpenModal] = useState(false)
    const [isLoadingSendMessage, setIsLoadingSendMessage] = useState(false)
    const [openFileModal, setOpenFileModal] = useState(false)
    const [fileUpload, setFileUpload] = useState<File>()
    const [filePath, setFilePath] = useState("")
    const [uploadedFile, setUploadedFile] = useState<
        Api.InputFile | null | Api.InputFileBig
    >(null)

    const handleSendMessage = async () => {
        setIsLoadingSendMessage(true)
        try {
            const result = await newClient?.sendMessage(activeChat, {
                message: message,
            })
            if (result) {
                setMessage("")
                console.log(result)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoadingSendMessage(false)
        }
    }
    console.log(me)
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
    const handleClick = async (media: any) => {
        try {
            const buffer = await client.downloadMedia(media, {
                //@ts-expect-error
                workers: 1,
            })
            if (buffer) {
                const imageBuffer = Buffer.from(buffer).toString("base64")
                //console.log("jhjh", img);
                console.log("jhjh", `data:image/png;base64,${imageBuffer}`)
                // setImgBuffer(imageBuffer)
                const anchorEl = document.createElement("a")

                anchorEl.href = `data:image/png;base64,${imageBuffer}`
                anchorEl.target = "_blank"
                anchorEl.rel = "noopener"
                // setTimeout is needed in order to open files in iOS Safari.
                setTimeout(() => {
                    anchorEl.click()
                })
            }
        } finally {
        }
    }

    // this handles the ref that gets triggered when the user clicks on the attach icon
    const ref = useRef<HTMLInputElement | null>(null)

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        console.log("file", e.target.files)

        if (file) {
            // console.log(
            //     (window.URL || window.webkitURL).createObjectURL(
            //         e.target.files?.[0]
            //     )
            // )
            // setFilePath((window.URL || window.webkitURL).createObjectURL(
            //     e.target.files?.[0]
            // ))
            // setFileUpload(e.target.files?.[0])
            // setOpenFileModal(true)
            try {
                const result = await newClient?.uploadFile({
                    file: file,
                    workers: 1,
                })
                if (result) {
                    console.log("ffk..ks", result)
                    setFileUpload(e.target.files?.[0])
                    setUploadedFile(result)
                    setOpenFileModal(true)
                    console.log("hey")
                }
            } catch (err) {
                console.log(err)
                showNotification({
                    title: "Error",
                    message: "Error uploading file, plese try again",

                    color: "red",
                })
            }
        }
    }

    return (
        <Layout pageTitle="Messaging" noTopNav>
            <FileModal
                opened={openFileModal}
                setOpened={setOpenFileModal}
                file={fileUpload}
                client={newClient}
                chat={activeChat}
                fileBuffer={ibuffer}
                uploadedFile={uploadedFile}
            />
            <div className="h-screen relative">
                {isLoading || isFetchingDialog ? (
                    <div className="h-screen w-full flex mt-24 justify-center">
                        <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                    </div>
                ) : phase === 1 ? (
                    <div className="flex justify-center items-center mt-20">
                        <div className="text-center ">
                            <div className="flex justify-center text-center items-center">
                                <img
                                    src={TelegramLogo}
                                    alt=""
                                    width="150px"
                                    height="150px"
                                />
                            </div>

                            <h5 className="font-normal text-3xl mb-4">
                                Sign in to telegram
                            </h5>
                            <Formik
                                initialValues={{
                                    phoneNumber: "",
                                }}
                                validationSchema={validateTelegramLoginRequest}
                                onSubmit={(values) => {
                                    setPhone(values.phoneNumber)
                                    handleSendCode(values)
                                    //     handleSubmit(values, () => {
                                    //         return client.sendCode(
                                    //             {
                                    //                 apiId: apiId,
                                    //                 apiHash: apiHash,
                                    //             },
                                    //             values.phoneNumber
                                    //         )
                                    //     })
                                }}
                            >
                                {({}) => (
                                    <Form>
                                        <div className="w-full">
                                            <label
                                                htmlFor="phoneNumber"
                                                className="text-md md:text-3md mb-2 block text-left"
                                            >
                                                Please input your phone number
                                                with the country code
                                            </label>
                                            <FormikControls
                                                data-testid="phoneNumber"
                                                id="phoneNumber"
                                                control="input"
                                                name="phoneNumber"
                                                type="tel"
                                                placeholder="+2348108350294"
                                                className="rounded"
                                                aria-label="quantity"
                                            />
                                        </div>
                                        <button
                                            className="text-white-100 rounded  rounded-tr-2xl  font-bold body-medium p-4  px-10 mt-4 w-full"
                                            type="submit"
                                            style={{
                                                backgroundColor:
                                                    "rgba(65, 159, 217, 1)",
                                            }}
                                            disabled={isSendingCode}
                                        >
                                            {isSendingCode
                                                ? "Loading.."
                                                : "Next"}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                ) : phase === 2 ? (
                    <div className="flex justify-center items-center mt-40">
                        <div className="text-center ">
                            <div className="flex justify-center text-center items-center">
                                <img
                                    src={TelegramLogo}
                                    alt=""
                                    width="150px"
                                    height="150px"
                                />
                            </div>
                            <h5 className="font-normal text-3xl mb-4">
                                {phone}
                            </h5>
                            <p>Please enter the code you've just</p>
                            <p className="mb-10">
                                received in your previous telegram app.
                            </p>
                            <Formik
                                initialValues={{
                                    code: "",
                                }}
                                validationSchema={validateTelegramSigninRequest}
                                onSubmit={(values) => {
                                    handleSignIn(values)
                                }}
                            >
                                {({}) => (
                                    <Form>
                                        <div className="w-full">
                                            <FormikControls
                                                data-testid="code"
                                                id="code"
                                                control="input"
                                                name="code"
                                                type="text"
                                                placeholder="Code"
                                                className="rounded"
                                                //aria-label="quantity"
                                            />
                                        </div>
                                        <button
                                            className="text-white-100 rounded rounded-tr-2xl w-full items-center font-bold body-medium p-4  px-10 mt-6"
                                            type="submit"
                                            style={{
                                                backgroundColor:
                                                    "rgba(65, 159, 217, 1)",
                                            }}
                                            disabled={isSigningIn}
                                        >
                                            {isSigningIn ? "Loading.." : "Next"}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                ) : (
                    <div className="h-screen relative">
                        {openModal && (
                            <AddGroup
                                opened={openModal}
                                setOpened={setOpenModal}
                            />
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
                                    <h5 className="font-bold text-2lg">
                                        Revive Traffic
                                    </h5>
                                    <p className="text-black-40 pt-2">
                                        +44 04 7743 1239
                                    </p>
                                </div>

                                <hr className="text-[#E7E7E7] mt-4" />
                                <div className="flex pt-4 pl-4 items-center">
                                    <div className="bg-[#56B3F5] rounded p-2">
                                        <MdGroup color="white" />
                                    </div>
                                    <p
                                        className="pl-2 cursor-pointer"
                                        onClick={() => setOpenModal(true)}
                                    >
                                        New Group
                                    </p>
                                </div>
                                <div className="absolute bottom-4 pl-4 text-black-40">
                                    <p className="font-bold">
                                        Telegram Desktop
                                    </p>
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
                                    />
                                </div>
                                <div className="mt-8 overflow-y-auto h-full">
                                    {dialog.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`flex p-2 items-center ${
                                                activeIndex === index
                                                    ? "bg-blue-100 text-white-100"
                                                    : "bg-white-100 text-black-90"
                                            }`}
                                            onClick={() => {
                                                setActiveIndex(index)
                                                handleShowMessages(item.title)
                                            }}
                                        >
                                            <img
                                                width="40px"
                                                height={60}
                                                src={`https://ui-avatars.com/api/?name=${item.title}&background=rgba(67, 107, 46, 0.5)&color=fff`}
                                                alt=""
                                                // width={24}
                                                // height={22}
                                                // alt=""
                                                className="rounded-full bg-blue-100"
                                            />
                                            <div className="flex justify-between w-full">
                                                <div className="pl-2">
                                                    <div className="flex items-center">
                                                        {!item.isUser && (
                                                            <MdGroup className="mr-1" />
                                                        )}
                                                        <h5 className="text-3md font-bold">
                                                            {item.title}
                                                        </h5>
                                                    </div>
                                                    <p className="text-[10px]">
                                                        {item.message.message}
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
                                                                item.date
                                                            ).format("h:mm A,")}
                                                        </span>
                                                    </p>
                                                    <p
                                                        className={`text-right rounded ml-8 font-bold p-1 ${
                                                            activeIndex ===
                                                            index
                                                                ? "bg-white-80"
                                                                : "bg-black-30"
                                                        }`}
                                                    >
                                                        {item.unreadCount}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {chatHistory && chatHistory.length > 0 ? (
                                <div className="w-full pt-8">
                                    <div className="flex justify-between pl-4 pr-8 pb-2">
                                        <div>
                                            <p className="body-small font-bold">
                                                {activeChat}
                                            </p>
                                            <p className="text-neutral-100 body-extra-small pt-1 font-bold">
                                                46 Members
                                            </p>
                                            {/* {imgBuffer && (
                                                <img
                                                    src={`data:image/jpeg;base64,${imgBuffer}`}
                                                />
                                            )} */}
                                        </div>
                                        <div className="flex gap-6 text-black-40 cursor-pointer">
                                            <MdCall size={30} />
                                            <HiVideoCamera size={30} />
                                            <BiSearch size={30} />
                                            <AiOutlineMore size={30} />
                                        </div>
                                    </div>
                                    <hr className="text-[#E7E7E7]" />
                                    <div
                                        className="overflow-y-auto h-full"
                                        ref={containerRef}
                                    >
                                        {chatHistory.map((item, index) => (
                                            <div key={index}>
                                                {item.media ? (
                                                    <div>
                                                        <div className="bg-black-5 mt-8 ml-10 w-[300px] rounded-tl-[20px] rounded-tr-[20px] p-4 ">
                                                            <p
                                                                className={`${
                                                                    item._sender?.username ||item._sender?.firstName,
                                                                    me?.firstName
                                                                        ? "text-red-190"
                                                                        : "text-blue-90"
                                                                } body-small`}
                                                            >
                                                                {item._sender?.username ||item._sender?.firstName}
                                                            </p>
                                                        </div>
                                                        <ImageMessage
                                                            data={item.media}
                                                            client={client}
                                                            newClient={
                                                                newClient
                                                            }
                                                            item={item}
                                                            // fileName={
                                                            //     item.fileName
                                                            // }
                                                            // fileSize={
                                                            //     item.fileSize
                                                            // }
                                                        />
                                                        <div className="bg-black-5 ml-10 w-[300px] rounded-br-[20px] rounded-bl-[20px] p-4 ">
                                                            <p className="mt-2 text-black-90 text-md">
                                                                {item.text}
                                                            </p>
                                                            <p className="text-black-40 text-md flex justify-end mt-2">
                                                                {dayjs(new Date(item.date * 1000)).format("h:mm A, DD, MMM YYYY")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-black-5 mt-8 ml-10 w-[500px] rounded-[20px] p-4 mb-2">
                                                        <div className="flex justify-between">
                                                            <p
                                                                className={`${
                                                                    item._sender?.username ||item._sender?.firstName===
                                                                    me?.firstName
                                                                        ? "text-red-190"
                                                                        : "text-blue-90"
                                                                } body-small`}
                                                            >
                                                                {item._sender?.username ||item._sender?.firstName}
                                                            </p>
                                                            {/* <p className="text-black-40 text-md">
                                            Reply
                                        </p> */}
                                                        </div>
                                                        <p className="mt-2 text-black-90 text-md">
                                                            {item.text}
                                                        </p>
                                                        <p className="text-black-40 text-md flex justify-end mt-2">
                                                        {dayjs(new Date(item.date * 1000)).format("h:mm A, DD, MMM YYYY")}
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
