import { Modal } from "@mantine/core"
import { Dispatch, SetStateAction } from "react"

interface Props {
    openProfile: boolean
    setOpenProfile: Dispatch<SetStateAction<boolean>>
    queryStatus: any
    openMenu: boolean
    setOpenMenu: Dispatch<SetStateAction<boolean>>
}

const Menu = ({
    openProfile,
    setOpenProfile,
    queryStatus,
    openMenu,
    setOpenMenu,
}: Props) => {
    return (
        <Modal
            opened={openMenu}
            onClose={() => setOpenMenu(false)}
            withCloseButton={false}
            overlayOpacity={0.55}
            padding={0}
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            styles={() => ({
                modal: {
                    marginLeft: "auto",
                    marginTop: "10%",
                    width: "200px",
                },
            })}
        >
            <div className="font-creato grid grid-cols-1 gap-4 p-3 cursor-pointer">
                <h6>Track Operative</h6>
                <hr className="text-gray-80" />
                <h6 onClick={() => setOpenProfile(!openProfile)}>
                    View Profile
                </h6>
                {queryStatus === "cancelled" && (
                    <>
                        <hr className="text-gray-80" />
                        <h6>View Reason</h6>
                    </>
                )}
            </div>
        </Modal>
    )
}

export default Menu
