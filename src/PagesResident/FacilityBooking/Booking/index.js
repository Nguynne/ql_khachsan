import './index.css'
import { AndroidOutlined, AppleOutlined, SearchOutlined } from '@ant-design/icons';
import { Carousel, Tabs } from 'antd';
import BookingComponent from './component/BookingComponent';
import HistoryComponent from './component/HistoryComponent';
import { withTranslation } from "react-i18next";

function FacilityBookingComponent(props) {
    const { t } = props;
    const items = [
        {
            label: <><AppleOutlined /> {t("Booking")}</>,
            key: 'booking',
            content: <BookingComponent />
        },
        {
            label: <><AndroidOutlined /> {t("History")}</>,
            key: 'history',
            content: <HistoryComponent />
        },
    ]

    return (
        <>
            <Carousel className='carousel-img'>
                <img src='https://www.infocanho.com/wp-content/uploads/2017/12/du-an-can-ho-estella-heights-duong-song-hanh-quan-2.jpg' alt='im1' />
                <img src='https://www.infocanho.com/wp-content/uploads/2017/12/du-an-can-ho-estella-heights-duong-song-hanh-quan-2.jpg' alt='im2' />
                <img src='https://www.infocanho.com/wp-content/uploads/2017/12/du-an-can-ho-estella-heights-duong-song-hanh-quan-2.jpg' alt='im3' />
                <img src='https://www.infocanho.com/wp-content/uploads/2017/12/du-an-can-ho-estella-heights-duong-song-hanh-quan-2.jpg' alt='im4' />
            </Carousel>
            <Tabs defaultActiveKey="booking">
                {items.map(item =>
                    <Tabs.TabPane tab={item.label} key={item.key}>
                        {item.content}
                    </Tabs.TabPane>
                )}
            </Tabs>
        </>
    )
}

const FacilityBooking = withTranslation()(FacilityBookingComponent);
export default FacilityBooking;
