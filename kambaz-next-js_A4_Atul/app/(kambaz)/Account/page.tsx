"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AccountPage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (!currentUser) {
    redirect("/Account/Signin");
  } else {
    redirect("/Account/Profile");
  }
}
