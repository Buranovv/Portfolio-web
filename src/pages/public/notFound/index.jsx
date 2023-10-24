import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { authName } from "../../../redux/slices/auth";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const { isAuth, user } = useSelector((state) => state[authName]);

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() =>
              navigate(
                isAuth
                  ? user?.role !== "admin"
                    ? "/"
                    : "/dashboard"
                  : "/loginRegister"
              )
            }
          >
            Back{" "}
            {isAuth ? (user?.role !== "admin" ? "Main" : "Dashboard") : "Login"}
          </Button>
        }
      />
    </div>
  );
};

NotFoundPage.propTypes = {
  isLogin: PropTypes.bool,
};

export default NotFoundPage;
