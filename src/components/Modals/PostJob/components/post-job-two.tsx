import { useFormikContext } from "formik"
import FormikControls from "../../../../components/Form/FormControls/form-controls"
import uploadIcon from "../../../../assets/image.svg"
import { ChangeEvent, useRef } from "react"

const PostJobTwo = () => {
    const { setFieldValue } = useFormikContext<{
        description: string
    }>()
    const requiredQualifications = [
        "Trainee",
        "TTMBC",
        "T1",
        "T2",
        "SLG UNIT 1",
        "SLG UNIT 2",
        "M1",
        "M2",
        "M3",
        "12A",
        "12B",
        "12D",
        "M4",
        "M5",
        "M6",
        "M7",
    ]
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleCompanyLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setFieldValue("image", file)
            // uploadProfileMutate({ file });
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
                    name="required_qualification"
                    aria-label="Required Qualification"
                    type="select"
                    className="rounded text-black-50"
                    data-testid="required_qualification"
                >
                    <option>Select an option---</option>
                    {requiredQualifications?.map((item) => (
                        <option key={item} value={item}>
                            {" "}
                            {item}{" "}
                        </option>
                    ))}
                </FormikControls>
            </div>
            <div className="mt-5">
                <label className="text-3md font-semibold text-neutral-80 block">
                    Other Qualifications
                </label>
                <span className="text-md text-black-50">
                    You can add other qualifications you are willling to
                    compromise on. <br /> You can add as many as possible.
                    Seperate with a comma.
                </span>
                <FormikControls
                    type="text"
                    name="other_qualification"
                    control="input"
                    placeholder="Start typing-"
                    aria-label="other_qualification"
                    required
                    className="rounded"
                    data-testid="other_qualification"
                />
            </div>

            <div className="grid grid-cols-2 mt-4 gap-6 border-b border-black-10 mb-4 pb-6">
                <div>
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        Number of Operatives needed
                    </label>
                    <FormikControls
                        type="text"
                        name="num_of_operatives"
                        control="input"
                        placeholder="0"
                        aria-label="Number of Operatives needed"
                        required
                        className="rounded"
                        data-testid="num_of_operatives"
                    />
                </div>
                <div>
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        Hourly Pay
                    </label>
                    <FormikControls
                        type="text"
                        name="hourly_pay"
                        control="input"
                        placeholder="0"
                        aria-label="Hourly Pay"
                        required
                        className="rounded"
                        data-testid="hourly_pay"
                        prefixIcon={
                            <span className="text-2lg mr-2 text-neutral-80 font-bold">
                                $
                            </span>
                        }
                    />
                </div>
            </div>

            <div className="mt-3">
                <label className="text-3md font-semibold text-neutral-80 block">
                    Description
                </label>
                <textarea
                    className="border border-black-10 rounded w-full p-3 outline-none mt-3"
                    name="description"
                    id="description"
                    cols={50}
                    rows={3}
                    onChange={(e) =>
                        setFieldValue("description", e.target.value)
                    }
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
