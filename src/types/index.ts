import type { ComponentType } from "react";

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

export interface ILocation {
    address?: string;
    lat: number;
    lng: number;
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
    name: string,
    phone: number,
    role: string
}
export interface IRide {
    _id: string,
    rider: driverAndRider,
    driver: driverAndRider,
    pickupLocation: ILocation,
    destinationLocation: ILocation,
    status: RideStatus,
    statusHistory: IStatusHistory,
    createdAt: string
}

export interface ISidebarItem {
    title: string;
    items: {
      title: string;
      url: string;
      component: ComponentType;
    }[];
  }