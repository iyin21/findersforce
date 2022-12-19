import EmptyApplicationImage from "../../../assets/empty.svg"


export interface EmptyStateInterface {
    description: string
}

const EmptyState = ({ description }: EmptyStateInterface) => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-32">
                <img src={EmptyApplicationImage} alt="empty application" />
                <h1 className="text-black-100 text-3xl font-creatoMedium mt-5 font-bold">
                    Nothing to see here
                </h1>
                <p className="text-black-70 text-3md font-creato mt-3">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default EmptyState
