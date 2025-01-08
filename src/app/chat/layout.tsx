import { ReactNode } from "react";
import SocketProvider from "./SoketProvider";


export default function ChatLayout({ children }: { children: ReactNode }) {
    return (
        <SocketProvider>
            <div>
                <main>{children}</main>
            </div>
        </SocketProvider>
    );
}
