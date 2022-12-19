import { useEffect, useState } from "react"
import FileDownloadIcon from "../assets/fileDownloadIcon.svg"
import { TelegramClient, Api } from "telegram"
import { Buffer } from "buffer"
import { AiOutlineArrowDown } from "react-icons/ai"
import { CgSpinner } from "react-icons/cg"
import ImageModal from "./ImageModal"
import { message } from "telegram/client"
import { AiFillFile } from "react-icons/ai"
import { iterMessages } from "telegram/client/messages"

type TPhoto = {
    photo: any
    photoThumbnail?: number[]
    photoCaption: string
    photoid: number
    filePath: string
    fileId: number
}
export default function ImageMessage({
    data,
    client,
    newClient,
    fileName,
    fileSize,
    item
}: {
    data: any
    client: TelegramClient
    newClient?: TelegramClient
    fileName?: string
    fileSize?: string
    item:Api.Message
}) {
    const [isDownloading, setIsDownloading] = useState(false)
    const [imageContent, setImageDataContent] = useState<TPhoto | null>(null)

    const [thumbnailImg, setThumbnailImg] = useState("")
    const [image, setImage] = useState("")
    const [openImageModal, setOpenImageModal] = useState(false)
    const [document, setDocument] = useState<Buffer|string>("")

    useEffect(() => {
        if (data.photo) {
            handleImageContent()
        //     handleImageContent()
         } else {
             console.log("crygxfxrs")
             handleDocumentContent()
         }
        
    }, [])
    const handleImageContent = async () => {
        //await client.connect()
        try {
            const thumbnailBuffer = await client.downloadMedia(data, {
                progressCallback: console.log,
                thumb: 0,
                //outputFile: "path/to/downloads_dir",
            })
            if (thumbnailBuffer) {
                console.log("fgg", thumbnailBuffer)
                const thumbnail =
                    Buffer.from(thumbnailBuffer).toString("base64")
                //data.photo.sizes[0].
                setThumbnailImg(thumbnail)
            }
        } catch (err) {
            console.log("error", err)
        }
    }
    const handleDocumentContent = async () => {
        console.log("docymtyy")
        await client.connect()
        try {
            const buffer = await client.downloadMedia(data, {})
            if (buffer) {
                console.log("uyvyuu", buffer)
                const thumbnail = Buffer.from(buffer).toString("base64")
                console.log("document", thumbnail)
            
                //@ts-expect-error
                setDocument(buffer)
                
            }
        } catch (err) {
            console.log("error", err)
        }
    }
    //console.log("data", data)
    //console.log("image", imageContent)
    const handleClick = async () => {
        setIsDownloading(true)
        await client.connect()
        //if(newClient){
        try {
            const buffer = await client.downloadMedia(data, {})
            if (buffer) {
                const imageBuffer = Buffer.from(buffer).toString("base64")
                console.log("jjgg", buffer)
                setImage(imageBuffer)
            }
        } catch (err) {
            console.log("error", err)
        } finally {
            setIsDownloading(false)
        }
        //}
    }
    // console.log("data", data)
    //@ts-expect-error
    console.log("file", item.file?.size?.value)
    return (
        <>
            <ImageModal
                opened={openImageModal}
                setOpened={setOpenImageModal}
                imageSource={`data:image/jpeg;base64,${image}`}
            />
            {data.className === "MessageMediaDocument" &&item.file? (
                <a
                    className="flex items-center ml-10 bg-black-5 w-[300px] pl-4"
                    onClick={() => handleDocumentContent()}
                    href={window.URL.createObjectURL(new Blob([document as Buffer], { type: item.file.mimeType }))}
                    target="_blank"
                    //rel="noreferrer"
                    download={item.file.name}
                    
                >
                    <div className="rounded-full bg-blue-100 p-3">
                        {/* <GrDocument color="white" size="20px"/> */}
                        <AiFillFile color="white" size="20px" />
                    </div>
                    <div className="ml-2">
                        <p>{item.file?.name}</p>
                        {/* <p>{item.file?.size}</p> */}
                    </div>
                </a>
            ) : (
                <div
                    className="rounded-[20px] cursor-pointer   ml-10 "
                    onClick={() =>
                        image ? setOpenImageModal(true) : handleClick()
                    }
                >
                    {image ? (
                        <img
                            src={`data:image/jpeg;base64,${image}`}
                            height={200}
                            width={200}
                        />
                    ) : (
                        <div className="relative rounded">
                            <div className="items-center  ml-32 bg-black-100 absolute mt-4 rounded-full p-4">
                                {isDownloading ? (
                                    <CgSpinner className="animate-spin text-white-100 text-xl" />
                                ) : (
                                    <AiOutlineArrowDown
                                        color="white"
                                        size="20px"
                                    />
                                )}

                                {/* <img src={FileDownloadIcon} alt="" /> */}
                            </div>
                            <img
                                src={`data:image/png;base64,${thumbnailImg}`}
                                height={100}
                                width={300}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
