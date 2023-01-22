// export const ImageMessage = () => {
//     return <div>ImageMessage</div>
// }

import { useEffect, useState } from "react"
import { TelegramClient, Api } from "telegram"
// import { Buffer } from "buffer"
import { AiOutlineArrowDown } from "react-icons/ai"
import { CgSpinner } from "react-icons/cg"
import ImageModal from "./ImageModal"
import { AiFillFile } from "react-icons/ai"
import { showNotification } from "@mantine/notifications"

export default function ImageMessage({
    data,
    client,

    item,
}: {
    data: any
    client: TelegramClient

    item: Api.Message
}) {
    const [isDownloading, setIsDownloading] = useState(false)

    const [thumbnailImg, setThumbnailImg] = useState("")
    const [image, setImage] = useState("")
    const [openImageModal, setOpenImageModal] = useState(false)
    const [document, setDocument] = useState<Buffer | string>("")
    // const [webPage, setWebpage] = useState<Buffer | string>("")

    useEffect(() => {
        if (data.photo) {
            handleImageContent()
        } else {
            handleDocumentContent()
        }
    }, [])
    // eslint-disable-next-line camelcase
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
        // @ts-expect-error
        return base64url.split(",", 2)[1]
    }
    const handleImageContent = async () => {
        // await client.connect()
        try {
            const thumbnailBuffer = await client.downloadMedia(data, {
                progressCallback: () => {}, // console.log,
                thumb: 0,
                // outputFile: "path/to/downloads_dir",
            })

            if (thumbnailBuffer) {
                // @ts-ignore
                const thumbnail = await base64_arraybuffer(thumbnailBuffer)
                setThumbnailImg(thumbnail)
            }
        } catch (err) {}
    }
    const handleDocumentContent = async () => {
        await client.connect()
        try {
            const buffer = await client.downloadMedia(data, {})
            if (buffer) {
                // @ts-ignore
                setDocument(buffer)
            }
        } catch (_err) {}
    }

    const handleClick = async () => {
        setIsDownloading(true)
        await client.connect()
        try {
            const buffer = await client.downloadMedia(data, {})
            if (buffer) {
                // @ts-ignore
                const imageBuffer = await base64_arraybuffer(buffer)

                setImage(imageBuffer)
            }
        } catch (err: any) {
            showNotification({
                title: "Error",
                message:
                    err.errorMessage || "An error occured, please try again",
                color: "red",
            })
        } finally {
            setIsDownloading(false)
        }
    }

    // @ts-expect-erro
    // console.log("file", item.file?.size?.value)
    return (
        <>
            <ImageModal
                opened={openImageModal}
                setOpened={setOpenImageModal}
                imageSource={`data:image/jpeg;base64,${image}`}
            />
            {data.className === "MessageMediaDocument" && item.file ? (
                <a
                    className="flex items-center ml-10 bg-black-5 w-[300px] pl-4"
                    onClick={() => handleDocumentContent()}
                    href={window.URL.createObjectURL(
                        new Blob([document as Buffer], {
                            type: item.file.mimeType,
                        })
                    )}
                    target="_blank"
                    // rel="noreferrer"
                    download={item.file.name}
                    rel="noreferrer"
                >
                    <div className="rounded-full bg-blue-100 p-3">
                        <AiFillFile color="white" size="20px" />
                    </div>
                    <div className="ml-2">
                        <p>{item.file?.name}</p>
                        {/* <p>{item.file?.size}</p> */}
                    </div>
                </a>
            ) : data.className === "MessageMediaWebPage" && item.file ? (
                <div>
                    <iframe
                        src={data.webpage.embedUrl}
                        className="ml-10"
                        height="300"
                        width="300"
                        allow="fullscreen"
                        title="webpage"
                    ></iframe>
                </div>
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
                            height={100}
                            width={300}
                            alt=""
                        />
                    ) : (
                        <div className="relative rounded">
                            <div className="items-center  ml-20 bg-black-100 absolute mt-4 rounded-full p-4">
                                {isDownloading ? (
                                    <CgSpinner className="animate-spin text-white-100 text-xl" />
                                ) : (
                                    <AiOutlineArrowDown
                                        color="white"
                                        size="20px"
                                    />
                                )}
                            </div>
                            <img
                                src={`data:image/png;base64,${thumbnailImg}`}
                                height={100}
                                width={300}
                                alt=""
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
