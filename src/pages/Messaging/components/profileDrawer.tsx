import { Drawer } from "@mantine/core"
import { TelegramClient, Api } from "telegram"

import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useRef,
    ChangeEvent,
    useCallback,
} from "react"

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
    const run = async () => {
        await client?.connect() // This assumes you have already authenticated with .start()
        try {
            const result = await client?.invoke(
                new Api.users.GetFullUser({
                    id: activeChat,
                })
            )
            if (result) {
                console.log(result) // prints the result
                setUserProfile(result)
                // const chat = await client?.getInputEntity("Test")
                // if (chat) {
                //     console.log("DVDV", chat) // prints the result
                // }
            }

            // const chat = await client?.getInputEntity("Test")
            // if (chat) {
            //     console.log("DVDV", chat) // prints the result
            // }
        } catch (err) {
            console.log(err)
        }
    }
    const run2 = async () => {
        await client?.connect()
        try {
        const result2 = await client?.invoke(
            new Api.messages.GetFullChat({
                //@ts-expect-error
                id: chatId.value,
            })
        )
        if (result2) {
            setGroupProfile(result2)
            console.log("RES", result2)
        }
    } catch (err) {
        console.log(err)
    }
    }
    //878135678n
    useEffect(() => {
        //console.log("jhb")
        if (!isGroup) {
            console.log("jhbhfgdtysh")
            run()
        } else {
            console.log("jhsttsstrsb")
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
            title="Chat Info"
            padding="xl"
        >
            <div className="p-4">
                <div className="flex justify-center">
                    <div>
                        <img
                            width="30px"
                            height={50}
                            src={
                                ""
                                // image
                                //     ? `data:image/jpeg;base64,${image}`
                                //     : `https://ui-avatars.com/api/?name=${
                                //           data.name
                                //       }&background=rgba(67, 107, 46, 0.5)&color=fff`
                            }
                            alt=""
                            // width={24}
                            // height={22}
                            // alt=""
                            className="rounded-full"
                        />
                        <h5 className="font-semibold text-2xl">Title</h5>
                        {isGroup && <p>members</p>}
                        <p>Last seen yesterday</p>
                    </div>
                </div>
                <div>
                    <p>+23468969200-2-</p>
                    <p>Phone</p>
                </div>
                <p>Add members</p>
                <div></div>
            </div>
        </Drawer>
    )
}

export default ProfileDrawer
