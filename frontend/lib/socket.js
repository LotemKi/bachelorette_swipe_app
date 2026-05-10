import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const createSocket = () => {
    if (typeof window === "undefined") return null;

    return new HubConnectionBuilder()
        .withUrl(`${process.env.NEXT_PUBLIC_API}/gamehub`)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Warning)
        .build();
};