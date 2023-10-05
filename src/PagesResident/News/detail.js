import React, { useEffect } from "react";
import "./style.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectDetail } from "./stores/selectors";
import { getDetailNewsResidentAction } from "./stores/actions";
import { useParams } from "react-router-dom";
const DetailNews = (props) => {
  let { id } = useParams();
  const { dataDetail } = props;
  const { getDetailNewsDispatch } = props;
  useEffect(() => {
    getDetailNewsDispatch(id);
  }, []);

  return (
    <>
      <div className="student color3">
        <div
          key={dataDetail.id}
          className="m-3 p-3"
          style={{ background: "white" }}
        >
          <div>
            <img
              style={{ display: "block", width: 600, height: 380 }}
              src={`data:image/jpg;base64,${dataDetail.imageUrl}`}
              alt="img"
            />
          </div>
          <p className="color2"> {dataDetail.title}</p>

          <p className="color1">{dataDetail.description}</p>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  dataDetail: selectDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailNewsDispatch: (payload) =>
    dispatch(getDetailNewsResidentAction(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DetailNews);
