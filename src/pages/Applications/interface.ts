export interface ApplicationResponse{
    status: true,
  count: 3,
  pagination: {
    next: Pagination,
    prev: Pagination
  },
  data: Data[]
}
export interface ApplicationDetailsResponse {
    status: string;
    message: string;
    data: JobListing;
}

export interface Data {
    _id: string;
    status: string;
    jobListing: JobListing;
    user: User;
    experience: number;
    createdAt: string;
    updatedAt: Date;
}

export interface JobListing {
    _id: string;
    companyName: string;
    jobType: Job;
    depot: User;
    jobDate: Date;
    shiftStartTime: string;
    shiftDurationInHours: number;
    jobMeetingPoint: string;
    jobAccessibleTo: string;
    operativeIds: string[];
    numberOfOpsRequired: number;
    jobQualification: Job;
    jobRate: JobRate;
    jobDescription: string;
    jobLocation: JobLocation;
    additionalInfoImageUrls: any[];
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    jobMatchPercentage: number;
    hasApplied: boolean;
    hasFavorited: boolean;
}

export interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface JobLocation {
    _id: string;
    type: string;
    coordinates: number[];
    formattedAddress: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
}

export interface Job {
    _id: string;
    name: string;
    jobQualificationCategoryId?: Job;
    createdAt: Date;
    updatedAt: Date;
    description?: string;
    jobTypeCategoryId?: string;
}

export interface JobRate {
    _id: string;
    currency: string;
    jobQualification: string;
    jobRatePerHourDisplayedToDepot: number;
    jobRatePerHourDisplayedToOp: number;
    depot: string;
}

export interface Pagination {
    next: Next;
    prev: Next;
}

export interface Next {}
