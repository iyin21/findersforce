import { Menu } from "@mantine/core"
import { Dispatch, SetStateAction } from "react"
import { FiChevronRight } from "react-icons/fi"
import Button from "../../../../components/Core/Buttons/Button"

export interface DropdownInterface {
    setOpenPostAll: Dispatch<SetStateAction<boolean>>
    setOpenPostDirect: Dispatch<SetStateAction<boolean>>
}

const Dropdown = ({ setOpenPostAll, setOpenPostDirect }: DropdownInterface) => {
    return (
        <div className="relative">
            <Menu shadow="md" offset={8} closeOnClickOutside={true}>
                <Menu.Target>
                    <div>
                        <Button
                            size="normal"
                            className="w-full my-5"
                            variant="primary"
                            type="button"
                            style={{
                                backgroundColor: "rgba(254, 215, 10, 1)",
                            }}
                            iconRight={<FiChevronRight size={25} />}
                        >
                            Post
                        </Button>
                    </div>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        className="border-b border-black-100"
                        onClick={() => {
                            setOpenPostAll(true)
                        }}
                    >
                        Post All
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => {
                            setOpenPostDirect(true)
                        }}
                    >
                        Post Direct
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}

export default Dropdown
