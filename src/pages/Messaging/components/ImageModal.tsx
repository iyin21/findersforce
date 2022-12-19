import { Modal } from "@mantine/core"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface ImageModalProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    imageSource:string
    
}
const ImageModal=({opened, setOpened, imageSource}:ImageModalProps)=>{
    return(
        <Modal
            opened={opened}
            withCloseButton={false}
            onClose={() => setOpened(false)}
            size="lg"
            centered
        >
            <img src={imageSource} alt="" />
        </Modal>
    )
}
export default ImageModal;