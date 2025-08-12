export const CustomToolTip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "#262626",
          color: "#fff",
          padding: "8px 12px",
        //   borderRadius: "8px",
          fontSize: "14px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        <p style={{ fontWeight: "bold", marginBottom: "4px" }}>{label}</p>
        <p style={{ color: "#22c55e" }}>Budget : {payload[0].value}</p>
        <p style={{ color: "#ef4444" }}>Spending : {payload[1].value}</p>
      </div>
    );
  }
  return null;
};
