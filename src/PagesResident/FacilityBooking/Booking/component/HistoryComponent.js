
import { Input, Row, Col, Button, Table, Tag, Spin } from 'antd';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { asyncGetAllListBookingServicesAction } from '../../../../PagesAdministrator/ListBookingService/stores/action';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { selectListBookingServices } from '../../../../PagesAdministrator/ListBookingService/stores/selector';
import { withTranslation } from "react-i18next";

//object destructuring. '={}' to allow function to be call without params requestPayload()
function requestPayload({ pageIndex = 1, pageSize = 10, search = "" } = {}) {
    const payload = {
        search: search,
        startAt: null,
        endAt: null,
        paging: {
            pageIndex: pageIndex,
            pageSize: pageSize
        },
        sorting: {
            field: 'chooseDate',
            order: "desc"
        }
    }
    return payload
}

function HistoryComponentPrev(props) {
    const { getAllListBookingServicesDispatch } = props;
    const { listListBookingServices } = props;
    const [isLoading, setIsLoading] = useState(true)
    const { t } = props;
    useEffect(() => {
        const loadData = async () => {
            await getAllListBookingServicesDispatch(requestPayload());
            setIsLoading(false);
        }
        loadData();
    }, [])

    const tableData = () => {
        const pageIndex = listListBookingServices.paging?.pageIndex;
        const pageSize = listListBookingServices.paging?.pageSize;
        const data = listListBookingServices.data?.map((item, index) => { return { ...item, key: item.id, displayId: (pageIndex - 1) * pageSize + 1 + index } });
        return data
    }
    const tablePagination = () => {
        const pageIndex = listListBookingServices.paging?.pageIndex;
        const pageSize = listListBookingServices.paging?.pageSize;
        const total = listListBookingServices.paging?.total;
        const defaultPageSize = 10;
        const current = listListBookingServices.paging?.pageIndex;

        return { defaultPageSize, pageIndex, pageSize, total, current }
    }
    const onChangeTable = async (paging) => {
        if (paging) {
            setIsLoading(true);
            await getAllListBookingServicesDispatch(requestPayload({ pageIndex: paging?.current }));
            setIsLoading(false);
        }
    }
    //Search box
    const { Search } = Input;
    const onSearch = async (value) => {
        setIsLoading(true);
        await getAllListBookingServicesDispatch(requestPayload({ search: value }));
        setIsLoading(false);
    };

    //Table section
    const columns = [
        {
            title: 'ID',
            dataIndex: 'displayId',
            key: 'displayId',
        },
        {
            title: t("ServiceName"),
            dataIndex: 'serviceName',
            key: 'name',
            render: (text, record) => <Button type='link'>{text}</Button>,
        },
        {
            title: t("Status"),
            dataIndex: 'status',
            key: 'status',
            render: (text) => { return text === 'APPROVED' ? <Tag color="green"> {text} </Tag> : <Tag color="volcano"> {text} </Tag> },
        },
        {
            title: t('BookingTime'),
            dataIndex: 'bookingTime',
            key: 'bookingTime',
        },
        {
            title: t('BookingDate'),
            dataIndex: 'chooseDate',
            key: 'chooseDate',
        },
        {
            title: t('CreatedAt'),
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
    ];

    return (
        <Spin className='news-container' spinning={isLoading}>
            <Row>
                <Col span={8}>
                    <Search placeholder={t("BookingPlaceholder")} onSearch={onSearch} enterButton />
                </Col>
            </Row>
            <Table columns={columns} dataSource={tableData()} pagination={tablePagination()} onChange={onChangeTable} className='news-table' />
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
const HistoryComponent = withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(HistoryComponentPrev)
)
export default HistoryComponent;