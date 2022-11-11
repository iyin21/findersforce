import { Pagination } from '../Applications/interface';

export interface ComplaintResponse {
    status: boolean;
    count: 3;
    pagination: Pagination;
    data: Data[];
}

export interface Data {
    _id: string;
    user: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    complaintId: string;
    description: string;
    status: string;
    complaintCategory: string;
    complaintIssues: string[];
    image: string;
    messageCount: number;
    messages: Messages[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface Messages {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    complaint: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    __v: 0;
}
export interface SingleComplaintResponse {
    status: string;
    message: string;
    data: Data;
}
export interface UpdateComplaintResponse {
    status: string;
    message: string;
    data: MessageResponse;
}
export interface MessageResponse {
    user: string;
    complaint: string;
    message: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
