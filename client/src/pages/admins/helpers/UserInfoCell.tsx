/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import { FC } from "react";
import { toAbsoluteUrl } from "metronic/helpers";

type Props = {
  user: any;
};

const UserInfoCell: FC<Props> = ({ user }) => (
  <div className="d-flex align-items-center">
    {/* begin:: Avatar */}
    <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
      <a href="#">
        {user.avatar
          ? (
            <div className="symbol-label">
              <img
                src={toAbsoluteUrl(`/media/${user.avatar}`)}
                alt={user.name}
                className="w-100"
              />
            </div>
          )
          : (
            <div
              className={clsx(
                "symbol-label fs-3",
                `bg-light-primary`,
                `text-primary`,
              )}
            >
              {user.name?.[0]}
            </div>
          )}
      </a>
    </div>
   
  </div>
);

export { UserInfoCell };
