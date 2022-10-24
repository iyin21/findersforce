import React from "react";
import { Modal, PasswordInput } from "@mantine/core";
import LandingPageText from "./auth/components/landing-page-txt";
import showIcon from ".././assets/show.svg";
import successIcon from ".././assets/check.svg";
import Button from "./auth/components/button";
import styles from "./profile.module.scss";
import { NavLink } from "react-router-dom";

interface prop {
    check: boolean, 
    text: string
}

const CheckBox: React.FC<prop> = ({check, text}) => {
    return (
        <div>
            <label className={styles["container"]}>{text}
                <input type="checkbox" checked={check} />
                <span className={styles["checkmark"]}></span>
            </label>
        </div>
    );
}

const Profile = () => {
    const [opened, setOpened] = React.useState(false);
    return (
        <div className="grid grid-cols-2 text-white h-fit bg-black">
            <LandingPageText />
            <div className="my-8 mr-8 bg-white pt-12 px-16 flex flex-col rounded-lg">
                <h1 className="text-blaq text-4xl font-extrabold">Set up your Profile</h1>
                <span className="text-tex pt-2">Please provide the following information</span>
                <form className="pt-7">
                    <PasswordInput
                        placeholder="password"
                        label="Create password"
                        withAsterisk
                        radius="md"
                        size="xl"
                        styles={() => ({
                            innerInput: {
                                color: "rgba(15, 13, 0, 0.8)",
                                fontSize: "16px",
                                '&::placeholder': {
                                    color: "#E7E7E5",
                                    fontSize: '16px',
                                    lineHeight: '19px'
                                }
                            },
                            input: {
                                marginTop: '10px',
                                border: '1px solid rgba(15, 13, 0, 0.1)',
                                height: '64px',
                                marginBottom: '11px',
                                borderRadius: '10px'
                            },
                            label: {
                                color: '#0F0D00',
                                fontSize: '16px',
                                fontWeight: '800'
                            }
                        })}
                    />
                    
                    <div className="w-full bg-con h-fit p-5 pb-2 rounded-md mb-7 flex flex-col">
                        <span className="text-neutral-black font-medium text-sm">Your password should contain:</span>
                        <CheckBox check={true} text="A Lowercase letter (a)"/>
                        <CheckBox check={false} text="An Uppercase letter (A)"/>
                        <CheckBox check={false} text="A special character letter (!@#)"/>
                        <CheckBox check={false} text="A number (1)"/>
                        <CheckBox check={false} text="8 characters minimum"/>
                    </div>
                    <PasswordInput
                        placeholder="password"
                        label="Confirm password"
                        withAsterisk
                        radius="md"
                        size="xl"
                        styles={() => ({
                            innerInput: {
                                color: "rgba(15, 13, 0, 0.8)",
                                fontSize: "16px",
                                '&::placeholder': {
                                    color: "#E7E7E5",
                                    fontSize: '16px',
                                    lineHeight: '19px'
                                }
                            },
                            input: {
                                marginTop: '10px',
                                border: '1px solid rgba(15, 13, 0, 0.1)',
                                height: '64px',
                                marginBottom: '24px',
                                borderRadius: '10px'
                            },
                            label: {
                                color: '#0F0D00',
                                fontSize: '16px',
                                fontWeight: '800'
                            }
                        })}
                    />
                    <div onClick={e => {e.preventDefault(); setOpened(!opened)}} className="mb-[25px]">
                        <Button buttonText="Proceed"/>
                    </div>
                </form>
            </div>
            <Modal 
                opened={opened}
                centered
                withCloseButton={false}
                onClose={() => setOpened(!opened)}
                closeOnClickOutside={false}
                closeOnEscape={false}
                overlayOpacity={0.55}
                overlayBlur={3}
                sx={{
                    borderRadius: '10px', 
                    width: '350px', 
                    margin: '0 auto',
                }} >
                <div className="flex flex-col items-center">
                    <img src={successIcon} alt="success" className="pt-7"></img>
                    <h1 className="font-extrabold text-[28px] text-blaq pt-2">You are all set!</h1>
                    <span className="text-tex text-sm">Please provide the following information</span>
                    <NavLink to="/login" className="w-[183px] pt-7">
                        <Button buttonText="Get In"/>
                    </NavLink>
                </div>
            </Modal>
        </div>
    );
}

export default Profile;