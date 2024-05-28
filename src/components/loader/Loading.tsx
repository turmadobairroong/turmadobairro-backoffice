import React from "react";

export default function Loading({ color }: any) {
  return (
    <div className={`lds-ring ${color}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
