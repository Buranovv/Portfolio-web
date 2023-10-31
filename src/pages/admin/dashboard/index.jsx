import { Fragment, useEffect } from "react";
import {
  UserOutlined,
  BankOutlined,
  BulbOutlined,
  FolderOpenOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";

import "./style.scss";
import { useGetEducationsQuery } from "../../../redux/queries/education";
import { useGetExperiencesQuery } from "../../../redux/queries/experience";
import { useGetUsersQuery } from "../../../redux/queries/user";
import { getPortfolios, portfolioName } from "../../../redux/slices/portfolio";
import { useDispatch, useSelector } from "react-redux";
import { getSkills, skillName } from "../../../redux/slices/skills";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { data: { total: education } = { educations: [], total: 0 } } =
    useGetEducationsQuery();
  const { data: { total: experience } = { educations: [], total: 0 } } =
    useGetExperiencesQuery();
  const { portfolios } = useSelector((state) => state[portfolioName]);
  const { skills } = useSelector((state) => state[skillName]);
  const { data: { total: user } = { educations: [], total: 0 } } =
    useGetUsersQuery();

  useEffect(() => {
    dispatch(getSkills({}));
    dispatch(getPortfolios({}));
  }, [dispatch]);
  return (
    <Fragment>
      <div className="cards">
        <div className="card">
          <div className="img-box">
            <BankOutlined />
          </div>
          <div className="card-body">
            <h3>Education</h3>
            <p>Total: {education}</p>
          </div>
        </div>
        <div className="card">
          <div className="img-box">
            <FileProtectOutlined />
          </div>
          <div className="card-body">
            <h3>Experiences</h3>
            <p>Total: {experience}</p>
          </div>
        </div>
        <div className="card">
          <div className="img-box">
            <FolderOpenOutlined />
          </div>
          <div className="card-body">
            <h3>Portfolio</h3>
            <p>Total: {portfolios.length}</p>
          </div>
        </div>
        <div className="card">
          <div className="img-box">
            <BulbOutlined />
          </div>
          <div className="card-body">
            <h3>Skills</h3>
            <p>Total: {skills.length}</p>
          </div>
        </div>
        <div className="card">
          <div className="img-box">
            <UserOutlined />
          </div>
          <div className="card-body">
            <h3>Users</h3>
            <p>Total: {user}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardPage;
