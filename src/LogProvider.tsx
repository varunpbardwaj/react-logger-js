import React, { useState } from "react";
import RenderDebuggerPanel from "./components/RenderDebugPanel";
import LogProviderProps from "./log-provider.props";
import LOGO from "./configs/logo";

const LogProvider = ({ devURL, x, y }: LogProviderProps) => {
  const [bottom, setBottom] = useState(false);

  return (
    devURL.includes(window.location.host) && (
      <>
        {RenderDebuggerPanel(bottom)}
        <div
          onClick={() => setBottom(!bottom)}
          style={{
            position: "fixed",
            bottom: y === 1 ? 20 : "calc(100% - 60px)",
            right: x === 0 ? "calc(100% - 60px)" : 20,
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          <img src={LOGO} alt="logo" width="40" />
        </div>
      </>
    )
  );
};

export default LogProvider;
