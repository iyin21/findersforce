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

export type ShiftCardProps = {
     profileImage:string,
     profileName: string,
     calenderIcon: string,
     date: string,
     clockIcon: string,
     time: string,
     locationIcon: string,
     location: string,
     taskIcon: string,
     task: string,
     hour: string,
     minute: string,
     second: string,
     messageIcon:string;
}

export type CardProps = {
     title:string,
     amount:string,
     icon: string,
     style: string,
}