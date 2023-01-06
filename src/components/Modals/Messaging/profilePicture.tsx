import { TelegramClient, Api } from "telegram"
import { useEffect, useState,useCallback } from "react"
import { AiOutlineClose } from "react-icons/ai"

const ProfilePicture = ({
    client,
    data,
    className,
    showHover,
    handleUnSelect,
}: {
    client: TelegramClient
    data: any
    className?: string
    showHover?: boolean
    handleUnSelect?: () => void
}) => {
    const [image, setImage] = useState("")

    const [cancel, setCancel] = useState(false)
    const base64_arraybuffer = async (data: Buffer | string) => {
        // Use a FileReader to generate a base64 data URI
        const base64url = await new Promise((r) => {
            const reader = new FileReader()
            reader.onload = () => r(reader.result)
            reader.readAsDataURL(new Blob([data]))
        })

        /*
        The result looks like 
        "data:application/octet-stream;base64,<your base64 data>", 
        so we split off the beginning:
        */
        //@ts-expect-error
        return base64url.split(",", 2)[1]
    }

    const handleProfilePicture =  useCallback(async() => {
        await client.connect()
        try {
            const buffer = await client.downloadProfilePhoto(data)
            //@ts-expect-error
            if (buffer?.byteLength > 0) {
                //console.log("buff", buffer)
                //@ts-expect-error
                const imageBuffer = await base64_arraybuffer(buffer)

                setImage(imageBuffer)
            }
        } catch (err: any) {}
    },[data])
    useEffect(() => {
        handleProfilePicture()
    }, [])
    return (
        <div
            className={`items-center ${className}`}
            onMouseEnter={() => showHover && setCancel(true)}
            onMouseLeave={() => showHover && setCancel(false)}
        >
            {cancel ? (
                <div
                    className="bg-blue-100 p-1 rounded-full"
                    // @ts-expect-error
                    onClick={() => handleUnSelect()}
                >
                    <AiOutlineClose color="white" />
                </div>
            ) : (
                <img
                    width="20px"
                    height={40}
                    src={
                        image
                            ? `data:image/jpeg;base64,${image}`
                            : `https://ui-avatars.com/api/?name=${
                                  data.username || data.firstName
                              }&background=rgba(67, 107, 46, 0.5)&color=fff`
                    }
                    alt=""
                    // width={24}
                    // height={22}
                    // alt=""
                    className="rounded-full"
                />
            )}

            {/* <p className="px-2">{data.username|| data.firstName+" "+(data?.lastName||"")}</p> */}
        </div>
    )
}
export default ProfilePicture
