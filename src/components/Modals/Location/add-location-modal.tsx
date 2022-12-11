import { Input, Modal, TextInput } from "@mantine/core"
import { MdLocationOn } from "react-icons/md"
import { useId } from "@mantine/hooks"
import Button from "../../../components/Core/Buttons/Button"

interface prop {
    opened: boolean,
    setOpened: (val: boolean) => void,
}
const AddLocationModal = ({opened, setOpened}: prop) => {
    const id = useId()
    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            centered
            closeOnClickOutside={false}
            closeOnEscape={false}
            withCloseButton={false}
            styles={() => ({
                modal: {
                    width: "550px",
                },
                body: {
                    padding: "20px",
                },
            })}
        >
            <div>
                <p className="text-3xl font-extrabold font-creato">
                    Add a location
                </p>
                <span className="text-black-60 text-lg">
                    Add a sub-location of your organization so you can better
                    manage all activities
                </span>
                <form className="pt-8">
                    <Input.Wrapper
                        id={id}
                        label="Location"
                        required
                        styles={() => ({
                            label: {
                                fontSize: "15px",
                                fontWeight: 700,
                            },
                        })}
                    >
                        <Input
                            icon={<MdLocationOn size={22} />}
                            placeholder="New location"
                            id={id}
                            styles={() => ({
                                input: {
                                    border: "1px solid rgba(15, 13, 0, 0.1)",
                                    height: "60px",
                                    marginBottom: "11px",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                },
                            })}
                        />
                    </Input.Wrapper>
                    <TextInput
                        placeholder="Enter Email"
                        id="email"
                        label="Add Regional Manager"
                        required
                        withAsterisk
                        size="md"
                        styles={() => ({
                            label: {
                                fontSize: "15px",
                                fontWeight: 700,
                            },
                            input: {
                                border: "1px solid rgba(15, 13, 0, 0.1)",
                                height: "60px",
                                marginBottom: "11px",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                            },
                        })}
                    />
                    <div className="flex justify-between items-center pt-24">
                        <span
                            className="cursor-pointer"
                            onClick={() => setOpened(false)}
                        >
                            Cancel
                        </span>
                        <Button
                            variant="primary"
                            type="submit"
                            style={{
                                backgroundColor: "rgba(254, 215, 10, 1)",
                            }}
                            className="w-fit text-black-100 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br font-semibold font-creatoMedium"
                        >
                            Proceed
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default AddLocationModal
