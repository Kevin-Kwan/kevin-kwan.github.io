const StarBackground = () => {
  return (
    <div
      style={{
        overflow: "hidden",
        position: "absolute",
        height: "100vh",
        width: "100%",
        zIndex: -1,
      }}
    >
      <div id="stars" className="stars m-0 p-0 absolute top-0"></div>
      <div id="stars2" className="stars2 m-0 p-0 absolute top-0"></div>
      <div id="stars3" className="stars3 m-0 p-0 absolute top-0"></div>
    </div>
  );
};

export default StarBackground;
