import axios from "axios";

export default axios.create({
    baseURL: "https://findersforce-api.workcube.com.ng/api/v1/auth"
});

export const axiosPrivate = axios.create({
    baseURL: "https://findersforce-api.workcube.com.ng/api/v1/auth",
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const emailInputStyle = {
    innerInput: {
        color: "rgba(15, 13, 0, 0.8)",
        fontSize: "16px",
        paddingTop: "7px",
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
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center'
    },
    label: {
        color: '#0F0D00',
        fontSize: '16px',
        fontWeight: '800'
    }
}

export const passwordInputStyle = {
    ...emailInputStyle,
    innerInput: {
        color: "rgba(15, 13, 0, 0.8)",
        fontSize: "16px",
        paddingTop: "7px",
        '&::placeholder': {
            color: "#E7E7E5",
            fontSize: '16px',
            lineHeight: '19px'
        }
    },
}