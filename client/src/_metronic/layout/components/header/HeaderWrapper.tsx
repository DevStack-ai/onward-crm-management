/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { useLayout } from "../../core";
import { DefaultTitle } from "./page-title/DefaultTitle";
import { Topbar } from "./Topbar";

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout();
  const { header } = config;
  const [offset, setOffset] = useState<string>(
    `{default: '200px', lg: '300px'}`,
  );
  useEffect(() => {
    let newString = `{default: '200px', lg: '300px'}`;
    if (header.fixed.desktop) {
      if (!header.fixed.tabletAndMobile) {
        newString = `{lg: '300px'}`;
      }
    } else {
      newString = `{default: '200px', lg: false}`;
    }

    setOffset(newString);
  }, [header.fixed]);

  return (
    <div
      id="kt_header"
      className={clsx("app-header", classes.header.join(" "))}

    >
      <div
        className={clsx(
          classes.headerContainer.join(" "),
          "d-flex align-items-center justify-content-between",
        )}
        id="kt_header_container"
      >
        <DefaultTitle />
        <div className={"d-flex d-lg-none align-items-center ms-n2 me-2"}>
          <div
            className="btn btn-icon btn-active-icon-primary aside-toggle"
            id="kt_app_sidebar_mobile_toggle"
          >
            <KTIcon iconName="abstract-14" className="fs-2" />
          </div>

          <Link to="/dashboard" className="d-flex align-items-center">
            <div>
              <img
                src={toAbsoluteUrl("/media/logos/default-small.png")}
                alt="logo"
                className="h-35px light-logo"
              />
              <img
                src={toAbsoluteUrl("/media/logos/default-small-dark.png")}
                alt="logo"
                className="h-35px dark-logo"
              />
            </div>
          </Link>
        </div>
        <Topbar />
      </div>
    </div>
  );
}
