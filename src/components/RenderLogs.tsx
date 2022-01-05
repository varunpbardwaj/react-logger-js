import React from "react";
import idGenerator from "../configs/idGenerator";

export default function RenderLogs(data: {}, isChild: boolean) {
  const arr = Object.keys(data).map((key) => {
    if (data[key] && typeof data[key] === "object") {
      const id = idGenerator(10);
      return (
        <div
          key={key}
          style={{
            margin: isChild ? "10px 0px" : "10px 0px 0px 0px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ color: "#657f9b" }}>
            <span
              onClick={() => {
                if (document.getElementById(`parent-${id}`).innerText === "▲") {
                  document.getElementById(`parent-${id}`).innerText = "▼";
                  document.getElementById(`child-${id}`).style.display =
                    "block";
                } else {
                  document.getElementById(`parent-${id}`).innerText = "▲";
                  document.getElementById(`child-${id}`).style.display = "none";
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <span id={`parent-${id}`}>▲</span>{" "}
              <span style={{ color: "#FB0F63" }}>{key}</span>
            </span>
          </div>
          <div
            id={`child-${id}`}
            style={{
              display: "none",
              margin: "0px 0px 0px 20px",
              color: "white",
            }}
          >
            {RenderLogs(data[key], true)}
          </div>
        </div>
      );
    } else {
      return (
        <div key={key} style={{ marginTop: "10px" }}>
          {key !== "logger_flagr" && (
            <div style={{ display: "flex" }}>
              <div style={{ color: "#ffb5cc" }}>{key}: </div>
              <div
                title={data[key] ? data[key].toString() : "null"}
                style={{
                  color: "#ffeab5",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginLeft: "8px",
                  cursor: "pointer",
                }}
              >
                {data[key] ? data[key].toString() : "null"}
              </div>
            </div>
          )}
        </div>
      );
    }
  });
  return arr;
}
