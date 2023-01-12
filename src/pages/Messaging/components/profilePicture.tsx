import { TelegramClient, Api } from "telegram"
import { useEffect, useState, useCallback } from "react"
const ProfilePicture=({
    client,
    data,
    
}: {
    client?: TelegramClient
    data: any
    
})=>{
    const [image, setImage] = useState("")
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
    
        await client?.connect()
        try {
            const buffer = await client?.downloadProfilePhoto(data)
            
            //@ts-expect-error
            if (buffer?.byteLength > 0) {
                // console.log("buff", buffer)
                //@ts-expect-error
                const imageBuffer = await base64_arraybuffer(buffer)

                setImage(imageBuffer)
            }
        } catch (err: any) {
    
        }
    },[data])

    useEffect(() => {
        handleProfilePicture()
    }, [])
    
    return(
        <img
        width="30px"
        height={50}
        src={
            image
                ? `data:image/jpeg;base64,${image}`
                : `https://ui-avatars.com/api/?name=${
                      data.name
                  }&background=rgba(67, 107, 46, 0.5)&color=fff`
        }
        alt=""
        // width={24}
        // height={22}
        // alt=""
        className="rounded-full"
    />
    )
}
export default ProfilePicture;