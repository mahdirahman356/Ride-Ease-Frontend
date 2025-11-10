import type { ComponentType, SVGProps } from "react";

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER"

export interface IVehicleInfo {
    model: string;
    plateNumber: string;
}

export interface IAuthProvider {
    provider: "google" | "credentials",
    providerId: string
}


export interface IUser {
    _id?: string,
    name: string,
    email: string,
    password: string,
    role: TRole,
    phone?: string,
    picture?: string,
    address?: string,
    cancelAttempts: number,
    lastCancelAt: Date,
    isApproved: boolean,
    isOnline: boolean,
    isDeleted?: boolean,
    isActive?: string,
    isVerified?: boolean,
    vehicleInfo?: IVehicleInfo | null;
    auths: IAuthProvider[]
}


export type RideStatus = "REQUESTED" | "ACCEPTED" | "REJECTED" | "PICKED_UP" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";

export interface IStatusHistory {
    requestedAt: Date;
    acceptedAt?: Date;
    pickedUpAt?: Date;
    inTransitAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
    rejectedAt?: Date;

}
export interface driverAndRider {
    address: string;
    name: string,
    phone: number,
    role: string
}

export interface ILocation {
    address: string,
    latitude: number,
    longitude: number
}

export interface GeoapifyPlace {
  properties: {
    formatted: string;
    lat: number;
    lon: number;
  };
}


export interface IRide {
    _id: string,
    rider: driverAndRider,
    driver: driverAndRider,
    pickupLocation: ILocation,
    destinationLocation: ILocation,
    fareEstimation: number,
    paymentMethod: string,
    status: RideStatus,
    statusHistory: IStatusHistory,
    createdAt: string
}

export interface ISidebarItem {
    title: string;
    items: {
        title: string;
        icon?: ComponentType<SVGProps<SVGSVGElement>>;
        url: string;
        component: ComponentType;
    }[];
}

export interface StatusHistory {
    requestedAt?: string;
    acceptedAt?: string;
    pickedUpAt?: string;
    inTransitAt?: string;
    completedAt?: string;
};

export interface ITimeline {
    id: number,
    date: string,
    title: string,
    description?: string
}

export interface IDriverActivity {
    _id: string
    address: string;
    driverId: string,
    email: string,
    isActive: string
    name: string
    totalRevenue: number
    totalRides: number
}