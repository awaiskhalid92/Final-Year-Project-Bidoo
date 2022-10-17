import React from "react";
import SellerNavigation from "../../components/nav/SellerNavigation";
export const SellerDashboard = () => {
  return (
    <>
      <div>
        <>
          <div className="contianer-fluid">
            <div className="row">
              <div className="col-md-2">
                <SellerNavigation />
              </div>
              <div className="col">Seller Dashboard</div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};
