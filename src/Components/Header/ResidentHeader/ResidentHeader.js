import {
  EditOutlined,
  TwitterOutlined,
  SolutionOutlined,
  FormOutlined,
  DollarOutlined,
  BellOutlined,
  GlobalOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Menu, Space, Avatar, Dropdown, Tabs, Badge } from 'antd';
import './ResidentHeader.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { asyncGetAllNotificationServicesAction } from '../../../PagesResident/Notification/stores/action';
import { selectNotificationServices } from '../../../PagesResident/Notification/stores/selector';
import { delCookie } from "../../../utils/utils";
import { withTranslation, useTranslation } from "react-i18next";

function ResidentHeaderComponent(props) {
  const [current, setCurrent] = useState('facilityBooking');
  const [currentLang, setCurrentLang] = useState('langVN');
  const { getAllNotificationServicesDispatch } = props;
  const { listNotificationServices, children } = props;
  const { i18n } = useTranslation();
  const { t } = props;
  const navigate = useNavigate();
  const items = [
    {
      label: (
        <Link to="/resident/facilitybooking" className="resident-link">
          {t('FacilityBooking')}
        </Link>
      ),
      key: "facilityBooking",
      icon: <FormOutlined />,
    },
    {
      label: (
        <Link to="/resident/feedbacks" className="resident-link">
          {t("Feedbacks")}
        </Link>
      ),
      key: "feedbacks",
      icon: <SolutionOutlined />,
    },
    {
      label: (
        <Link to="/resident/formonlineresident" className="resident-link">
          {t("FormOnline")}
        </Link>
      ),
      key: "formOnline",
      icon: <EditOutlined />,
    },
    {
      label: (
        <Link to="/resident/news" className="resident-link">
          {t("News")}
        </Link>
      ),
      key: "news",
      icon: <DollarOutlined />,
    },
    {
      label: (
        <Link to="/resident/createResident" className="resident-link">
          {t("CreateAccount")}
        </Link>
      ),
      key: "createAccount",
      icon: <TwitterOutlined />,
    },
  ];
  useEffect(() => {
    const payload = {
      search: "",
      paging: {
        pageIndex: 1,
        pageSize: 50
      },
      sorting: {
        field: "createdAt",
        order: "desc"
      }
    }
    getAllNotificationServicesDispatch(payload);
    i18n.language === "vi" ? setCurrentLang('langVN') : setCurrentLang('langEN')
  }, [])

  const onClickEvent = (event) => {
    setCurrent(event.key);
  }
  const onClickEventLang = (event) => {
    setCurrentLang(event.key);
  }
  const logoClickEvent = () => {
    setCurrent('facilityBooking');
    navigate('/resident/facilitybooking');
  }

  const logOut = () => {
    delCookie();
    navigate("/login");
  };
  const changePW = () => {
    navigate("/resident/changepassword");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const userSettingContent = (
    <Menu
      items={[
        {
          key: "logout",
          label: <p onClick={() => logOut()} style={{ margin: '0' }}>{t("Logout")}</p>,
          icon: <LogoutOutlined />,
        },
        {
          key: "changePassword",
          label: <p onClick={() => changePW()} style={{ margin: '0' }}>{t("ChangePassword")}</p>,

          icon: <SettingOutlined />,
        },
      ]}
    />
  );
  const languageSettingContent = (
    <Menu
      items={[
        {
          key: "langEN",
          label: (
            <p onClick={() => changeLanguage("en")} style={{ margin: '0' }}>en Tiếng anh</p>
          ),
        },
        {
          key: "langVN",
          label: (
            <p onClick={() => changeLanguage("vi")} style={{ margin: '0' }}>vi Tiếng Việt</p>
          ),
        },
      ]}
      onClick={onClickEventLang}
      selectedKeys={[currentLang]}
    />
  );

  const notificationContent = (
    <Tabs defaultActiveKey="all" className='notification-container' tabBarGutter={70} centered style={{ marginTop: '3px' }}>
      <Tabs.TabPane tab={t("All")} key="all" className='notification-tab'>
        {listNotificationServices.data?.map((item) => {
          return (
            <div className='notification-content'>
              <p className='notification-title'>{item.title}</p>
              <p className='notification-desc'>{item.content}</p>
            </div>
          )
        })}
      </Tabs.TabPane>
      <Tabs.TabPane tab={t("Purchase")} key="purchase" className='notification-tab'>
        Content of Tab Pane 2
      </Tabs.TabPane>
    </Tabs>
  )

  return (
    <>
      <div className='resident-header'>
        <div key='resident-logo' onClick={() => logoClickEvent()}>
          <img src='https://huttons.com.vn/datafiles/setone/1578541984_estella_height_logo-dOe700.png' alt='estellalogo' className='resident-logo' />
        </div>
        <Menu
          mode="horizontal"
          onClick={onClickEvent}
          selectedKeys={[current]}
          items={items}
          className='resident-menu'
        />
        <Space size={0} className='resident-widget'>

          <Dropdown placement="bottomRight" overlay={notificationContent} trigger={['click']}>
            <Badge count={listNotificationServices.data?.length} overflowCount={99} style={{ marginTop: '20px' }}>
              <BellOutlined className='lang-select' />
            </Badge>
          </Dropdown>
          <Dropdown placement="bottomRight" overlay={userSettingContent}>
            <Space align='center' className='resident-account'>
              <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" style={{ width: '25px', height: 'auto' }} />
              <p style={{ margin: 0, fontSize: '17px', paddingTop: '4px' }}>admineh</p>
            </Space>
          </Dropdown>
          <Dropdown placement="bottomRight" overlay={languageSettingContent}>
            <GlobalOutlined className='lang-select' />
          </Dropdown>
        </Space>
      </div>
      <div className='resident-content'>
        {children}
      </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  listNotificationServices: selectNotificationServices,
});

const mapDispatchToProps = (dispatch) => ({
  getAllNotificationServicesDispatch: (payload) => asyncGetAllNotificationServicesAction(dispatch)(payload),
});

//const withConnect = connect(mapStateToProps, mapDispatchToProps);

const ResidentHeader = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ResidentHeaderComponent)
)
export default ResidentHeader;
