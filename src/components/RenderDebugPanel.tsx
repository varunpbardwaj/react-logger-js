import React, { useEffect, useState } from "react";
import RenderLogs from "./RenderLogs";
import { logSubject, logObservable } from "../configs/subject";

const RenderDebuggerPanel = (bottom: boolean) => {
  const [filter, setFilter] = useState({ flagr: "", index: null, log: [] });
  const [logger, setLogger] = useState(logSubject.getValue());
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    logObservable.subscribe((logs: unknown[]) => {
      if (filter.flagr === "") {
        setLogger(logs);
      } else {
        const getLogs = logs.filter((item: { logger_flagr: string }) =>
          item.logger_flagr.toLowerCase().includes(filter.flagr.toLowerCase())
        );
        setLogger(getLogs);
      }
    });
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "75%",
        bottom: !bottom ? "-100%" : 0,
        left: 0,
        backgroundColor: "#081328",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
        transition: "bottom 0.3s",
        display: "flex",
        overflowX: "auto",
        zIndex: 9998,
        overflowY: "hidden",
      }}
    >
      <div
        style={{
          width: "40%",
          minWidth: "500px",
          height: "100%",
          borderRight: "2px solid #242D38",
          borderTopLeftRadius: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: "30px",
            padding: "0px 20px",
            minHeight: "60px",
            maxHeight: "40px",
            backgroundColor: "#142336",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            React Logger
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "10px 20px",
                backgroundColor: "#FC0E63",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "16px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => {
                logSubject.next([]);
              }}
            >
              reset
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 20px",
            minHeight: "60px",
            maxHeight: "40px",
            backgroundColor: "#182a3f",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Logs({logger ? logger.length : 0})
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              style={{
                height: "100%",
                backgroundColor: "#FFFFFF00",
                color: "#FFFFFF",
                border: "none",
                textAlign: "right",
                fontSize: "18px",
                marginRight: "30px",
                outline: "none",
              }}
              placeholder="filter logs..."
              onKeyPress={(event) => {
                if (
                  event.key === "Enter" &&
                  (event.target as HTMLInputElement).value.trim() !== ""
                ) {
                  setFilter({
                    ...filter,
                    flagr: (event.target as HTMLInputElement).value,
                    index: null,
                    log: [],
                  });
                  const logs = logSubject
                    .getValue()
                    .filter((item: { logger_flagr: string }) =>
                      item.logger_flagr
                        .toLowerCase()
                        .includes(
                          (event.target as HTMLInputElement).value.toLowerCase()
                        )
                    );
                  setLogger(logs);
                }
              }}
              onChange={(event) => {
                setInputText(event.target.value);
              }}
              value={inputText}
            />
            <div
              style={{
                padding: "10px 20px",
                backgroundColor: "#F3B106",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={() => {
                setFilter({ ...filter, flagr: "", index: null, log: [] });
                setLogger(logSubject.getValue());
                setInputText("");
              }}
            >
              clear
            </div>
          </div>
        </div>
        <div style={{ height: "calc(100% - 120px)", overflowY: "auto" }}>
          {logger.length > 0 &&
            logger.map((item: { logger_flagr: string }, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #242D38",
                  width: "100%",
                  height: "60px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setFilter({
                    flagr: item.logger_flagr,
                    index: index,
                    log: [{ ...item }],
                  });
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ffd56d",
                    minWidth: "60px",
                    maxWidth: "60px",
                    maxHeight: "100%",
                    padding: "21px 0px",
                    color: "#071428",
                    transition: "backgroundColor 0.3s",
                  }}
                >
                  {index}
                </div>
                <div style={{ marginLeft: "20px" }}>{item.logger_flagr}</div>
              </div>
            ))}
        </div>
      </div>
      <div
        style={{
          width: "60%",
          minWidth: "500px",
          maxHeight: "100%",
          borderRight: "2px solid #242D38",
          borderTopRightRadius: "30px",
          overflowY: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#142336",
            padding: "0px 20px",
            minHeight: "60px",
            maxHeight: "40px",
            borderTopRightRadius: "30px",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "20px",
            }}
          >
            Data Explorer
          </span>
        </div>
        <div
          style={{
            maxHeight: "calc(100% - 60px)",
            textAlign: "left",
            marginBottom: "100px",
            overflowY: "auto",
          }}
        >
          {filter.index !== null ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px",
              }}
            >
              <div style={{ color: "#657f9b" }}>
                <span
                  onClick={() => {
                    if (document.getElementById("parent").innerText === "▲") {
                      document.getElementById("parent").innerText = "▼";
                      document.getElementById("child").style.display = "block";
                    } else {
                      document.getElementById("parent").innerText = "▲";
                      document.getElementById("child").style.display = "none";
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <span id="parent">▲</span>{" "}
                  <span style={{ color: "#FB0F63" }}>
                    {filter.flagr} ({filter.index})
                  </span>
                </span>
              </div>
              <div
                id="child"
                style={{
                  display: "none",
                  color: "white",
                  marginLeft: "20px"
                }}
              >
                {RenderLogs(filter.log, false)}
              </div>
            </div>
          ) : (
            <p
              style={{
                margin: "20px",
                color: "#757575",
                fontSize: "18px",
              }}
            >
              Click on logs to explore
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderDebuggerPanel;
