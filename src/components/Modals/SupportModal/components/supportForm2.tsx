import { useFormikContext } from "formik"
import uploadIcon from "../../../../assets/image.svg"
import { ChangeEvent, useRef, useState } from "react"

const SupportForm2 = () => {
    const { setFieldValue } = useFormikContext()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [pictureName, setPictureName] = useState("")

    const handleCompanyLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setPictureName(file.name)
            setFieldValue("image", file)
        }
    }
    return (
        <div className="w-full">
            <label
                // htmlFor="emailAdress"
                className="text-md md:text-3md mb-2 block"
            >
                Upload Image (optional)
            </label>
            {/* <div className="border-dashed border-2 border-black-60 rounded-lg p-2 mt-4"> */}
            <input
                data-testid="file-upload"
                ref={fileInputRef}
                type="file"
                hidden
                onChange={handleCompanyLogoUpload}
            />
            <div
                className="bg-black-10 text-white-100 p-6 rounded flex gap-5 items-center"
                onClick={() => fileInputRef.current?.click()}
            >
                <img src={uploadIcon} alt="upload" />
                <div>
                    <p className="text-black-100">
                        Tap to {pictureName ? "change" : "Upload"}
                    </p>
                    <span className="text-black-100 text-md">
                        {pictureName
                            ? pictureName + " selected"
                            : "JPEG, PNG accepted; 10MB max file size"}
                    </span>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default SupportForm2
