import {
    DashboardOutlined,
    UserOutlined,
    CoffeeOutlined,
    SolutionOutlined,
    FormOutlined,
    SmileOutlined,
    ApiOutlined,
    TableOutlined,
    CiCircleFilled,
    LogoutOutlined,
    SettingOutlined,
    GlobalOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Layout, Dropdown, Space, Avatar } from 'antd';
import './NavigationComponent.css'
import EstellaLogo from './img/estellaLogo.png'
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { delCookie } from "../../../utils/utils"
import { useTranslation, withTranslation } from "react-i18next";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children, theme) {
    return {
        key,
        icon,
        children,
        label,
        theme,
    };
}

function NavigationLayoutComponent(props) {
    const [current, setCurrent] = useState('users');
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const { t } = props;
    const [collapsed, setCollapsed] = useState(false);
    const items = [
        getItem(
            <Link to={"/administrator/dashboard"} className="navMenuItem">
                {t('DashboardNav')}
            </Link>,
            "dashboard",
            <DashboardOutlined />
        ),
        getItem(
            <Link to={"/administrator/users"} className="navMenuItem">
                {t('UsersManagementNav')}
            </Link>,
            "users",
            <UserOutlined />
        ),
        getItem(
            <Link to={"/administrator/news"} className="navMenuItem">
                {t('NewsNav')}
            </Link>,
            "news",
            <CoffeeOutlined />
        ),
        getItem(
            <Link to={"/administrator/feedbacks"} className="navMenuItem">
                {t('FeedbacksNav')}
            </Link>,
            "feedbacks",
            <SolutionOutlined />
        ),
        getItem(
            <Link to={"/administrator/form-online"} className="navMenuItem">
                {t('FormOnlineNav')}
            </Link>,
            "form-online",
            <FormOutlined />
        ),
        getItem(
            <span style={{ fontSize: 15, padding: "auto" }}>{t('ServicesManagementNav')}</span>,
            "6",
            <SmileOutlined />,
            [
                getItem(
                    <Link to={"/administrator/services/booking"} className="navMenuItem">
                        {t('ListBookingServicesNav')}
                    </Link>,
                    "booking",
                    <TableOutlined />
                ),
                getItem(
                    <Link to={"/administrator/services/system"} className="navMenuItem">
                        {t('SystemServicesNav')}
                    </Link>,
                    "system",
                    <CiCircleFilled />
                ),
            ]
        ),
        getItem(
            <Link to={"/administrator/config"} className="navMenuItem">
                {t('ConfigurationNav')}
            </Link>,
            "config",
            <ApiOutlined />
        ),
    ];
    const [currentLang, setCurrentLang] = useState('langVN');
    const onClickEventLang = (event) => {
        setCurrentLang(event.key);
    }
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
                    label: <p onClick={() => changePass()} style={{ margin: '0' }}>{t("ChangePassword")}</p>,

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
                        <p onClick={() => changeLanguage("en")} style={{ margin: '0' }}>{t('LangENNav')}</p>
                    ),
                },
                {
                    key: "langVN",
                    label: (
                        <p onClick={() => changeLanguage("vi")} style={{ margin: '0' }}>{t('LangVNNav')}</p>
                    ),
                },
            ]}
            onClick={onClickEventLang}
            selectedKeys={[currentLang]}
        />
    );

    const onClickEvent = (event) => {
        setCurrent(event.key);
    }
    const getUser = localStorage.getItem("user");
    const logOut = () => {
        delCookie();
        navigate("/login");
    };
    const changePass = () => {
        navigate("resident/changepassword");
    };
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme='light' className='sider' trigger={null} collapsible collapsed={collapsed} width={'300'}>
                <div className='logoAdmin' key='logo' onClick={() => navigate("/resident/facilitybooking")}>
                    <img src={EstellaLogo} alt='logo' className='logoImg' />
                    <h2 className={`nav-title ${collapsed ? 'nav-title-fade' : ''}`}>Estella Heights</h2>
                </div>
                <Menu mode="inline" onClick={onClickEvent} selectedKeys={[current]} items={items} />
            </Sider>
            <Layout>
                <Header className='header'>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <div className='setting'>
                        <Dropdown placement="bottomRight" overlay={userSettingContent}>
                            <Space align='center' className='usersetting'>
                                <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" style={{ width: '25px', height: 'auto', padding: 0, margin: 0 }} />
                                <p style={{ margin: 0, fontSize: '17px', padding: '0' }}>{getUser}</p>
                            </Space>
                        </Dropdown>
                        <Dropdown placement="bottomRight" overlay={languageSettingContent}>
                            <GlobalOutlined className='global' />
                        </Dropdown>
                    </div>
                </Header>
                <Content className='content'>
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}

const NavigationComponent = withTranslation()(
    NavigationLayoutComponent
)
export default NavigationComponent;