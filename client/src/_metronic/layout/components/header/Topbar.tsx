/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react";
import { ThemeModeSwitcher } from "../../../partials";
import moment from "moment/moment";

const Topbar: FC = () => {
  const [date, setDate] = useState(new Date());

  //Replaces componentDidMount and componentWillUnmount
  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });
  function tick() {
    setDate(new Date());
  }

  return (
    <div className="d-flex flex-shrink-0">
      <div className="d-flex align-items-center  ms-3">
        <div className="d-flex flex-column">
          <b className="text-muted">{moment(date).format("DD/MM/YYYY hh:mm:ss")}</b>
        </div>
        <ThemeModeSwitcher toggleBtnClass="flex-center bg-body btn-color-gray-600 btn-active-color-primary h-40px" />
      </div>

      <div className="d-flex align-items-center ms-3">
      </div>
    </div>
  );
};
export { Topbar };
