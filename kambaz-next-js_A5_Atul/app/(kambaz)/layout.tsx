"use client";
import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import KambazNavigation from "./navigation";
import "./styles.css";
import { Provider } from "react-redux";
// IMPORTANT: import the SAME store instance used across the app
import store from "./store"; // adjust path if your store lives elsewhere

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <div id="wd-kambaz">
        <div className="d-flex">
          <div>
            <KambazNavigation />
          </div>
          <div className="wd-main-content-offset p-3 flex-fill">{children}</div>
        </div>
      </div>
    </Provider>
  );
}
