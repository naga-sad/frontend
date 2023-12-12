import * as React from "react";
import { useEffect } from "react";
import AppBarComponent from "../AppBarComponent/AppBarComponent";

export default function LoggedOutComponent() {
    useEffect(() => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }, []);

    const handleCustomAction = () => {
        // Add your custom action here
        alert("Custom action triggered!");
    };

    return (
        <main>
            <AppBarComponent />
            <h2>Logged out</h2>
            <button onClick={handleCustomAction}>Custom Action</button>
        </main>
    );
}
