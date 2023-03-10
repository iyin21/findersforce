import { Modal } from "@mantine/core"
import { Dispatch, SetStateAction, useState } from "react"
import { TelegramClient, Api } from "telegram"

import { showNotification } from "@mantine/notifications"
import { AiFillFile } from "react-icons/ai"

interface FileModalProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    file?: File
    client?: TelegramClient
    chat: string
    uploadedFile: Api.InputFile | null | Api.InputFileBig

    handleResult: (result: Api.Message) => void
}
const FileModal = ({
    opened,
    setOpened,
    file,
    client,
    chat,
    uploadedFile,
    handleResult,
}: FileModalProps) => {
    const [caption, setCaption] = useState("")
    const [isSending, setIsSending] = useState(false)

    const handleSendFile = async () => {
        setIsSending(true)

        try {
            if (uploadedFile && client) {
                const result = await client.sendFile(chat, {
                    file: uploadedFile,

                    caption: caption,
                    ...(file?.type.includes("video")
                        ? { videoNote: true }
                        : file?.type.includes("audio")
                        ? { voiceNote: true }
                        : file?.type.includes("application")
                        ? { forceDocument: true }
                        : file?.type.includes("audio")
                        ? { voiceNote: true }
                        : ""),
                })
                if (result) {
                    // console.log("result2", result)
                    setIsSending(false)
                    //setResult(result)
                    handleResult(result)
                    setOpened(false)
                    setCaption("")
                }
            }
        } catch (err: any) {
            // console.log(err)
            showNotification({
                title: "Error",
                message:
                    err.errorMessage || "An error occured, pleease try again",
                color: "red",
            })
        }
    }
    return (
        <Modal
            opened={opened}
            withCloseButton={false}
            onClose={() => setOpened(false)}
            size="md"
            centered
        >
            {file?.type.includes("image") ? (
                <img
                    src={URL.createObjectURL(file)}
                    alt="findersforce"
                    className=" object-cover"
                />
            ) : (
                <div className="flex items-center">
                    <div className="rounded-full bg-blue-100 p-3">
                        <AiFillFile color="white" size="20px" />
                    </div>

                    <p className="ml-2">{file?.name}</p>
                </div>
            )}
            <hr className="text-black-20 mt-2" />
            <div className="mt-2">
                <input
                    type="text"
                    className="w-full outline-none input bg-transparent"
                    placeholder="Caption"
                    onChange={(e) => setCaption(e.currentTarget.value)}
                />
            </div>
            <div className="flex justify-end text-right mt-4">
                <p className="text-blue-100" onClick={() => setOpened(false)}>
                    Cancel
                </p>{" "}
                <p
                    className="text-blue-100 pl-4"
                    onClick={() => handleSendFile()}
                >
                    {isSending ? "Sending" : "Send"}
                </p>
            </div>
        </Modal>
    )
}

export default FileModal
