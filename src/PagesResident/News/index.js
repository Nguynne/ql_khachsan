import React, { useEffect } from "react";
import { Space, Spin } from "antd";
import { NavLink } from "react-router-dom";
import "./style.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectLoading, selectData } from "./stores/selectors";
import { asyncGetNewResidentAction, setLoading } from "./stores/actions";

const NewResident = (props) => {
  const { dataUser, isLoading } = props;
  const { getAllUserRequest, isLoadingDispatch } = props;

  useEffect(() => {
    const loadData = async () => {
      const payload = {
        search: "",
        paging: {
          pageIndex: 1,
          pageSize: 10,
        },
        sorting: {
          field: "createdAt",
          order: "desc",
        },
      };
      isLoadingDispatch(true);
      const a = await getAllUserRequest(payload);
      console.log(a);
      isLoadingDispatch(false);
    };
    loadData();
  }, []);
  return (
    <Spin spinning={isLoading}>
      <div className="student1 color3 p-3">
        {dataUser.map((item) => (
          <div
            key={item.id}
            className="m-3 p-3"
            style={{ background: "white" }}
          >
            <p className="color1"> {item.title}</p>
            <Space>
              <NavLink to={`${item.id}`} className="fontp">
                <p className="fontp">Xem Chi Tiết</p>
              </NavLink>
            </Space>
          </div>
        ))}
      </div>
    </Spin>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  dataUser: selectData,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUserRequest: (payload) => asyncGetNewResidentAction(dispatch)(payload),

  isLoadingDispatch: (payload) => dispatch(setLoading(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NewResident);
