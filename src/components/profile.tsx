import React from "react";
import { Modal, PasswordInput, Text, Popover, Box } from "@mantine/core";
import { useForm } from '@mantine/form';
import LandingPageText from "./auth/components/landing-page-txt";
import successIcon from ".././assets/check.svg";
import Button from "./auth/components/button";
import styles from "./profile.module.scss";
import { NavLink } from "react-router-dom";
import { passwordInputStyle } from "./auth/utils";


const CheckBox = ({check}: {check: boolean}) => {
    return (
        <div>
            <label className={styles["container"]}>
                <input type="checkbox" checked={check} readOnly/>
                <span className={styles["checkmark"]}></span>
            </label>
        </div>
    );
}

const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => {
    return (
      <Text
        color={meets ? 'teal' : 'red'}
        sx={{ display: 'flex', alignItems: 'center' }}
        mt={7}
        size="sm"
      >
        {meets ? <CheckBox check={true} /> : <CheckBox check={false} />} <span className="ml-2.5 pt-4">{label}</span>
      </Text>
    );
}

const requirements = [
    { re: /[a-z]/, label: 'A Lowercase letter (a)' },
    { re: /[A-Z]/, label: 'An Uppercase letter (A)' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'A special character letter (!@#)' },
    { re: /[0-9]/, label: 'A number (1)' },
];

const getStrength = (password: string) => {
    let multiplier = password.length > 5 ? 0 : 1;
  
    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });
  
    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}


const Profile = () => {
    const [opened, setOpened] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [popoverOpened, setPopoverOpened] = React.useState(false);
    const [errorText, showErrorText] = React.useState(false);

    const profileForm = useForm({
        initialValues: {
          password: '',
          confirmPassword: '',
        },
    
        validate: {
            confirmPassword: (value) =>
                value !== password ? <span className="text-sm">Passwords did not match</span> : null,
            },
    });

    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
    ));

    const strength = getStrength(password);

    const handleProfileSetUp = (values: any) => {
        console.log(values);
        if (strength === 100) {
            showErrorText(false);
            setOpened(!opened)
        }
        else showErrorText(true);
    }

    
    return (
        <div className="grid grid-cols-2 text-white h-fit bg-black">
            <LandingPageText />
            <div className="my-8 mr-8 bg-white pt-12 px-16 flex flex-col rounded-lg">
                <h1 className="text-blaq text-4xl font-extrabold">Set up your Profile</h1>
                <span className="text-tex pt-2">Please provide the following information</span>
                <form onSubmit={profileForm.onSubmit((values) => handleProfileSetUp(values))} className="pt-7">
                    <Popover opened={popoverOpened} position="bottom" width="target" transition="pop" styles={() => ({dropdown: {borderRadius: '10px'}})}>
                        <Popover.Target>
                        <div
                            onFocusCapture={() => {
                                setPopoverOpened(true);
                                showErrorText(false);
                            }}
                            onBlurCapture={() => setPopoverOpened(false)}
                        >
                            <PasswordInput
                                placeholder="password"
                                label="Create password"
                                withAsterisk
                                radius="md"
                                size="xl"
                                required
                                value={password}
                                onChange={e => {setPassword(e.currentTarget.value)}}
                                
                                styles={() => (passwordInputStyle)}
                            />
                        </div>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <span className="text-neutral-black font-medium text-sm">Your password should contain:</span>
                            <PasswordRequirement label="Includes at least 8 characters" meets={password.length >= 8} />
                            {checks}
                        </Popover.Dropdown>
                    </Popover>
                    <div className="mb-7" />
                    <div
                        onFocusCapture={() => showErrorText(false)} 
                        >
                        <PasswordInput
                            placeholder="password"
                            label="Confirm password"
                            withAsterisk
                            radius="md"
                            size="xl"
                            required
                            {...profileForm.getInputProps('confirmPassword')}
                            styles={() => (passwordInputStyle)}
                        />
                    </div>
                    {errorText && (<span className="text-sm text-blaq text-[#f01e2c]">Password must meet requirements</span>)}
                    <div className="mb-[25px]" onClick={() => {profileForm.setFieldValue('password', password)}}>
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