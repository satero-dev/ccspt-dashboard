import React from "react";
import { getApp } from "firebase/app";

type Props = {
    children?: React.ReactNode;
};


export const LoginForm = ({ children }: Props) => {

    return <h1>{JSON.stringify(getApp())}</h1>
};