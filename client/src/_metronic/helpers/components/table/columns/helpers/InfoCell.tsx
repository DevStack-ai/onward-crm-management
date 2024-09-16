/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { toAbsoluteUrl } from "metronic/helpers";

type Props = {
  user: {
    name: string,
    avatar: string
  };
};

const InfoCell: FC<Props> = ({ user }) => (
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
              className={[
                "symbol-label fs-3",
                `bg-light-danger`,
                `text-danger`,
              ].join('')}
            >
              {user.name?.[0]}
            </div>
          )}
      </a>
    </div>
    <div className="d-flex flex-column">
      <a href="#" className="text-gray-800 text-hover-primary mb-1">
        {user.name}
      </a>
    </div>
  </div>
);

export { InfoCell };
