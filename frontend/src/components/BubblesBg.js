import React from "react";

export default function BubblesBg({
  color = "rgba(255,255,255,0.15)",
  minSize = 30,
  maxSize = 200,
  count = 35
}) {
  return (
    <div style={styles.container}>
      {[...Array(count)].map((_, i) => {
        const size = minSize + Math.random() * (maxSize - minSize);

        return (
          <span
            key={i}
            style={{
              ...styles.bubble,
              left: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    overflow: "hidden",
    zIndex: 0
  },
  bubble: {
    position: "absolute",
    bottom: "-100px",
    borderRadius: "50%",
    animation: "floatUp linear infinite"
  }
};