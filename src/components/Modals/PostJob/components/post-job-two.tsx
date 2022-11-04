import { useFormikContext } from "formik"
import FormikControls from "../../../../components/Form/FormControls/form-controls"
import uploadIcon from "../../../../assets/image.svg"
import { ChangeEvent, useRef } from "react"
import { JobBoardByIdResponse } from "../../../../hooks/job-board/interface"
// import { useGetJobQualification } from "../../../../hooks/job-board/useJobBoard.hooks"

interface PostJobTwoProps {
    jobQualification: JobBoardByIdResponse[] | undefined
}

const PostJobTwo = ({ jobQualification }: PostJobTwoProps) => {
    const { setFieldValue, values } = useFormikContext<{
        jobDescription: string
        jobQualificationId: string
    }>()

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleCompanyLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setFieldValue("additionalInfoImageUrls", file)
        }
    }
    return (
        <div className="p-3">
            <div className="mt-1">
                <label className="text-3md font-semibold text-black-100 block mb-2">
                    Required Qualification
                </label>
                <FormikControls
                    control="select"
                    name="jobQualificationId"
                    aria-label="Required Qualification"
                    type="select"
                    className="rounded text-black-50"
                    data-testid="jobQualificationId"
                    defaultValue={values?.jobQualificationId}
                >
                    <option>Select an option---</option>
                    {jobQualification?.map((item) => (
                        <option key={item._id} value={item.name}>
                            {" "}
                            {item.name}{" "}
                        </option>
                    ))}
                </FormikControls>
            </div>

            <div className=" mt-4 gap-6 border-b border-black-10 mb-4 pb-6">
                <div>
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        Number of Operatives needed
                    </label>
                    <FormikControls
                        type="text"
                        name="numberOfOpsRequired"
                        control="input"
                        placeholder="0"
                        aria-label="Number of Operatives needed"
                        required
                        className="rounded"
                        data-testid="numberOfOpsRequired"
                    />
                </div>
            </div>

            <div className="mt-3">
                <label className="text-3md font-semibold text-neutral-80 block">
                    Description
                </label>
                <textarea
                    className="border border-black-10 rounded w-full p-3 outline-none mt-3"
                    name="jobDescription"
                    id="jobDescription"
                    cols={50}
                    rows={3}
                    onChange={(e) =>
                        setFieldValue("jobDescription", e.target.value)
                    }
                    value={values.jobDescription}
                ></textarea>
            </div>

            <div className="mt-4">
                <label className="text-3md font-semibold text-neutral-80 block">
                    Upload Image (optional)
                </label>
                <div className="border-dashed border-2 border-black-60 rounded-lg p-2 mt-4">
                    <input
                        data-testid="file-upload"
                        ref={fileInputRef}
                        type="file"
                        hidden
                        onChange={handleCompanyLogoUpload}
                    />
                    <div
                        className="bg-black-100 text-white-100 p-6 rounded flex gap-5 items-center"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <img src={uploadIcon} alt="upload" />
                        <div>
                            <p className="">Tap to Upload</p>
                            <span className="text-white-60 text-md">
                                JPEG, PNG accepted; 10MB max file size
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostJobTwo
