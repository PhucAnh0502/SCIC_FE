import * as SignalR from "@microsoft/signalr";
import env from "./env";

let connection = null;

export const startSignalRConnection = async (onReceiveCallback) => {
  if (!connection) {
    connection = new SignalR.HubConnectionBuilder()
      .withUrl(env.WEB_SOCKET_URL)
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveMessage", onReceiveCallback);

    try {
      await connection.start();
      console.log("SignalR connection started successfully.");
    } catch (error) {
      console.error("Error starting SignalR connection:", error);
    }
  }
};

export const stopSignalRConnection = async () => {
  if (connection) {
    await connection.stop();
    console.log("SignalR connection stopped successfully.");
    connection = null;
  }
};
