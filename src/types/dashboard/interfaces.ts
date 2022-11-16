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
    status: "upcoming" | "ongoing" | "completed"
     profileImage:string | undefined,
     firstName: string | undefined,
     lastName: string | undefined,
     calenderIcon: string | undefined,
     date: string | undefined,
     clockIcon: string | undefined,
     startTime: string | undefined ,
     endTime: string | undefined ,
     duration:number| string| undefined,
     locationIcon: string | undefined,
     location: string | undefined,
     taskIcon: string | undefined,
     task: string | undefined,
     initialDate?: Date,
     currentDate?: Date,
     messageIcon:string | undefined;
}

export type CardProps = {
     title:string,
     amount:number | undefined,
     icon: string,
     style: string,
     subtitle: number | undefined
}

export interface DashboardResponse {
     status: string
     message: string
     data: DashboardData
 }
 export interface DashboardData {
     amountPaid: amountPaid,
     hoursCompleted: hoursCompleted,
     operativesHired: operativesHired,
     shiftsCompleted: shiftsCompleted,
     shiftsCancelled: shiftsCancelled,
     genderDistribution: genderDistribution,
     rating: rating,
 }

 export interface rating {
    averageScore: number | undefined,
    helpfulnessScore: number | undefined,
    organizationScore: number | undefined,
    professionalismScore: number | undefined,
    totalShiftsRated: number | undefined,
}
 export interface amountPaid {
     total: number,
     thisMonth: number,
 }
 export interface hoursCompleted {
     total: number,
     thisMonth: number,
 }
 export interface operativesHired {
     total: number,
     thisMonth: number,
 }
 export interface shiftsCompleted {
     total: number,
     thisMonth: number,
 }
 export interface shiftsCancelled {
     total: number,
     thisMonth: number,
 }
 export interface genderDistribution {
     percentageMale: number,
     percentageFemale: number,
     percentageRatherNotSay: number
 }
