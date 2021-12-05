import React, { useState, useEffect } from "react";
import style from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={style.bg}>
      <div className={style.loading}></div>
      {/* <h1>L O A D I N G</h1> */}
    </div>
  );
}