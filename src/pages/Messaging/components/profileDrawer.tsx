import { Drawer } from "@mantine/core"
import { TelegramClient, Api } from "telegram"

import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
   
} from "react"
import { FiUserPlus } from "react-icons/fi"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import ProfilePicture from "./profilePicture"
import { FaPhoneAlt } from "react-icons/fa"
import { CgSpinner } from "react-icons/cg"
import AddNewMembersModal from "../../../components/Modals/Messaging/addNewMemberModal"

dayjs.extend(calendar)

interface ProfileDrawerProps {
    setOpenProfileDrawer: Dispatch<SetStateAction<boolean>>
    openProfileDrawer: boolean
    client?: TelegramClient
    isGroup: boolean
    chatId?: bigInt.BigInteger
    activeChat: string
}
const ProfileDrawer = ({
    setOpenProfileDrawer,
    openProfileDrawer,
    client,
    isGroup,
    chatId,
    activeChat,
}: ProfileDrawerProps) => {
    console.log(isGroup)
    const [userProfile, setUserProfile] = useState<Api.users.UserFull>()
    const [groupProfile, setGroupProfile] = useState<Api.messages.ChatFull>()
    const [isLoading, setIsLoading] = useState(false)
    const [showAddMemberModal, setShowAddMemberModal]= useState(false)
    const run = async () => {
        setIsLoading(true)
        await client?.connect() // This assumes you have already authenticated with .start()
        try {
            const result = await client?.invoke(
                new Api.users.GetFullUser({
                    id: activeChat,
                })
            )

            if (result) {
                setIsLoading(false)
                console.log(result) // prints the result
                setUserProfile(result)
                
            }

            
        } catch (err) {
    
        }
    }
    const run2 = async () => {
        setIsLoading(true)
        await client?.connect()
        try {
            const result2 = await client?.invoke(
                new Api.messages.GetFullChat({
                    //@ts-expect-error
                    chatId: chatId?.value,
                })
            )
            if (result2) {
                setGroupProfile(result2)
                console.log("RES", result2)

                const result3 = await client?.downloadProfilePhoto(
                    //@ts-expect-error
                    chatId?.value
                )
            }
        } catch (err) {
            console.log("ERRUR", err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
    
        if (!isGroup) {
            run()
        } else {
            run2()
        }
    }, [])
    
    return (
        <Drawer
            opened={openProfileDrawer}
            onClose={() => setOpenProfileDrawer(false)}
            //size="75%"
            withCloseButton={true}
            overlayBlur={2}
            overlayColor="#132013"
            overlayOpacity={0.5}
            position="right"
            title={<h5 className="font-semibold">Chat Info</h5>}
            padding="xl"
        >
            {showAddMemberModal &&(
                <AddNewMembersModal opened={showAddMemberModal} setOpened={setShowAddMemberModal} client={client} chatId={chatId}/>
            )}
            {isLoading ? (
                <div className="h-screen w-full flex mt-24 justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                </div>
            ) : (
                <div className="p-4">
                    <div className="text-center">
                        <div className="flex justify-center">
                            <ProfilePicture
                                client={client}
                                activeChat={activeChat}
                                data={
                                    //@ts-expect-error
                                    chatId.value
                                }
                                big
                            />
                        </div>
                        <h5 className="font-semibold text-2xl mt-2">
                            {isGroup
                                ? //@ts-expect-error
                                  groupProfile?.chats[0]?.title
                                : //@ts-expect-error
                                  userProfile?.users[0].firstName}
                        </h5>
                        {isGroup ? (
                            <p className="mt-2">
                                {groupProfile?.users.length || 0} members
                            </p>
                        ) : (
                            <p className="mb-2 text-3sm place-self-start">
                                {
                                    //@ts-expect-error
                                    userProfile?.users[0].status.className ===
                                    "UserStatusOnline"
                                        ? "online"
                                        : `Last seen ${dayjs(
                                              new Date(
                                                  //@ts-expect-error
                                                  userProfile?.users[0].status
                                                      .originalArgs.wasOnline *
                                                      1000
                                              )
                                          ).calendar(null, {
                                              sameDay: "[today at] h:mm A", // The same day ( Today at 2:30 AM )
                                              nextDay: "[Tomorrow]", // The next day ( Tomorrow at 2:30 AM )
                                              nextWeek: "dddd", // The next week ( Sunday at 2:30 AM )
                                              lastDay: "[yesterday at] h:mm A", // The day before ( Yesterday at 2:30 AM )
                                              lastWeek: "DD/MM/YYYY", // Last week ( Last Monday at 2:30 AM )
                                              sameElse: "DD/MM/YYYY", // Everything else ( 7/10/2011 )
                                          })}`
                                }
                            </p>
                        )}
                        {/* <p>Last seen yesterday</p> */}
                    </div>
                    {!isGroup && (
                        <div className="flex items-center mt-6">
                            <FaPhoneAlt />
                            <div className="pl-4">
                                <p>
                                    +
                                    {
                                        //@ts-expect-error
                                        userProfile?.users[0].phone
                                    }
                                </p>
                                <p>Phone</p>
                            </div>
                        </div>
                    )}
                    
                    {isGroup && (
                        <>
                        <hr className="text-black-20 mt-4 mb-4" />
                            <div className="flex justify-between">
                                <p className="font-semibold text-xl">Members</p>
                                <FiUserPlus
                                    size={20}
                                    className="cursor-pointer"
                                    onClick={()=>setShowAddMemberModal(true)}
                                />
                            </div>
                            <div className="mt-4">
                                {groupProfile?.users.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex"
                                    >
                                        <div className="rounded-full">
                                            <ProfilePicture
                                                client={client}
                                                activeChat={
                                                    //@ts-expect-error
                                                    item.firstName
                                                }
                                                data={
                                                    //@ts-expect-error
                                                    item.id.value
                                                }
                                            />
                                        </div>

                                        <div className="pl-4 ">
                                            <p className="font-semibold  ">
                                                {
                                                    //@ts-expect-error
                                                    item.firstName +
                                                        " " +
                                                        //@ts-expect-error
                                                        (item?.lastName || "")
                                                }
                                            </p>

                                            <p className="mb-4 text-3sm ">
                                                {
                                                    //@ts-expect-error
                                                    item.status.className ===
                                                    "UserStatusOnline"
                                                        ? "online"
                                                        : `Last seen ${dayjs(
                                                              new Date(
                                                                  //@ts-expect-error
                                                                  item.status
                                                                      .originalArgs
                                                                      .wasOnline *
                                                                      1000
                                                              )
                                                          ).calendar(null, {
                                                              sameDay:
                                                                  "[today at] h:mm A", // The same day ( Today at 2:30 AM )
                                                              nextDay:
                                                                  "[Tomorrow]", // The next day ( Tomorrow at 2:30 AM )
                                                              nextWeek: "dddd", // The next week ( Sunday at 2:30 AM )
                                                              lastDay:
                                                                  "[yesterday at] h:mm A", // The day before ( Yesterday at 2:30 AM )
                                                              lastWeek:
                                                                  "DD/MM/YYYY", // Last week ( Last Monday at 2:30 AM )
                                                              sameElse:
                                                                  "DD/MM/YYYY", // Everything else ( 7/10/2011 )
                                                          })}`
                                                }
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </Drawer>
    )
}

export default ProfileDrawer
