import { Modal } from "@mantine/core"
import Button from "../../../components/Core/Buttons/Button"
import { NavLink } from "react-router-dom"
import { Dispatch, SetStateAction } from "react"
import successIcon from "../../../assets/check.svg"

export interface SuccessLoginProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
}

const SuccessfulLogin = ({ opened, setOpened }: SuccessLoginProps) => {
    return (
        <div>
            <Modal
                opened={opened}
                centered
                withCloseButton={false}
                onClose={() => setOpened(!opened)}
                closeOnClickOutside={false}
                closeOnEscape={false}
                overlayOpacity={0.55}
                overlayBlur={3}
                size="md"
            >
                <div className="flex flex-col items-center font-creato">
                    <img src={successIcon} alt="success" className="pt-7"></img>
                    <h1 className="font-extrabold text-[28px] text-[#050001] pt-2">
                        Setup Completed!
                    </h1>
                    <span className="text-[#0F0D00B2] opacity-70 text-[14px]">
                        Unlock your depot’s true potential.
                    </span>
                    <NavLink to="/login" className="pt-7">
                        <Button
                            variant="primary"
                            style={{
                                backgroundColor: "rgba(254, 215, 10, 1)",
                            }}
                            className="text-black-100 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                        >
                            Enter Finders Force
                        </Button>
                    </NavLink>
                </div>
            </Modal>
        </div>
    )
}

export default SuccessfulLogin
