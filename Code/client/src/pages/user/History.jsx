import React from "react";
import UserNavigation from "../../components/nav/UserNavigation";

const History = () => {
  return (
    <>
      <div className="contianer-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNavigation />
          </div>
          <div className="col">User page History</div>
        </div>
      </div>
    </>
  );
};

export default History;
