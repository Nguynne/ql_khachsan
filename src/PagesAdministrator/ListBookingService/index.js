import './index.css';
import { Input, Row, Col, Button, Table, Tag, Spin, DatePicker, Drawer } from 'antd';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { asyncGetAllListBookingServicesAction } from './stores/action';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { selectListBookingServices } from './stores/selector';
import { Space } from 'antd';
import { withTranslation } from "react-i18next";
import { CSVLink } from "react-csv";
//object destructuring. '={}' to allow function to be call without params requestPayload()
function requestPayload({ pageIndex = 1, pageSize = 10, search = "", sortField = "chooseDate", sortOrder = "desc" } = {}) {
  const payload = {
    search: search,
    startAt: null,
    endAt: null,
    paging: {
      pageIndex: pageIndex,
      pageSize: pageSize
    },
    sorting: {
      field: sortField,
      order: sortOrder,
    },
  }
  return payload
}

function ListBookingServicesPageComponent(props) {
  const { getAllListBookingServicesDispatch } = props;
  const { listListBookingServices } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const { t } = props;
  const [request, setRequest] = useState(
    {
      search: "",
      paging: {
        pageIndex: 1,
        pageSize: 10,
      },
      sorting: {
        field: "chooseDate",
        order: "desc",
      },
    }
  )
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await getAllListBookingServicesDispatch(request);
      setIsLoading(false);
    }
    loadData();
  }, [request])

  const tablePagination = () => {
    const pageIndex = listListBookingServices.paging?.pageIndex;
    const pageSize = listListBookingServices.paging?.pageSize;
    const total = listListBookingServices.paging?.total;
    const defaultPageSize = 10;
    const current = listListBookingServices.paging?.pageIndex;

    return { defaultPageSize, pageIndex, pageSize, total, current }
  }
  const onChangeTable = async (paging, filters, sorter, extra) => {
    if (paging) {
      setRequest(requestPayload({
        pageIndex: paging?.current,
        sortOrder: sorter.order === "ascend" ? "asc" : "desc",
        sortField: sorter.column?.dataIndex
      }))
    } else {
      setRequest(requestPayload({
        sortOrder: sorter.order === "ascend" ? "asc" : "desc",
        sortField: sorter.column?.dataIndex
      }))
    }
  }
  //Search box
  const { Search } = Input;
  const onSearch = async (value) => {
    setRequest(requestPayload({ search: value }));
  };

  const showBookingDetail = (data) => {
    setOpenDrawer(true);
    setBookingData(data);
  };
  //Table section
  const columns = [
    {
      title: 'ID',
      key: "displayId",
      render: (_, record, index) => {
        return (request.paging.pageIndex - 1) * request.paging.pageSize + 1 + index
      }
    },
    {
      title: t('ServiceName'),
      dataIndex: 'serviceName',
      key: 'name',
      render: (text, record) => <Button type='link' onClick={() => showBookingDetail(record)}>{text}</Button>,
      sorter: true,
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      render: (text) => { return text === 'APPROVED' ? <Tag color="green"> {text} </Tag> : <Tag color="volcano"> {text} </Tag> },
      sorter: true,
    },
    {
      title: t('CreatedBy'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      sorter: true,
    },
    {
      title: t('BookingDate'),
      dataIndex: 'chooseDate',
      key: 'chooseDate',
      sorter: true,
    },
    {
      title: t('BookingTime'),
      dataIndex: 'bookingTime',
      key: 'bookingTime',
      sorter: true,
    },
  ];

  //CSV Download section
  const csvHeader = [
    { label: "ID", key: "id" },
    { label: "Service name", key: "serviceName" },
    { label: "Status", key: "status" },
    { label: "Booking time", key: "bookingTime" },
    { label: "Booking date", key: "chooseDate" },
    { label: "Created at", key: "createdAt" },
  ];
  const csvDownload = () => {
    return listListBookingServices.data?.map((item, index) => {
      return {
        id: (request.paging.pageIndex - 1) * request.paging.pageSize + 1 + index,
        serviceName: item.serviceName,
        status: item.status,
        bookingTime: item.bookingTime,
        bookingDate: item.chooseDate,
        createdAt: item.createdAt,
      }
    })
  };
  return (
    <Spin className='news-container' spinning={isLoading}>
      <p className='news-breadcrumb'>{t("Home")} / {t("ServicesTitle")} / <span className='current-breadcrumb'>{t("BookingServices")}</span></p>
      <h1 className='news-title'>{t("BookingServicesTitle")}</h1>
      <Row>
        <Col span={8}>
          <Search placeholder={t("BookingPlaceholder")} onSearch={onSearch} enterButton />
        </Col>
        <Col span={8} style={{ textAlign: 'center' }}>
          <CSVLink
            filename={"ListBooking.csv"}
            data={csvDownload() || []}
            className="download-btn"
            headers={csvHeader}
          >
            Download List Booking
          </CSVLink>
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <Space style={{ fontSize: '17px' }}>Filter: <DatePicker.RangePicker picker="week" /></Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={listListBookingServices.data}
        pagination={tablePagination()}
        onChange={onChangeTable}
        className='news-table'
        rowKey="id"
      />
      <Drawer
        title="Booking Detail"
        placement='right'
        onClose={() => setOpenDrawer(false)}
        closable={false}
        visible={openDrawer}
        key='booking-detail'
        width={450}
        style={{ fontSize: '16px' }}
      >
        <p><strong>{t('ServiceName')}: </strong> {bookingData.serviceName}</p>
        <p><strong>{t("BookingDate")}: </strong> {bookingData.chooseDate}</p>
        <p><strong>{t("BookingTime")}: </strong> {bookingData.bookingTime}</p>
        <p><strong>{t('Status')}: </strong> {bookingData.status}</p>
        <p><strong>{t('CreatedBy')}: </strong> {bookingData.createdBy}</p>
        <p><strong>{t('CreatedAt')}: </strong> {bookingData.createdAt}</p>
      </Drawer>
    </Spin>
  )
}

const mapStateToProps = createStructuredSelector({
  listListBookingServices: selectListBookingServices,
});

const mapDispatchToProps = (dispatch) => ({
  getAllListBookingServicesDispatch: (payload) => asyncGetAllListBookingServicesAction(dispatch)(payload),
});

//const withConnect = connect(mapStateToProps, mapDispatchToProps);
const ListBookingServicesPage = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ListBookingServicesPageComponent)
);
export default ListBookingServicesPage;
