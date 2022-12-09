import { Modal } from "@mantine/core"
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useRef,
    ChangeEvent,
} from "react"
import Camera from "../../../assets/camera.svg"

export interface AddGroupModalProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
}
const AddGroup = ({ opened, setOpened }: AddGroupModalProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [fileDataURL, setFileDataURL] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const handleGroupImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setImageFile(file)
            // setPictureName(file.name)
        }
    }
    useEffect(() => {
        let isCancel = false
        const fileReader = new FileReader()
        if (imageFile) {
            // fileReader = new FileReader();
            fileReader.onload = (e: any) => {
                const { result } = e.target
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(imageFile)
        }
        return () => {
            isCancel = true
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort()
            }
        }
    }, [imageFile])

    return (
        <Modal
            opened={opened}
            withCloseButton={false}
            onClose={() => setOpened(false)}
            size="sm"
            centered
        >
            <div className="flex text-blue-100 pt-4">
                <div>
                    <input
                        data-testid="file-upload"
                        ref={fileInputRef}
                        type="file"
                        hidden
                        onChange={handleGroupImageUpload}
                    />
                    {fileDataURL ? (
                        <div className="">
                            <img
                                src={fileDataURL}
                                alt="preview"
                                width={100}
                                height={200}
                                className=" rounded-full h-20"
                            />
                        </div>
                    ) : (
                        <img
                            src={Camera}
                            alt=""
                            onClick={() => fileInputRef.current?.click()}
                        />
                    )}
                </div>

                <div className="pl-10">
                    <p className="font-bold">Group Name</p>
                    <div className="border-b-2 pt-2 border-t-none border-blue-100">
                        <input
                            type="text"
                            className="w-full outline-none input bg-transparent"
                        />
                    </div>
                    {/* <Input control="" className="border-b-2 border-t-none border-blue-100" /> */}
                    <div className="flex justify-end mt-8 font-bold">
                        <p>Cancel</p>
                        <p className="pl-4">Next</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default AddGroup
