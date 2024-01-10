function StarBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: -1,
      }}
    >
      <div id="stars" className="stars m-0 p-0 absolute top-0" />
      <div id="stars2" className="stars2 m-0 p-0 absolute top-0" />
      <div id="stars3" className="stars3 m-0 p-0 absolute top-0" />
    </div>
  );
}

export default StarBackground;
