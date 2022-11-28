import Button from "../../components/Core/Buttons/Button"
import Layout from "../../components/Layout"
import { FiPlus } from "react-icons/fi"
import LocationTable from "./components/location-table"
import { useState } from "react"
import { Input, Modal, TextInput } from "@mantine/core"
import { MdLocationOn } from "react-icons/md"
import { useId } from "@mantine/hooks"

const Location = () => {
    const [opened, setOpened] = useState(false)
    const id = useId()

    return (
        <Layout pageTitle={"Location"}>
            <div className="md:p-6 p-6 mt-4 md:mt-14">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1
                            className="text-2xl md:text-3xl font-creatoBold text-black-100 font-bold"
                            data-testid="location_title"
                        >
                            Location
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            All of your organization`s location in one glance
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        className="py-3 font-semibold font-creatoMedium"
                        iconLeft={<FiPlus size={20} />}
                        onClick={() => setOpened(true)}
                        data-testid="add_location_btn"
                    >
                        Add new location
                    </Button>
                </div>
                <LocationTable />
            </div>
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
                        Add a sub-location of your organization so you can
                        better manage all activities
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
        </Layout>
    )
}

export default Location
