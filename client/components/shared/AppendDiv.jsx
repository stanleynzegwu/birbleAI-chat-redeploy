const AppendDiv = (isAi, uniqueId, value) => {
  return (
    <div className={`wrapper ${isAi && "ai"}`}>
      <div className="chat">
        <div className="profile">
          <img className="imgg" src={isAi ? bot : user} alt={isAi ? "bot" : "user"} />
        </div>
        <div className="message" id={uniqueId}>
          {value}
        </div>
      </div>
    </div>
  );
};

export default AppendDiv;
