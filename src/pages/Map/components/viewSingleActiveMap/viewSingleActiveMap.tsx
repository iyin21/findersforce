import { useNavigate } from "react-router-dom"
import { BackButton } from "../../../../components"
import Layout from "../../../../components/Layout"

const ViewSingleActiveMap = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/maps`)
    }
    return (
        <Layout>
            <BackButton handleBackButton={() => handleNavigate()} />
        </Layout>
    )
}

export default ViewSingleActiveMap
