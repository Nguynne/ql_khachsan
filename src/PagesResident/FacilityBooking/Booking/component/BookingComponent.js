import { SearchOutlined } from '@ant-design/icons';
import { Card, Avatar, Button, Spin } from 'antd';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useState, useEffect } from 'react';
import { selectSystemServices } from '../../../../PagesAdministrator/SystemServices/stores/selector';
import { asyncGetAllSystemServicesAction, asyncGetRulesSystemServicesAction } from '../../../../PagesAdministrator/SystemServices/stores/action';
import { Modal } from 'antd';
import { withTranslation, useTranslation } from "react-i18next";

function requestPayload({ pageIndex = 1, pageSize = 10, search = "" } = {}) {
    const payload = {
        search: search,
        paging: {
            pageIndex: pageIndex,
            pageSize: pageSize,
        },
        sorting: {
            order: "desc",
        },
    };
    return payload;
}
function BookingComponentPrev(props) {
    const { getAllSystemServicesDispatch, getRulesSystemServicesDispatch } = props;
    const { listSystemServices } = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const { i18n } = useTranslation();
    const { t } = props;
    useEffect(() => {
        const loadData = async () => {
            await getAllSystemServicesDispatch(requestPayload());
            setIsLoading(false);
        }
        loadData();
    }, [])

    // Booking tab
    const bookingRender = () => {
        return (
            <div className='booking-card'>
                {
                    listSystemServices.data?.map(item =>
                        <Card
                            actions={[
                                <p>{t("Booking")}</p>
                            ]}
                            key={item.id}
                        >
                            <Card.Meta
                                avatar={<Avatar size={50} src={item.imageUrl} />}
                                title={<><Button shape="circle" icon={<SearchOutlined />} onClick={() => modalDisplay(item.id)} /> {item.name}</>}
                                description={item.description}
                            />
                        </Card>
                    )
                }
            </div>

        )
    }
    const modalDisplay = async (imgId) => {
        const payload = {
            locale: i18n.language === 'vi' ? 'vi-VN' : 'en-US',
            serviceId: imgId
        }
        const response = await getRulesSystemServicesDispatch(payload);
        setModalData(response.data.result);
        setModalOpen(true);
    }
    return (
        <>
            <Spin spinning={isLoading}>
                {bookingRender()}
            </Spin>
            <Modal
                visible={modalOpen}
                title="Facility booking"
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setModalOpen(false)}>
                        {t("Return")}
                    </Button>,
                ]}
                width={800}
            >
                <img src={modalData} alt='facility-booking' style={{ width: '100%' }} />
            </Modal>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    listSystemServices: selectSystemServices,
});

const mapDispatchToProps = (dispatch) => ({
    getAllSystemServicesDispatch: (payload) => asyncGetAllSystemServicesAction(dispatch)(payload),
    getRulesSystemServicesDispatch: (payload) => asyncGetRulesSystemServicesAction(dispatch)(payload),
});

const BookingComponent = withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(BookingComponentPrev)
)
export default BookingComponent;