export interface IDepotRating {
     status: string;
     message: string;
     data: IDepotRatingData;           
}

export interface IDepotRatingData {
                avgProfessionalismScore: number;
                avgOrganizationScore: number;
                avgHelpfulnessScore: number;
                avgAverageScore: number;
}
