import { useFormikContext } from "formik"
import FormikControls from "../../../../components/Form/FormControls/form-controls"
import uploadIcon from "../../../../assets/image.svg"
import cancelIcon from "../../../../assets/CanceledShifts.svg"
import { useEffect, useRef, useState } from "react"
import { JobBoardByIdResponse } from "../../../../types/job-board/interface"

interface PostJobTwoProps {
    jobQualification: JobBoardByIdResponse[] | undefined
}

const PostJobTwo = ({ jobQualification }: PostJobTwoProps) => {
    // this handles the ref that gets triggered when the user clicks on the upload button
    const ref = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState<string[]>([])
    // this updates the formik values in PostJob.tsx
    const { setFieldValue, values } = useFormikContext<{
        jobDescription: string
        jobQualificationId: string
        additionalInfoImageUrls: File[]
    }>()
    //

    function uploadSingleFile(e: any) {
        setFile([...file, ...e.target.files])
    }

    function deleteFile(e: any) {
        const newFiles = file.filter((_item, index) => index !== e)
        setFile(newFiles)
    }

    useEffect(() => {
        setFieldValue("additionalInfoImageUrls", [...file])
    }, [file])

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
                </label>{" "}
                <span className="text-black-60 text-md">
                    Give more context to the job description
                </span>
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
                    Upload Images (optional)
                </label>
                <span className="text-black-60 text-md">
                    You can upload up to 5 images.
                </span>
                <div className="mt-3 flex flex-row relative gap-6">
                    {values.additionalInfoImageUrls.length > 0 &&
                        values.additionalInfoImageUrls.map((item, index) => {
                            return (
                                <div key={index} className="relative ">
                                    <img
                                        // @ts-ignore
                                        src={URL.createObjectURL(item)}
                                        alt="findersforce"
                                        className="w-[100px] h-[100px] object-cover rounded-xl"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => deleteFile(index)}
                                        className="absolute -top-2 -right-1"
                                    >
                                        <img
                                            src={cancelIcon}
                                            alt=""
                                            className="w-[24px]"
                                        />
                                    </button>
                                </div>
                            )
                        })}
                </div>
                <div className="border-dashed border-2 border-yellow-60 rounded-lg p-2 mt-4">
                    <div
                        className="bg-yellow-5 text-black-100 p-6 rounded gap-5 text-center"
                        onClick={() => {
                            ref.current?.click()
                        }}
                    >
                        <img
                            src={uploadIcon}
                            alt="upload"
                            className="w-auto mx-auto mb-2"
                        />
                        <div className="text-center">
                            <input
                                type="file"
                                disabled={file.length === 2}
                                className="hidden"
                                onChange={(e) => uploadSingleFile(e)}
                                multiple
                                accept="image/png,image/jpeg"
                                ref={ref}
                            />

                            <p className="">Tap to Upload</p>
                            <span className="text-black-60 text-md">
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
