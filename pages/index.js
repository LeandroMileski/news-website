function Home() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f8ff",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  };

  const textStyle = {
    color: "#333",
    fontSize: "2rem",
    lineHeight: "1.5",
    animation: "fadeIn 2s ease-in, bounce 1.5s infinite",
  };

  return (
    <div style={containerStyle}>
      <h1 style={textStyle}>
        Frota team rumo a <br />
        Bariloche!🏂🍻😎
      </h1>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
