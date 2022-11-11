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
